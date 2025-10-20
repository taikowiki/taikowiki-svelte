import { Poll } from "$lib/module/poll/poll.server";
import { error, isHttpError } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";

export async function POST({ request }: RequestEvent) {
    try {
        var data: Poll.DataWithoutId = await request.json();
        if (data.until) {
            data.until = new Date(data.until);
        }
        Poll.Schema.DataWithoutId.parse(data);
    }
    catch (err) {
        throw error(400, { reason: 'INVALID_DATA', message: 'INVALID_DATA' });
    }

    await Poll.Server.DBController.createPoll(data);

    return new Response();
}

export async function DELETE({ request }: RequestEvent) {
    try{
        var id = await request.json().then((v) => v.id);
        if(typeof(id) !== "number"){
            throw '';
        }
    }
    catch (err) {
        throw error(400, { reason: 'INVALID_DATA', message: 'INVALID_DATA' });
    }

    try{
        const result = await Poll.Server.DBController.deletePoll(id);
        if(!result){
            throw error(404, {reason: 'INVALID_ID', message: 'INVALID_ID' })
        }
    }
    catch(err){
        if(isHttpError(err)){
            throw err;
        }
        throw error(500)
    }

    return new Response();
}