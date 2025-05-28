import { DaniServer } from '$lib/module/dani/dani.server.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const versionDaniData = await DaniServer.DBController.getByVersion(params.version);

    if (!versionDaniData) {
        throw error(404);
    }

    return {
        versionDaniData
    }
}