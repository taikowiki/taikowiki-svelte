import { docDBController } from "$lib/module/common/wikidoc/server/dbController.server";

export async function load(){
    const {recentlyCreatedDocs, recentlyEditedDocs} = await docDBController.getRecentDocs();

    return {
        recentlyCreatedDocs,
        recentlyEditedDocs
    }
}