import { Dani } from '$lib/module/dani/index.js';
import '$lib/module/dani/dani.server.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const versionDaniData = await Dani.Server.DBController.getByVersion(params.version);

    if (!versionDaniData) {
        throw error(404);
    }

    return {
        versionDaniData
    }
}