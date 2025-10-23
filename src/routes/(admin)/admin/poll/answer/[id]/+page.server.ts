import { error } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import { Poll } from "$lib/module/poll/poll.server";

export async function load({params}: RequestEvent){
    const pollId = Number(params.id);
    if(Number.isNaN(pollId) || !Number.isInteger(pollId) || pollId < 1){
        throw error(404);
    }

    const pollData = await Poll.Server.DBController.getPoll(pollId);
    if(!pollData) throw error(404);

    const answers = await Poll.Server.DBController.getAllAnswer(pollId);
    
    return {
        pollData,
        answers
    }
}