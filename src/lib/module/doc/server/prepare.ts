import type { HTMLElement } from "node-html-parser";
import type { Doc } from "..";
import { renderer } from "../util";
import type { QueryFunction } from '@yowza/db-handler/types';
import { Util } from "$lib/module/util/util.server";

const { queryBuilder } = Util.Server;

export async function setWikiLinkAvailable(dom: HTMLElement, run: QueryFunction) {
    for (const wikiLinkElement of dom.querySelectorAll('wiki-link')) {
        const docTitle = wikiLinkElement.getAttribute('doctitle');
        if (!docTitle) {
            wikiLinkElement.setAttribute('available', 'false');
            continue;
        }

        const count = await queryBuilder
            .select('docs', ({ count }) => ({
                count: count()
            }))
            .where(({ compare, column, value }) => [
                compare(column('title'), '=', value(docTitle)),
                compare(column('isDeleted'), '=', value(0))
            ])
            .execute(run)
            .then((r) => r[0].count);

        if (count === 0) {
            var exists = false;
        }
        else {
            var exists = true;
        }

        if (exists) {
            wikiLinkElement.setAttribute('available', 'true');
        }
        else {
            wikiLinkElement.setAttribute('available', 'false');
        }
    }
}
export async function prepareParagraphs(subParagraphs: Doc.Data.DocParagraph[], run: QueryFunction) {
    const prepared: Doc.Data.DocParagraph[] = [];
    for (const subParagraph of subParagraphs) {
        prepared.push({
            title: subParagraph.title,
            content: await renderer.prepareView(subParagraph.content, async (dom: HTMLElement) => {
                await setWikiLinkAvailable(dom, run)
            }),
            subParagraphs: await prepareParagraphs(subParagraph.subParagraphs, run)
        })
    }
    return prepared;
}