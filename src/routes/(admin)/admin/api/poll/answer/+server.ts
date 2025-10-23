import { Poll } from "$lib/module/poll/poll.server";
import { error, type RequestEvent } from "@sveltejs/kit";

export async function GET({ url }: RequestEvent) {
    const pollId = Number(url.searchParams.get('id'));
    if (Number.isNaN(pollId) || !Number.isInteger(pollId) || pollId < 1) {
        throw error(404);
    }

    if (!(await Poll.Server.DBController.doesPollExists(pollId))) {
        throw error(404);
    }

    const answers = await Poll.Server.DBController.getAllAnswer(pollId);

    return new Response(JSON.stringify(answers));
}