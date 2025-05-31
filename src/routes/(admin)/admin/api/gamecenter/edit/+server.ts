import { GamecenterServer } from '$lib/module/gamecenter/gamecenter.server.js';
import { Gamecenter } from '$lib/module/gamecenter/index.js';
import { error } from '@sveltejs/kit';

export async function POST({ request, url }) {
    const requestData: Gamecenter.GamecenterWithoutOrder = (await request.json()).gamecenterData;

    try{
        Gamecenter.Schema.GamecenterWithoutOrder.parse(requestData)
    }
    catch{
        throw error(400);
    }

    const coorData = await GamecenterServer.serverRequest.searchCoorWithAddress(requestData.address, url.origin);

    const gamecenterData = {
        ...requestData,
        coor: {
            x: coorData?.[0]?.x !== undefined ? Number(coorData?.[0]?.x) : null,
            y: coorData?.[0]?.y !== undefined ? Number(coorData?.[0]?.y) : null
        }
    } as Gamecenter.Gamecenter;

    await GamecenterServer.DBController.editGamecenter(gamecenterData)

    return new Response();
}