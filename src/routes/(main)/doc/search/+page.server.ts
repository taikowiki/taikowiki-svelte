import { Doc } from "$lib/module/doc/doc.server";
import { runQuery } from '@yowza/db-handler';
import { Util } from "$lib/module/util/util.server";
import sqlString from 'sqlstring';
import type { RequestEvent } from "../$types";

const { queryBuilder } = Util.Server;
const escape = sqlString.escape;

// 페이지에 20개
export async function load({ url }: RequestEvent) {
    const query = url.searchParams.get("query") ?? '';

    let page = parseInt(url.searchParams.get("page") || '1');
    if (Number.isNaN(page)) {
        page = 1;
    }

    const { searchResults, count, titleExactMatched } = await runQuery(async (run) => {
        const { searchResults, count } = await Doc.Server.DBController.search.getCallback(query, (page - 1) * 20, 20)(run);
        const titleExactMatched = await (async () => {
            const rows = await queryBuilder
                .select('docs', ({ count }) => ({ count: count() }))
                .where(({ compare, column, value }) => [compare(column('title'), '=', value(query))])
                .execute(run);
            return rows[0].count > 0;
        })();
        type P = typeof searchResults[number]

        const songNoMap = new Map<string, P[]>();
        const docIdMap = new Map<number, P[]>();
        searchResults.forEach((r) => {
            if (r.songNo) {
                let rArr = songNoMap.get(r.songNo);
                if (!rArr) {
                    rArr = [];
                    songNoMap.set(r.songNo, rArr);
                }
                rArr.push(r);
                return;
            }
            if (r.redirectTo) {
                let rArr = docIdMap.get(r.redirectTo);
                if (!rArr) {
                    rArr = [];
                    docIdMap.set(r.redirectTo, rArr);
                }
                rArr.push(r);
                return;
            }
        })
        if (songNoMap.size > 0) {
            const getSongTitleQuery = queryBuilder
                .select('song', () => ({ title: 'title', songNo: 'songNo' }))
                .where(({ raw, column }) => [raw(`${column('songNo')} IN (${Array.from(songNoMap.keys()).map(e => escape(e)).join(', ')})`)])
                .build();
            const songTitles = await run(getSongTitleQuery);
            songTitles.forEach(({ title, songNo }: Record<string, string>) => {
                const rArr = songNoMap.get(songNo);
                if (!rArr) return;

                rArr.forEach((r) => {
                    //@ts-expect-error
                    r.songTitle = title;
                })
            })
        }
        if (docIdMap.size > 0) {
            const getDocTitleQuery = queryBuilder
                .select('docs', () => ({ title: 'title', id: 'id' }))
                .where(({ raw, column }) => [raw(`${column('id')} IN (${Array.from(docIdMap.keys()).map(e => escape(e)).join(', ')})`)])
                .build();

            const docTitles = await run(getDocTitleQuery);
            docTitles.forEach(({ title, id }: { title: string, id: number; }) => {
                const rArr = docIdMap.get(id);
                if (!rArr) return;

                rArr.forEach((r) => {
                    //@ts-expect-error
                    r.redirectTitle = title;
                })
            })
        }

        return {
            searchResults: searchResults as (Pick<Doc.DB.DocDBData, "songNo" | "title" | "type" | "redirectTo" | "flattenedContent"> & { songTitle?: string } & { redirectTitle?: string })[],
            count,
            titleExactMatched
        }
    })

    return {
        count,
        searchResults,
        titleExactMatched
    }
}