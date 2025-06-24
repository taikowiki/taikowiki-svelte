import { Doc } from "$lib/module/doc/doc.server";

const { DBController } = Doc.Server;

export async function load() {
    const { recentlyCreatedDocs, recentlyEditedDocs } = await DBController.getRecentDocs();

    return {
        recentlyCreatedDocs,
        recentlyEditedDocs
    }
}