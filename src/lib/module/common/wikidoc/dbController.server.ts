import { defineDBHandler } from "@yowza/db-handler";
import type {Doc} from '$lib/module/common/wikidoc/types';
import { WikiError } from "./wikiError.js";
import { normalizeContentTree, renderer } from "./renderer.js";
import { validateDocData } from "./util.js";
import { songDBController } from "../song/song.server.js";

function parseDBData<T extends keyof Doc.DB.WikiDocDBData = keyof Doc.DB.WikiDocDBData>(dataFromDB: any): Pick<Doc.DB.WikiDocDBData, T> {
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
    create: defineDBHandler<[UUID: string, ip: string, docData: Doc.Data.WikiDocData]>((UUID, ip, docData) => {
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

            await run("INSERT INTO `docs` (`title`, `type`, `editorUUID`, `editorIp`, `comment`, `contentTree`, `renderedContentTree`, `normalizedContentTree`, `songNo`, `redirectTo`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    docData.title,
                    docData.type,
                    UUID,
                    ip,
                    docData.comment,
                    docData.type !== "redirect" ? JSON.stringify(docData.contentTree) : null,
                    docData.type !== "redirect" ? JSON.stringify(await renderer.prerenderContentTree(docData.contentTree)) : null,
                    docData.type !== "redirect" ? normalizeContentTree(docData.contentTree) : null,
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
    update: defineDBHandler<[id: number, UUID: string, ip: string, docData: Doc.Data.WikiDocData]>((id, UUID, ip, docData) => {
        return async (run) => {
            const result = await run("SELECT `version` FROM `docs` WHERE `id` = ?", [id]);
            if (result.length === 0) {
                throw new WikiError("ID_NOT_EXISTS");
            }
            const version = result[0].version;

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

            // `docs/log`로 이동
            await run('INSERT INTO `docs/log` SELECT * FROM `docs` WHERE `id` = ?', [id]);
            // `docs` 수정
            await run("UPDATE `docs` SET `title` = ?, `type` = ?, `editorUUID` = ?, `editorIp` = ?, `comment` = ?, `contentTree` = ?, `renderedContentTree` = ?, `normalizedContentTree` = ?, `songNo` = ?, `redirectTo` = ?, `editedTime` = CURRENT_TIMESTAMP, `version` = ?, `isDeleted` = 0 WHERE `id` = ?",
                [
                    docData.title,
                    docData.type,
                    UUID,
                    ip,
                    docData.comment,
                    docData.type !== "redirect" ? JSON.stringify(docData.contentTree) : null,
                    docData.type !== "redirect" ? JSON.stringify(await renderer.prerenderContentTree(docData.contentTree)) : null,
                    docData.type !== "redirect" ? normalizeContentTree(docData.contentTree) : null,
                    docData.songNo ?? null,
                    redirectTo,
                    version + 1,
                    id
                ]
            )
        }
    }),
    /**
     * 문서의 로그를 가져옴
     * 페이지 당 50개
     */
    getLogs: defineDBHandler<[id: number, page: number]>((id, page) => {
        if(id === 1){
            const logs = [];
        }
        else{

        }
    })
    ,
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
    getDocDataById: defineDBHandler<[id: number], Doc.DB.WikiDocDBData | null>((id) => {
        return async (run) => {
            const result = await run("SELECT * FROM `docs` WHERE `id` = ?", [id]);
            if (result.length === 0) {
                return null;
            }

            return parseDBData(result[0]) as Doc.DB.WikiDocDBData;
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
     * 특정 제목을 가진 문서의 view data를 반환
     */
    getDocViewDataByTitle: defineDBHandler<[title: string], Doc.View.DB.ViewData | null>((title) => {
        return async (run) => {
            const result = await run("SELECT `id`, `title`, `type`, `editorUUID`, `renderedContentTree`, `songNo`, `redirectTo`, `editedTime`, `isDeleted`, `version` FROM `docs` WHERE `title` = ?", [title]);

            if (result.length === 0) {
                return null;
            }

            return parseDBData<Doc.View.DB.ViewDataKey>(result[0]);
        }
    }),
    getDocViewDataBySongNo: defineDBHandler<[songNo: string], Doc.View.DB.ViewData | null>((songNo) => {
        return async(run) => {
            const result = await run("SELECT `id`, `title`, `type`, `editorUUID`, `renderedContentTree`, `songNo`, `redirectTo`, `editedTime`, `isDeleted`, `version` FROM `docs` WHERE `songNo` = ?", [songNo]);

            if (result.length === 0) {
                return null;
            }

            return parseDBData<Doc.View.DB.ViewDataKey>(result[0]);
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
        return async(run) => {
            const result = await run("SELECT `editableGrade` FROM `docs` WHERE `id` = ?", [id]);

            if(result.length === 0){
                return null;
            }

            return result[0].editableGrade;
        }
    })
} as const;