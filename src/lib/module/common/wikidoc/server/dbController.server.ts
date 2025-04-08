import { defineDBHandler, QB, queryBuilder, Select, Where } from "@yowza/db-handler";
import type { Doc } from '$lib/module/common/wikidoc/types';
import { WikiError, validateDocData } from "../util.js";
import { renderer } from "../util.js";
import { songDBController } from "../../song/song.server.js";
import { sqlString, sqlEscapeString, sqlEscapeLike } from "../../util.js";
import * as Diff from 'diff';

function parseDBData<T extends keyof Doc.DB.DocDBData = keyof Doc.DB.DocDBData>(dataFromDB: any): Pick<Doc.DB.DocDBData, T> {
    const docData: any = {};
    Object.keys(dataFromDB).forEach((key) => {
        if (key === "contentTree" || key === "renderedContentTree") {
            const value = dataFromDB[key];
            if (value === null) {
                docData[key] = null;
            }
            else {
                docData[key] = JSON.parse(value);
            }
            return;
        }
        if (key === "createdTime" || key === "editedTime") {
            docData[key] = new Date(dataFromDB[key]);
            return;
        }
        if (key === "isDeleted") {
            docData[key] = Boolean(dataFromDB[key]);
            return;
        }
        docData[key] = dataFromDB[key];
    })
    return docData;
}

export const docDBController = {
    /**
     * @throws `DUPLICATED_TITLE` 제목이 중복됨.
     * @throws `DUPLICATED_SONG_NO` 곡 번호가 중복됨.
     * @throws `EMPTY_TITLE` 제목이 비어있음.
     * @throws `INVALID_DOC_DATA_TYPE` 올바르지 않은 문서 데이터 타입.
     * @throws `DOC_DATA_ERR` 문서 데이터가 올바르지 않음.
     * @throws `REDIRECT_DOC_NOT_EXISTS` 리다이렉트 할 문서가 존재하지 않음.
     * @throws `SONG_NOT_EXISTS` 연결할 곡이 존재하지 않음.
     */
    create: defineDBHandler<[UUID: string | null, ip: string, docData: Doc.Data.DocData]>((UUID, ip, docData) => {
        return async (run) => {
            // 제목 비어있는지 검사
            if (!docData.title) {
                throw new WikiError("EMPTY_TITLE");
            }

            // 이미 해당 제목의 문서가 존재하는지 검사
            const docTitleExists = await docDBController.docTitleExists.getCallback(docData.title)(run);
            if (docTitleExists) {
                throw new WikiError("DUPLICATED_TITLE");
            }

            // 문서 유형 검사
            if (!["normal", "song", "redirect"].includes(docData.type)) {
                throw new WikiError("INVALID_DOC_DATA_TYPE");
            }
            if (!validateDocData(docData)) {
                throw new WikiError("DOC_DATA_ERR");
            }

            if (docData.type === "song") {
                const alreadyExists = await docDBController.docExistsBySongNo.getCallback(docData.songNo)(run);
                if (alreadyExists) {
                    throw new WikiError("DUPLICATED_SONG_NO");
                }
                const songExists = await songDBController.songExistsBySongNo.getCallback(docData.songNo)(run);
                if (!songExists) {
                    throw new WikiError("SONG_NOT_EXISTS");
                }
            }

            //const rendered = (docData as WikiNormalDocData).contentTree ? await renderer.prerenderContentTree((docData as WikiNormalDocData).contentTree) : null;
            let redirectTo: number | null = null;
            if (docData.type === "redirect") {
                const redirectId = await docDBController.getDocIdByTitle(docData.redirectTo);
                if (redirectId === null) {
                    throw new WikiError("REDIRECT_DOC_NOT_EXISTS");
                }
                redirectTo = redirectId
            }

            await run("INSERT INTO `docs` (`title`, `type`, `editorUUID`, `editorIp`, `comment`, `contentTree`, `renderedContentTree`, `flattenedContent`, `songNo`, `redirectTo`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    docData.title,
                    docData.type,
                    UUID,
                    ip,
                    docData.comment,
                    docData.type !== "redirect" ? JSON.stringify(docData.contentTree) : null,
                    docData.type !== "redirect" ? JSON.stringify(await renderer.prerenderContentTree(docData.contentTree)) : null,
                    docData.type !== "redirect" ? renderer.flattenContentTree(docData.contentTree) : null,
                    docData.songNo ?? null,
                    redirectTo
                ]
            );
        }
    }),
    /**
     * @throws `DUPLICATED_TITLE` 제목이 중복됨.
     * @throws `DUPLICATED_SONG_NO` 곡 번호가 중복됨.
     * @throws `EMPTY_TITLE` 제목이 비어있음.
     * @throws `INVALID_DOC_DATA_TYPE` 올바르지 않은 문서 데이터 타입.
     * @throws `DOC_DATA_ERR` 문서 데이터가 올바르지 않음.
     * @throws `REDIRECT_DOC_NOT_EXISTS` 리다이렉트 할 문서가 존재하지 않음.
     * @throws `SONG_NOT_EXISTS` 연결할 곡이 존재하지 않음.
     * @throws `ID_NOT_EXISTS` 해당 ID의 문서가 존재하지 않음.
     */
    update: defineDBHandler<[id: number, UUID: string | null, ip: string, docData: Doc.Data.DocData]>((id, UUID, ip, docData) => {
        return async (run) => {
            const result = await run("SELECT `version`, `flattenedContent` FROM `docs` WHERE `id` = ?", [id]);
            if (result.length === 0) {
                throw new WikiError("ID_NOT_EXISTS");
            }
            const oldVersion = result[0].version as number;
            const oldFlattenedContent = result[0].flattenedContent as string;

            // 제목 비어있는지 검사
            if (!docData.title) {
                throw new WikiError("EMPTY_TITLE");
            }

            // ID가 다른 해당 제목의 문서가 존재하는지 검사
            const docTitleExists = await run("SELECT COUNT(*) AS COUNT FROM `docs` WHERE `id` != ? AND `title` = ?", [id, docData.title]);
            if (docTitleExists[0].COUNT > 0) {
                throw new WikiError("DUPLICATED_TITLE");
            }

            // 문서 유형 검사
            if (!["normal", "song", "redirect"].includes(docData.type)) {
                throw new WikiError("INVALID_DOC_DATA_TYPE");
            }
            if (!validateDocData(docData)) {
                throw new WikiError("DOC_DATA_ERR");
            }
            if (docData.type === "song") {
                const r = await run("SELECT COUNT(*) AS COUNT FROM `docs` WHERE `id` != ? AND `songNo` = ?", [id, docData.songNo]);
                const alreadyExists = r[0].COUNT > 0;
                if (alreadyExists) {
                    throw new WikiError("DUPLICATED_SONG_NO");
                }
                const songExists = await songDBController.songExistsBySongNo.getCallback(docData.songNo)(run);
                if (!songExists) {
                    throw new WikiError("SONG_NOT_EXISTS");
                }
            }

            // redirectTo 설정
            let redirectTo: number | null = null;
            if (docData.type === "redirect") {
                const redirectId = await docDBController.getDocIdByTitle(docData.redirectTo);
                if (redirectId === null) {
                    throw new WikiError("REDIRECT_DOC_NOT_EXISTS");
                }
                redirectTo = redirectId
            }

            // diff 확인
            const flattenedContent = docData.contentTree ? renderer.flattenContentTree(docData.contentTree) : '';
            const diff = Diff.diffChars(oldFlattenedContent, flattenedContent);
            let increase = 0;
            let decrease = 0;
            diff.forEach((change) => {
                if (change.added) {
                    increase += change.value.length;
                }
                else if (change.removed) {
                    decrease += change.value.length;
                }
            })

            // `docs/log`로 이동
            await run('INSERT INTO `docs/log` (`id`, `title`, `type`, `editableGrade`, `editorUUID`, `editorIp`, `comment`, `contentTree`, `renderedContentTree`, `flattenedContent`, `songNo`, `redirectTo`, `createdTime`, `editedTime`, `isDeleted`, `version`, `diffIncrease`, `diffDecrease`) SELECT * FROM `docs` WHERE `id` = ?', [id]);
            // `docs` 수정
            await run("UPDATE `docs` SET `title` = ?, `type` = ?, `editorUUID` = ?, `editorIp` = ?, `comment` = ?, `contentTree` = ?, `renderedContentTree` = ?, `flattenedContent` = ?, `songNo` = ?, `redirectTo` = ?, `editedTime` = CURRENT_TIMESTAMP, `version` = ?, `isDeleted` = 0, `diffIncrease` = ?, `diffDecrease` = ? WHERE `id` = ?",
                [
                    docData.title,
                    docData.type,
                    UUID,
                    ip,
                    docData.comment,
                    docData.type !== "redirect" ? JSON.stringify(docData.contentTree) : null,
                    docData.type !== "redirect" ? JSON.stringify(await renderer.prerenderContentTree(docData.contentTree)) : null,
                    docData.type !== "redirect" ? (flattenedContent || null) : null,
                    docData.songNo ?? null,
                    redirectTo,
                    oldVersion + 1,
                    increase,
                    decrease,
                    id
                ]
            )
        }
    }),
    /**
     * 문서의 로그를 가져옴
     * 페이지 당 100개
     */
    getLogData: defineDBHandler<[id: number, page: number], Doc.DB.ControllerReturnTypes.getLogData>((id, page) => {
        return async (run) => {
            const current = await (async () => {
                const r = await run("SELECT `title`, `version`, `editedTime`, `comment`, `diffDecrease`, `diffIncrease`, `editorUUID`, `editorIp` FROM `docs` WHERE `id` = ?", [id]);
                if (r.length === 0) {
                    return null;
                }
                return parseDBData<'title' | 'version' | 'editedTime' | 'comment' | 'diffDecrease' | 'diffIncrease' | 'editorUUID' | 'editorIp'>(r[0]);
            })();

            if (current === null) {
                return {
                    logs: [],
                    current: null
                }
            }

            let _logs = await (async () => {
                const r = await run("SELECT `title`, `version`, `editedTime`, `comment`, `diffDecrease`, `diffIncrease`, `editorUUID`, `editorIp` FROM `docs/log` WHERE `id` = ? ORDER BY `version` DESC LIMIT ?, ?", [id, page === 1 ? 0 : (page - 1) * 100 - 1, page === 1 ? 99 : 100]);
                return (r as any[]).map(e => parseDBData<'title' | 'version' | 'editedTime' | 'comment' | 'diffDecrease' | 'diffIncrease' | 'editorUUID' | 'editorIp'>(e))
            })();

            if (page === 1) {
                _logs = [current, ..._logs];
            }

            const editorUUIDSet = new Set<string>();
            [current, ..._logs].forEach((log) => {
                if (log.editorUUID) {
                    editorUUIDSet.add(log.editorUUID);
                }
            });

            const uuidRecord = await (async () => {
                if (editorUUIDSet.size === 0) {
                    return {} as Record<string, string>;
                }
                const whereConditionStatement = Array.from(editorUUIDSet).map((v) => `\`UUID\` = '${sqlEscapeString(v)}'`).join(" OR ");
                const r = await run(`SELECT \`nickname\`, \`UUID\` FROM \`user/data\` WHERE ${whereConditionStatement}`);

                const s: Record<string, string> = {};
                r.forEach((v: any) => {
                    s[v.UUID] = v.nickname;
                });
                return s;
            })();

            const logs = _logs.map((log) => {
                return {
                    title: log.title,
                    version: log.version,
                    editedTime: log.editedTime,
                    comment: log.comment,
                    diffDecrease: log.diffDecrease,
                    diffIncrease: log.diffIncrease,
                    editor: log.editorUUID ? (uuidRecord[log.editorUUID] ?? log.editorUUID) : log.editorIp
                }
            });

            return {
                logs,
                current: {
                    title: current.title,
                    version: current.version,
                    editedTime: current.editedTime,
                    comment: current.comment,
                    diffDecrease: current.diffDecrease,
                    diffIncrease: current.diffIncrease,
                    editor: current.editorUUID ? (uuidRecord[current.editorUUID] ?? current.editorUUID) : current.editorIp
                }
            }
        }
    }),
    getPast: defineDBHandler<[id: number, version: number], Pick<Doc.DB.DocDBData, 'id' | 'contentTree' | 'editedTime' | 'editableGrade' | 'editorUUID' | 'id' | 'isDeleted' | 'renderedContentTree' | 'songNo' | 'title' | 'redirectTo' | 'type' | 'version'> | null>((id, version) => {
        return async (run) => {
            const r = await run("SELECT `id`, `contentTree`, `editedTime`, `editableGrade`, `editorUUID`, `id`, `isDeleted`, `renderedContentTree`, `songNo`, `title`, `redirectTo`, `type`, `version` FROM `docs/log` WHERE `id` = ? AND `version` = ? LIMIT 0, 1", [id, version]);
            if (r.length === 0) {
                return null;
            }

            return parseDBData(r[0]);
        }
    }),
    /**
     * 특정 컬럼만 조건에 따라 가져옴
     * @param id 
     * @param columns 
     * @param where 
     * @returns 
     */
    getColumnsWhere: defineDBHandler<[columns: (keyof Doc.DB.DocDBData)[], where?: [column: keyof Doc.DB.DocDBData, value: any][], type?: 'and' | 'or', limit?: [number, number]], Partial<Doc.DB.DocDBData>[]>((columns, where, type, limit) => {
        const columnsQuery = columns.map(e => `\`${sqlEscapeString(e)}\``).join(', ');
        const whereQuery = where && where.length > 0 ? 'WHERE ' + where.map(e => typeof (e[1]) === "string" ? `\`${sqlEscapeString(e[0])}\` LIKE ?` : `\`${sqlEscapeString(e[0])}\` = ?`).join(' ' + (type?.toUpperCase() ?? 'AND') + '') : '';
        const limitQuery = limit ? `LIMIT ${limit[0]}, ${limit[1]}` : '';
        return async (run) => {
            const result = await run(`SELECT ${columnsQuery} FROM \`docs\` ${whereQuery} ${limitQuery}`,
                where ? where.map((e) => e[1]) : []
            )

            return (result as any[]).map(parseDBData) as Partial<Doc.DB.DocDBData>[];
        }
    }),
    getCountWhere: defineDBHandler<[where?: [column: keyof Doc.DB.DocDBData, value: any][], type?: 'and' | 'or'], number>((where, type) => {
        const whereQuery = where ? 'WHERE ' + where.map(e => typeof (e[1]) === "string" ? `\`${sqlEscapeString(e[0])}\` LIKE ?` : `\`${sqlEscapeString(e[0])}\` = ?`).join(' ' + (type?.toUpperCase() ?? 'AND') + ' ') : '';

        return async (run) => {
            const result = await run(`SELECT COUNT(*) AS COUNT FROM \`docs\` ${whereQuery}`,
                where ?
                    where.map((e) => e[1]) :
                    []
            );
            return result[0].COUNT;
        }
    }),
    /**
     * 해당 제목의 문서 존재 여부 반환
     */
    docTitleExists: defineDBHandler<[title: string]>((title) => {
        return async (run) => {
            const result = await run("SELECT COUNT(*) AS COUNT FROM `docs` WHERE `title` = ?",
                [title]
            );

            if (result[0].COUNT === 0) {
                return false;
            }

            return true;
        }
    }),
    /**
     * 특정 songNo를 가진 문서가 존재하는지 확인
     */
    docExistsBySongNo: defineDBHandler<[songNo: string]>((songNo) => {
        return async (run) => {
            const result = await run("SELECT COUNT(*) AS COUNT FROM `docs` WHERE `songNo` = ?",
                [songNo]
            );

            if (result[0].COUNT === 0) {
                return false;
            }

            return true;
        }
    }),
    /**
     * 특정 id를 가진 문서가 존재하는지 확인
     */
    docExistsById: defineDBHandler<[id: number]>((id) => {
        return async (run) => {
            const result = await run("SELECT COUNT(*) AS COUNT FROM `docs` WHERE `id` = ?",
                [id]
            );

            if (result[0].COUNT === 0) {
                return false;
            }

            return true;
        }
    }),
    /**
     * 특정 id를 가진 문서를 반환
     */
    getDocDataById: defineDBHandler<[id: number], Doc.DB.DocDBData | null>((id) => {
        return async (run) => {
            const result = await run("SELECT * FROM `docs` WHERE `id` = ?", [id]);
            if (result.length === 0) {
                return null;
            }

            return parseDBData(result[0]) as Doc.DB.DocDBData;
        }
    }),
    /**
     * 특정 제목을 가진 문서의 id를 반환
     */
    getDocIdByTitle: defineDBHandler<[title: string], number | null>((title) => {
        return async (run) => {
            const result = await run("SELECT `id` FROM `docs` WHERE `title` = ?", [title]);

            if (result.length === 0) {
                return null;
            }

            return result[0].id;
        }
    }),
    /**
     * 특정 id를 가진 문서의 제목 반환
     */
    getDocTitleById: defineDBHandler<[id: number], string | null>((id) => {
        return async (run) => {
            const result = await run("SELECT `title` FROM `docs` WHERE `id` = ?", [id]);

            if (result.length === 0) {
                return null;
            }

            return result[0].title;
        }
    }),
    getEditableGradeById: defineDBHandler<[id: number], number | null>((id) => {
        return async (run) => {
            const result = await run("SELECT `editableGrade` FROM `docs` WHERE `id` = ?", [id]);

            if (result.length === 0) {
                return null;
            }

            return result[0].editableGrade;
        }
    }),
    search: defineDBHandler<[query: string, offset:number, limit: number], {count: number, searchResults: Pick<Doc.DB.DocDBData, 'title' | 'flattenedContent' | 'type' | 'songNo' | 'redirectTo'>[]}>((query, offset, limit) => {
        const countQuery =
            queryBuilder
                .select('docs', [Select.Count()])
                .where(Where.OR(
                    Where.Like('title', `%${query}%`),
                    Where.Like('flattenedContent', `%${renderer.sharpConverter.escapeSharp(query.split(' ').filter(e => e).map(e => sqlEscapeLike(e)).join('%'))}%`)
                ))
                .build()

        const searchQuery =
            queryBuilder.union([
                queryBuilder
                    .select('docs', ['title', 'flattenedContent', 'type', 'songNo', 'redirectTo'])
                    .where(Where.Compare('title', '=', query)),
                queryBuilder
                    .select('docs', ['title', 'flattenedContent', 'type', 'songNo', 'redirectTo'])
                    .where(Where.Like('title', `%${query.split(' ').filter(e => e).map(e => sqlEscapeLike(e)).join('%')}%`)),
                queryBuilder
                    .select('docs', ['title', 'flattenedContent', 'type', 'songNo', 'redirectTo'])
                    .where(Where.Like('flattenedContent', `%${renderer.sharpConverter.escapeSharp(query.split(' ').filter(e => e).map(e => sqlEscapeLike(e)).join('%'))}%`))
            ]).build() + ` LIMIT ${offset}, ${limit}`;
        
        return async(run) => {
            const r1 = await run(countQuery)
            const count = Object.values(r1[0])[0] as number;

            if(count === 0){
                return {
                    count, 
                    searchResults: []
                }
            }

            const r2 = await run(searchQuery)
            const searchResults = r2.map((e: any) => parseDBData(e));

            return {
                count, searchResults
            }
        }
    })
} as const;