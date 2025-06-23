import { Gamecenter } from "$lib/module/gamecenter";
import '$lib/module/gamecenter/gamecenter.server.js';
import { error } from '@sveltejs/kit';

export async function POST({ request, url }) {
    const gamecenterData: Gamecenter.Req = (await request.json()).gamecenterData;

    try {
        Gamecenter.Schema.Req.parse(gamecenterData)
    }
    catch (err) {
        return error(400);
    }

    const coorData = await Gamecenter.Server.serverRequest.searchCoorWithAddress(gamecenterData.address, url.origin);

    const data = {
        ...gamecenterData,
        coor: {
            x: coorData?.[0]?.x !== undefined ? Number(coorData?.[0]?.x) : null,
            y: coorData?.[0]?.y !== undefined ? Number(coorData?.[0]?.y) : null
        }
    }

    await Gamecenter.Server.DBController.addGamecenter(data);

    return new Response();
}