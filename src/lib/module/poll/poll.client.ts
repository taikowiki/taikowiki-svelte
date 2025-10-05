import type { RRequestData, RRequestHandler, RResponse } from "@yowza/rrequestor/types";
import { Poll } from ".";

namespace PollClient {
    export const request = {
        async submit(answerReqData: Poll.AnswerReqData, updating: boolean = true): Promise<RResponse<void>> {
            const response = await fetch(`/api/poll/submit`, {
                method: updating ? 'PATCH' : 'POST',
                body: JSON.stringify(answerReqData)
            });

            const data = await response.json().catch(() => ({}));

            if (response.status === 200) {
                return {
                    status: 'success',
                    data: undefined
                };
            }
            else {
                return {
                    status: 'error',
                    statusCode: response.status,
                    reason: data.reason ?? undefined
                }
            }
        }
    }
};

Poll.Client = PollClient;

export type { PollClient };
export { Poll }