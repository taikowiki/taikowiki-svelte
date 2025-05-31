import { GamecenterServer } from '$lib/module/gamecenter/gamecenter.server.js';
import { Gamecenter } from '$lib/module/gamecenter/index.js';
import { error } from '@sveltejs/kit';

export async function POST({ request, url }) {
    const gamecenterData: Gamecenter.Req = (await request.json()).gamecenterData;

    try{
        Gamecenter.Schema.Req.parse(gamecenterData)
    }
    catch(err){
        return error(400);
    }

    const coorData = await GamecenterServer.serverRequest.searchCoorWithAddress(gamecenterData.address, url.origin);

    const data = {
        ...gamecenterData,
        coor: {
            x: coorData?.[0]?.x !== undefined ? Number(coorData?.[0]?.x) : null,
            y: coorData?.[0]?.y !== undefined ? Number(coorData?.[0]?.y) : null
        }
    }

    await GamecenterServer.DBController.addGamecenter(data);

    return new Response();
}