import type { HTMLElement } from "node-html-parser";
import type { Doc } from "..";
import { renderer } from "../util";
import { queryBuilder, Select, Where } from "@yowza/db-handler";
import type { QueryFunction } from '@yowza/db-handler/types';

export async function setWikiLinkAvailable(dom: HTMLElement, run: QueryFunction) {
    for (const wikiLinkElement of dom.querySelectorAll('wiki-link')) {
        const docTitle = wikiLinkElement.getAttribute('doctitle');
        if (!docTitle) {
            wikiLinkElement.setAttribute('available', 'false');
            continue;
        }

        const query = queryBuilder.select('docs', [Select.As(Select.Count(), 'COUNT')])
                        .where(
                            Where.Compare('title', '=', docTitle), 
                            Where.Compare('isDeleted', '=', 0)
                        )
                        .build();
        const result = await run(query);

        if((result?.[0]?.COUNT ?? 0) === 0){
            var exists = false;
        }
        else{
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