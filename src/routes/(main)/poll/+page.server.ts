import { Poll } from "$lib/module/poll/poll.server";
import { runQuery } from "@yowza/db-handler";
import type { RequestEvent } from "../$types";

const { DBController } = Poll.Server;

export async function load({ locals }: RequestEvent) {
    const { openedPolls, answers } = await runQuery(async (run) => {
        const openedPolls = await DBController.getOpenedPolls.getCallback()(run);

        const answers: Record<number, Poll.Answer> = {};
        if (locals.userData) {
            for (const poll of openedPolls) {
                const answer = await DBController.getAnswer.getCallback(locals.userData.UUID, poll.id)(run);
                if (answer) answers[poll.id] = answer;
            }
        }

        return { openedPolls, answers };
    });

    return {
        openedPolls,
        answers
    }
}