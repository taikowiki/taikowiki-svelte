import { daniDBController } from '$lib/module/common/dani/dani.server.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const versionDaniData = await daniDBController.getByVersion(params.version);

    if (!versionDaniData) {
        throw error(404);
    }

    return {
        versionDaniData
    }
}