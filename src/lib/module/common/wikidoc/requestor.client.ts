import { defineRequestHandler } from "@yowza/rrequestor";
import type {Doc} from '$lib/module/common/wikidoc/types';

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
    uploadNew: defineRequestHandler<{ docData: Doc.Data.WikiDocData }, void>({
        url: '/api/doc/create',
        method: 'post'
    }),
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
    update: defineRequestHandler<{id: number, docData: Doc.Data.WikiDocData}, void>({
        url: '/api/doc/update',
        method: 'post'
    })
} as const;