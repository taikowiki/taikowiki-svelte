import { defineRequestHandler } from "@yowza/rrequestor";
import type { RResponse } from '@yowza/rrequestor/types';
import type { Doc } from '$lib/module/common/wikidoc/types';

export const wikiDocRequestor = {
    /**
     * @throws `DUPLICATED_TITLE` 제목이 중복됨.
     * @throws `DUPLICATED_SONG_NO` 곡 번호가 중복됨.
     * @throws `EMPTY_TITLE` 제목이 비어있음.
     * @throws `INVALID_DOC_DATA_TYPE` 올바르지 않은 문서 데이터 타입.
     * @throws `DOC_DATA_ERR` 문서 데이터가 올바르지 않음.
     * @throws `REDIRECT_DOC_NOT_EXISTS` 리다이렉트 할 문서가 존재하지 않음.
     * @throws `SONG_NOT_EXISTS` 연결할 곡이 존재하지 않음.
     * @throws `NOT_LOGINED` 로그인 되어있지 않음.
     * @throws `LOW_GRADE` 권한 등급이 낮음.
     */
    uploadNew: async ({ docData }: { docData: Doc.Data.DocData }): Promise<RResponse<any>> => {
        try {
            const response = await fetch('/api/doc/create', {
                method: 'post',
                body: JSON.stringify({
                    docData
                }),
                credentials: 'include'
            });

            if (response.status.toString().startsWith('2')) {
                return {
                    status: 'success',
                    data: null
                }
            }
            else {
                return {
                    status: 'error',
                    statusCode: response.status,
                    reason: (await response.json())?.reason
                }
            }
        }
        catch (err) {
            return {
                status: 'error',
                statusCode: 400
            }
        }
    },
    /**
     * @throws `DUPLICATED_TITLE` 제목이 중복됨.
     * @throws `DUPLICATED_SONG_NO` 곡 번호가 중복됨.
     * @throws `EMPTY_TITLE` 제목이 비어있음.
     * @throws `INVALID_DOC_DATA_TYPE` 올바르지 않은 문서 데이터 타입.
     * @throws `DOC_DATA_ERR` 문서 데이터가 올바르지 않음.
     * @throws `REDIRECT_DOC_NOT_EXISTS` 리다이렉트 할 문서가 존재하지 않음.
     * @throws `SONG_NOT_EXISTS` 연결할 곡이 존재하지 않음.
     * @throws `ID_NOT_EXISTS` 해당 ID의 문서가 존재하지 않음.
     * @throws `NOT_LOGINED` 로그인 되어있지 않음.
     * @throws `LOW_GRADE` 권한 등급이 낮음.
     */
    update: async ({ id, docData }: { id: number, docData: Doc.Data.DocData }): Promise<RResponse<any>> => {
        try {
            const response = await fetch('/api/doc/update', {
                method: 'post',
                body: JSON.stringify({
                    id,
                    docData
                }),
                credentials: 'include'
            });

            if (response.status.toString().startsWith('2')) {
                return {
                    status: 'success',
                    data: null
                }
            }
            else {
                return {
                    status: 'error',
                    statusCode: response.status,
                    reason: (await response.json())?.reason
                }
            }
        }
        catch (err) {
            return {
                status: 'error',
                statusCode: 400
            }
        }
    }
} as const;

export const docAdminRequestor = {
    delete: async (id: number) => {
        const url = `/admin/api/doc/${id}/delete`;

        const handler = defineRequestHandler({
            url,
            method: 'delete'
        });

        return await handler(null);
    },
    restore: async (id: number) => {
        const url = `/admin/api/doc/${id}/restore`;

        const handler = defineRequestHandler({
            url,
            method: 'get'
        });

        return await handler(null);
    },
    changeEditableGrade: async (id: number, grade: number) => {
        const url = `/admin/api/doc/${id}/change-editable-grade`;

        const handler = defineRequestHandler<{ grade: number }, void>({
            url,
            method: 'post'
        });

        return await handler({ grade })
    },
    hardDelete: async (id: number) => {
        const url = `/admin/api/doc/${id}/harddelete`;

        const handler = defineRequestHandler({
            url,
            method: 'delete'
        });

        return await handler(null);
    }
} as const;