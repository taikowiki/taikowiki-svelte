import { Doc } from "$lib/module/doc/doc.server";
import { error } from '@sveltejs/kit';

const { DBController } = Doc.Server;

export async function load({ params, url }) {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
        throw error(404);
    }

    const page = parseInt(url.searchParams.get('page') ?? '1')
    if (page < 1 || Number.isNaN(page)) {
        throw error(404);
    }

    let logData = await DBController.getLogData(id, page);

    if (logData.current === null || logData.logs.length === 0) {
        throw error(404);
    }

    return {
        logData,
        page
    }
}