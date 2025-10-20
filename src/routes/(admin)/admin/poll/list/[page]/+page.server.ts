import { error } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import { Poll } from "$lib/module/poll";

await Poll.importServer();

export async function load({ params }: RequestEvent) {
    const page = Number(params.page);
    if(Number.isNaN(page) || !Number.isInteger(page) || page < 1){
        throw error(404);
    }

    const {polls, length} = await Poll.Server.DBController.getPolls(page);
    
    return{
        polls,
        length,
        page
    }
}