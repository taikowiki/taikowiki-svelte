import { sqlEscapeString } from '$lib/module/common/util.js';
import { docDBController } from '$lib/module/common/wikidoc/server/dbController.server.js';
import type { Doc } from '$lib/module/common/wikidoc/types.js';
import { runQuery } from '@yowza/db-handler';

export async function load({url}){
    const query = url.searchParams.get("query");
    if(!query){
        return {
            searchResults: [],
            count: 0
        }
    }

    let page = parseInt(url.searchParams.get("page") || '1');
    if(Number.isNaN(page)){
        page = 1;
    }

    const {searchResults, count} = await runQuery(async(run) => {
        const count = await docDBController.getCountWhere.getCallback([["title", `%${sqlEscapeString(query)}%`], ["flattenedContent", `%${sqlEscapeString(query)}`]], 'or')(run);
        if(count === 0){
            return {
                count,
                searchResults: []
            }
        };

        const searchResults = await docDBController.getColumnsWhere.getCallback(["title", "flattenedContent"], [["title", `%${sqlEscapeString(query)}%`], ["flattenedContent", `%${sqlEscapeString(query)}%`]], 'or', [page - 1, 25])(run);
        return {
            count, 
            searchResults: searchResults as Pick<Doc.DB.DocDBData, 'title' | 'flattenedContent'>[]
        }
    });

    return {
        count, 
        searchResults
    }
}