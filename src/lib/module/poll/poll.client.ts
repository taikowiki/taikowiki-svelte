import type { RRequestData, RRequestHandler, RResponse } from "@yowza/rrequestor/types";
import { Poll } from ".";

namespace PollClient {
    export const request = {
        async submit(answerReqData: Poll.AnswerReqData, updating: boolean): Promise<RResponse<void>> {
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
                body: JSON.stringify({ id })
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
        /**
         * 특정 id의 설문의 모든 응답 데이터를 요청
         * @param id 
         * @returns 
         */
        async fetchAllAnswer(id: number): Promise<RResponse<{ [UUID: string]: Poll.Answer }>> {
            const response = await fetch(`/admin/api/poll/answer?id=${encodeURIComponent(id)}`, {
                method: 'get'
            });

            const data = await response.json().catch(() => ({}));

            if (response.status >= 200 && response.status < 300) {
                return {
                    status: 'success',
                    data
                }
            }
            else {
                return {
                    status: 'error',
                    statusCode: response.status,
                    reason: data.reason
                }
            }
        }
    }
};

Poll.Client = PollClient;

type P = typeof PollClient;
export type { P as PollClient };
export { Poll }