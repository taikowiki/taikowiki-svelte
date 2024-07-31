import { AMENITY, GAMECENTERREGION } from '$lib/module/common/gamecenter/const.js';
import { gamecenterDBController } from '$lib/module/common/gamecenter/gamecenter.server.js';
import type { GameCenterData, GameCenterDataWithoutOrder } from '$lib/module/common/gamecenter/types.js';
import { error } from '@sveltejs/kit';

export async function POST({ request }) {
    const requestData: Partial<GameCenterDataWithoutOrder> = (await request.json()).gamecenterData;

    if (!("order" in requestData) || typeof (requestData.order) !== "number") {
        throw error(400, JSON.stringify({
            reason: 'Error in "order"'
        }));
    }
    if (!("name" in requestData) || typeof (requestData.name) !== "string" || !requestData.name) {
        throw error(400, JSON.stringify({
            reason: 'Error in "name"'
        }));
    }
    if (!("address" in requestData) || typeof (requestData.address) !== "string" || !requestData.address) {
        throw error(400, JSON.stringify({
            reason: 'Error in "address"'
        }));
    }
    if (!("amenity" in requestData) || typeof (requestData.amenity) !== "object" || !AMENITY.every(amenity => {
        return amenity in (requestData.amenity as any) && typeof ((requestData.amenity as any)[amenity]) === "boolean"
    })) {
        throw error(400, JSON.stringify({
            reason: 'Error in "amenity"'
        }));
    }
    if (!("businessHours" in requestData) || typeof (requestData.businessHours) !== "object" || ![0, 1, 2, 3, 4, 5, 6].every(day => {
        return day in (requestData.businessHours as any) && typeof ((requestData.businessHours as any)[day]) === "string"
    })) {
        throw error(400, JSON.stringify({
            reason: 'Error in "businessHours"'
        }));
    }
    if (!("region" in requestData) || !GAMECENTERREGION.includes(requestData.region as typeof GAMECENTERREGION[number])) {
        throw error(400, JSON.stringify({
            reason: 'Error in "region"'
        }));
    }
    if (!("machines" in requestData) || !Array.isArray(requestData.machines) || !(requestData.machines as any[]).every(machine => {
        return "price" in machine && "tunes" in machine && "count" in machine && typeof (machine.price) === "number" && typeof (machine.tunes) === "number" && typeof (machine.count) === "number"
    })) {
        throw error(400), JSON.stringify({
            reason: 'Error in "machines"'
        });
    }

    const gamecenterData = requestData as GameCenterData

    await gamecenterDBController.editGamecenter(gamecenterData)

    return new Response();
}