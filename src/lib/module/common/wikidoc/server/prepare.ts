import type { HTMLElement } from "node-html-parser";
import type { Doc } from "../types";
import { renderer } from "../util";
import { docDBController } from "./dbController.server";

export async function setWikiLinkAvailable(dom: HTMLElement, run: any) {
    for (const wikiLinkElement of dom.querySelectorAll('wiki-link')) {
        const docTitle = wikiLinkElement.getAttribute('doctitle');
        if (!docTitle) {
            wikiLinkElement.setAttribute('available', 'false');
            continue;
        }

        const exists = await docDBController.docTitleExists.getCallback(docTitle)(run);
        if (exists) {
            wikiLinkElement.setAttribute('available', 'true');
        }
        else {
            wikiLinkElement.setAttribute('available', 'false');
        }
    }
}
export async function prepareParagraphs(subParagraphs: Doc.Data.DocParagraph[], run: any) {
    const prepared: Doc.Data.DocParagraph[] = [];
    for (const subParagraph of subParagraphs) {
        prepared.push({
            title: subParagraph.title,
            content: await renderer.prepareView(subParagraph.content, async (dom: HTMLElement) => {
                setWikiLinkAvailable(dom, run)
            }),
            subParagraphs: await prepareParagraphs(subParagraph.subParagraphs, run)
        })
    }
    return prepared;
}