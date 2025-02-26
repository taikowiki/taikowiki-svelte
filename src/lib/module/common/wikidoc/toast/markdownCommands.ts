import type { AnnotPluginFunctionOption, ImagePluginFunctionOption, WikiLinkPluginFunctionOption } from "../types/toast.types.js";
import type { Transaction } from "prosemirror-state";
import { escapeHtml } from "../util.js";

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
export function insertImage(option: ImagePluginFunctionOption, state: any, dispatch: any, view: any,) {
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
export function insertAnnotation(option: AnnotPluginFunctionOption, state: any, dispatch: any, view: any,) {
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
export function insertWikiLink(option: WikiLinkPluginFunctionOption, state: any, dispatch: any, view: any) {
    const transcation: Transaction = state.tr;
    if (option.content) {
        transcation.insertText(`<wiki-link doctitle="${escapeHtml(option.docTitle ?? '')}">${escapeHtml(option.content)}</wiki-link>`);
    }
    else {
        transcation.insertText(`<wiki-link doctitle="${escapeHtml(option.docTitle ?? '')}"/>`);
    }

    dispatch(transcation);
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