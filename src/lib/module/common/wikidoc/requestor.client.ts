import { defineRequestHandler } from "@yowza/rrequestor";
import type { WikiDocData } from "./types/wikidoc.types"

export const wikiDocRequestor = {
    /**
     * @throws `DUPLICATED_TITLE` 제목이 중복됨.
     * @throws `EMPTY_TITLE` 제목이 비어있음.
     * @throws `INVALID_DOC_DATA_TYPE` 올바르지 않은 문서 데이터 타입.
     * @throws `EMPTY_PARAGRAPH_TITLE` 문단 제목이 비어있음.
     * @throws `REDIRECT_DOC_NOT_EXISTS` 리다이렉트 할 문서가 존재하지 않음.
     */
    uploadNew: defineRequestHandler<{ docData: WikiDocData }, void>({
        url: '/api/doc/create',
        method: 'post'
    })
} as const;