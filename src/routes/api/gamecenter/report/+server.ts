import { AMENITY, GAMECENTERREGION } from '$lib/module/common/gamecenter/const.js';
import { gamecenterDBController } from '$lib/module/common/gamecenter/gamecenter.server.js';
import type { GameCenterDataWithoutOrderAndFavoriteCount, GameCenterRequestData } from '$lib/module/common/gamecenter/types.js';
import { error } from '@sveltejs/kit';

export async function POST({locals, request, getClientAddress}){
    if(!locals.userData || locals.userData.grade < 2){
        throw error(401);
    }

    const requestData: Partial<GameCenterRequestData> = (await request.json()).gamecenterData;

    if(!("name" in requestData) || typeof(requestData.name) !== "string" || !requestData.name){
        throw error(400, JSON.stringify({
            reason: 'Error in "name"'
        }));
    }
    if(!("address" in requestData) || typeof(requestData.address) !== "string" || !requestData.address){
        throw error(400, JSON.stringify({
            reason: 'Error in "address"'
        }));
    }
    if(!("amenity" in requestData) || typeof(requestData.amenity) !== "object" || !AMENITY.every(amenity => {
        return amenity in (requestData.amenity as any) && typeof((requestData.amenity as any)[amenity]) === "boolean"
    })){
        throw error(400, JSON.stringify({
            reason: 'Error in "amenity"'
        }));
    }
    if(!("businessHours" in requestData) || typeof(requestData.businessHours) !== "object" || ![0,1,2,3,4,5,6].every(day => {
        return day in (requestData.businessHours as any) && typeof((requestData.businessHours as any)[day]) === "string"
    })){
        throw error(400, JSON.stringify({
            reason: 'Error in "businessHours"'
        }));
    }
    if(!("region" in requestData) || !GAMECENTERREGION.includes(requestData.region as typeof GAMECENTERREGION[number])){
        throw error(400, JSON.stringify({
            reason: 'Error in "region"'
        }));
    }
    if(!("machines" in requestData) || !Array.isArray(requestData.machines) || !(requestData.machines as any[]).every(machine => {
        return "price" in machine && "tunes" in machine && "count" in machine && typeof(machine.price) === "number" && typeof(machine.tunes) === "number" && typeof(machine.count) === "number"
    })){
        throw error(400), JSON.stringify({
            reason: 'Error in "machines"'
        });
    }

    const gamecenterData = requestData as GameCenterRequestData

    await gamecenterDBController.addReport({
        gamecenterData,
        UUID: locals.userData.UUID,
        ip: getClientAddress()
    });

    return new Response();
}