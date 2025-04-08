import { docDBController } from '$lib/module/common/wikidoc/server/dbController.server.js';
import type { Doc } from '$lib/module/common/wikidoc/types.js';
import { queryBuilder, runQuery, Where } from '@yowza/db-handler';

// 페이지에 20개
export async function load({ url }) {
    const query = url.searchParams.get("query");
    if (!query) {
        return {
            searchResults: [],
            count: 0
        }
    }

    let page = parseInt(url.searchParams.get("page") || '1');
    if (Number.isNaN(page)) {
        page = 1;
    }

    const { searchResults, count } = await runQuery(async (run) => {
        const { searchResults, count } = await docDBController.search.getCallback(query, (page - 1) * 20, 20)(run);
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
            if(r.redirectTo){
                let rArr = docIdMap.get(r.redirectTo);
                if(!rArr){
                    rArr = [];
                    docIdMap.set(r.redirectTo, rArr);
                }
                rArr.push(r);
                return;
            }
        })
        if (songNoMap.size > 0) {
            const getSongTitleQuery = queryBuilder.select('song', ['title', 'songNo'])
                .where(Where.In('songNo', Array.from(songNoMap.keys())))
                .build() as string;
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
            const getDocTitleQuery = queryBuilder.select('docs', ['title', 'id'])
                .where(Where.In('id', Array.from(docIdMap.keys())))
                .build() as string;
            const docTitles = await run(getDocTitleQuery);
            docTitles.forEach(({ title, id }: {title: string, id: number;}) => {
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
            count
        }
    })

    return {
        count,
        searchResults
    }
}