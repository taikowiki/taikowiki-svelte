import { Poll } from "$lib/module/poll/poll.server";
import { error } from "@sveltejs/kit";
import { runQuery } from "@yowza/db-handler";

const { DBController } = Poll.Server;

export async function load({ locals, params }) {
    const page = Number(params.page);
    if(Number.isNaN(page) || !Number.isInteger(page) || page < 1){
        throw error(400);
    }

    const { closedPolls, answers, length } = await runQuery(async (run) => {
        const {datas: closedPolls, length} = await DBController.getClosedPolls.getCallback(page)(run);

        const answers: Record<number, Poll.Answer> = {};
        if (locals.userData) {
            for (const poll of closedPolls) {
                const answer = await DBController.getAnswer.getCallback(locals.userData.UUID, poll.id)(run);
                if (answer) answers[poll.id] = answer;
            }
        }

        return { closedPolls, answers, length };
    });

    if(closedPolls.length === 0){
        throw error(400);
    }

    return {
        closedPolls,
        answers,
        length
    }
}