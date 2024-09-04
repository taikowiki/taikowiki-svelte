import { daniDBController } from '$lib/module/common/dani/dani.server.js';
import type { DaniUpdateData } from '$lib/module/common/dani/types.js';

export async function POST({request}){
    const requestData: DaniUpdateData = await request.json();

    await daniDBController.updateVersion(requestData);

    return new Response();
}