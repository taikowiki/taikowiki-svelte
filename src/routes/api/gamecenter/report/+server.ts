import { Gamecenter } from "$lib/module/gamecenter";
import '$lib/module/gamecenter/gamecenter.server.js';
import { Util } from '$lib/module/util/util.server';
import { error } from '@sveltejs/kit';

const { getClientAddress } = Util.Server;

export async function POST(event){
    const {locals, request} = event;

    if(!locals.userData || locals.userData.grade < 2){
        throw error(401);
    }

    const gamecenterData: Gamecenter.Req = (await request.json()).gamecenterData;

    try{
        Gamecenter.Schema.Req.parse(gamecenterData);
    }
    catch{
        throw error(400);
    }

    await Gamecenter.Server.DBController.addReport({
        gamecenterData,
        UUID: locals.userData.UUID,
        ip: getClientAddress(event)
    });

    return new Response();
}