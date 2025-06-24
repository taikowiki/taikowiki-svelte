import type { RResponse } from "@yowza/rrequestor/types";
import { Doc } from ".";
import type { Transaction, EditorState } from "prosemirror-state";
import { defineRequestHandler } from "@yowza/rrequestor";
import * as wikiElement from './client/wikiElements';

const { renderer } = Doc;

namespace DocClient {
    export namespace markdownCommands {
        /**
         * 이미지를 삽입하는 함수.
         * 높이, 너비가 지정되지 않으면 `![]()` 형태로,
         * 지정되면 `<img style="" src=""/>` 형태로 삽입힌다.
         * @param option 
         * @param state 
         * @param dispatch 
         * @param view 
         * @returns 
         */
        export function insertImage(option: Doc.Toast.ImagePluginFunctionOption, state: any, dispatch: any, view: any,) {
            const transcation: Transaction = state.tr;
            if (option.size.x || option.size.y) {
                const width = option.size.x
                    ? option.size.x + "px"
                    : "auto";
                const height = option.size.y
                    ? option.size.y + "px"
                    : "auto";
                transcation.insertText(
                    `<img src="${encodeURI(option.url)}" alt="${option.description}" width="${width}" height="${height}"/>`,
                );
            } else {
                transcation.insertText(
                    `![${option.description}](${encodeURI(option.url)})`,
                );
            }

            dispatch(transcation);
            view.focus();

            return true;
        }

        /**
         * 주석을 삽입하는 함수.
         * `[* 주석내용]` 또는 `[*A 주석내용]` 형태로 삽입한한다.
         * @param option 
         * @param state 
         * @param dispatch 
         * @param view 
         * @returns 
         */
        export function insertAnnotation(option: Doc.Toast.AnnotPluginFunctionOption, state: any, dispatch: any, view: any,) {
            const transcation: Transaction = state.tr;
            if (option.content) {
                const content = escapeBrace(escapeBackSlash(option.content));
                transcation.insertText(`[*${option.key || ''} ${content}]`);
            }
            else {
                transcation.insertText(`[*${option.key || ''}]`);
            }

            dispatch(transcation);
            view.focus();

            return true;
        }

        /**
         * 위키 문서 링크를 삽입하는 함수.
         * `<wiki-link doctitle=""/>` 형태로 삽입한다.
         * @param option 
         * @param state 
         * @param dispatch 
         * @param view 
         * @returns 
         */
        export function insertWikiLink(option: Doc.Toast.WikiLinkPluginFunctionOption, state: any, dispatch: any, view: any) {
            const transcation: Transaction = state.tr;
            if (option.content) {
                transcation.insertText(`<wiki-link doctitle="${renderer.escapeHtml(option.docTitle ?? '')}">${renderer.escapeHtml(option.content)}</wiki-link>`);
            }
            else {
                transcation.insertText(`<wiki-link doctitle="${renderer.escapeHtml(option.docTitle ?? '')}"/>`);
            }

            dispatch(transcation);
            view.focus();

            return true;
        }

        export function insertYoutube(option: Doc.Toast.WikiYoutubePluginFunctionOption, state: any, dispatch: any, view: any) {
            const transaction: Transaction = state.tr;

            transaction.insertText(`<wiki-yt v="${renderer.escapeHtml(option.v)}" width="${renderer.escapeHtml(option.width ?? "")}" height="${renderer.escapeHtml(option.height ?? "")}"/>`);

            dispatch(transaction);
            view.focus();

            return true;
        }

        export function insertColoredText(option: Doc.Toast.ColoredTextFunctionOption, state: any, dispatch: any, view: any) {
            const transaction: Transaction = state.tr;

            const { from, to } = (state as EditorState).selection;
            transaction.insertText('</text>', to).insertText(`<text color="${option.color}">`, from).scrollIntoView();

            dispatch(transaction);
            view.focus();

            return true;
        }
        export function insertBgColoredText(option: Doc.Toast.ColoredTextFunctionOption, state: any, dispatch: any, view: any) {
            const transaction: Transaction = state.tr;

            const { from, to } = (state as EditorState).selection;
            transaction.insertText('</text>', to).insertText(`<text bgcolor="${option.color}">`, from).scrollIntoView();

            dispatch(transaction);
            view.focus();

            return true;
        }
        function escapeBackSlash(content: string) {
            const part = content.split('\\');
            return part.join('\\\\');
        }
        function escapeBrace(content: string) {
            let part = content.split('[');
            content = part.join('\\[');
            part = content.split(']');
            return part.join('\\]');
        }
    }
    export const request = {
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
    };
    export const adminRequest = {
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
    }
    export const element = {
        defineWikiElements: wikiElement.defineWikiElements,
        isDefined: wikiElement.isDefined,
        WikiFrameViewElement: wikiElement.WikiFrameViewElement,
        WikiAnnotationElement: wikiElement.WikiAnnotationElement,
        WikiLink: wikiElement.WikiLink,
        WikiYoutube: wikiElement.WikiYoutube,
        WikiRoot: wikiElement.WikiRoot,
        WikiFloat: wikiElement.WikiFloat
    }
}

Doc.Client = DocClient;

export { Doc };