import { Poll } from "$lib/module/poll/poll.server";
import type { RequestEvent } from "./$types";

export async function POST({ request, locals }: RequestEvent) {
    if (!locals.userData) {
        return new Response(
            JSON.stringify({
                reason: "NOT_LOGINED"
            }),
            {
                status: 401
            }
        )
    }

    try {
        var answerData = await request.json();
        Poll.Schema.AnswerReqData.parse(answerData);
    }
    catch {
        return new Response(
            JSON.stringify({
                reason: "INVALID_REQUEST_DATA"
            }),
            {
                status: 400
            }
        );
    }

    try {
        await Poll.Server.DBController.addAnswer(locals.userData.UUID, answerData);
        return new Response();
    }
    catch (err) {
        return new Response(
            JSON.stringify({
                reason: "INVALID_REQUEST_DATA"
            }),
            {
                status: 500
            }
        );
    }
}

export async function PATCH({ request, locals }: RequestEvent) {
    if (!locals.userData) {
        return new Response(
            JSON.stringify({
                reason: "NOT_LOGINED"
            }),
            {
                status: 401
            }
        )
    }

    try {
        var answerData = await request.json();
        Poll.Schema.AnswerReqData.parse(answerData);
    }
    catch (err){
        console.error(err);
        return new Response(
            JSON.stringify({
                reason: "INVALID_REQUEST_DATA"
            }),
            {
                status: 400
            }
        );
    }

    try {
        await Poll.Server.DBController.updateAnswer(locals.userData.UUID, answerData);
        return new Response();
    }
    catch (err) {
        return new Response(
            JSON.stringify({
                reason: "INVALID_REQUEST_DATA"
            }),
            {
                status: 500
            }
        );
    }
}