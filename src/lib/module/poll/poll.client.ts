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
    };

    export const adminRequest = {
        async addPoll(poll: Poll.DataWithoutId): Promise<RResponse<void>> {
            const response = await fetch(`/admin/api/poll`, {
                method: 'POST',
                body: JSON.stringify(poll)
            });

            const data = await response.json().catch(() => ({}));

            if (response.status === 200) {
                return {
                    status: 'success',
                    data: undefined
                }
            }
            else {
                return {
                    status: 'error',
                    statusCode: response.status,
                    reason: data.reason
                }
            }
        },
        async deletePoll(id: number): Promise<RResponse<void>> {
            const response = await fetch(`/admin/api/poll`, {
                method: 'DELETE',
                body: JSON.stringify({id})
            });

            const data = await response.json().catch(() => ({}));

            if (response.status >= 200 && response.status < 300) {
                return {
                    status: 'success',
                    data: undefined
                }
            }
            else {
                return {
                    status: 'error',
                    statusCode: response.status,
                    reason: data.reason
                }
            }
        },
    }
};

Poll.Client = PollClient;

export type { PollClient };
export { Poll }