import type { HTMLElement } from "node-html-parser";
import { Doc } from "..";
import type { QueryFunction } from '@yowza/db-handler/types';
import { Util } from "$lib/module/util/util.server";

const { queryBuilder } = Util.Server;
const { renderer } = Doc;

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

    const songNoTitleMap = new Map<string, string>();
    for (const wikiSongElement of dom.querySelectorAll('wiki-song')) {
        const songNo = wikiSongElement.getAttribute('songno');
        if (!songNo) {
            wikiSongElement.setAttribute('available', 'false');
            continue;
        }

        let title = songNoTitleMap.get(songNo);
        if (title) {
            wikiSongElement.setAttribute('songtitle', title);
            wikiSongElement.setAttribute('available', 'true');
            continue;
        }

        const rows = await queryBuilder
            .select('song', ({ column }) => ({ title: column('title') }))
            .where(({ compare, column, value }) => [compare(column('songNo'), '=', value(songNo))])
            .execute(run);

        if (rows.length === 0) {
            wikiSongElement.setAttribute('available', 'false');
            continue;
        }

        title = rows[0].title;
        songNoTitleMap.set(songNo, title as string);
        wikiSongElement.setAttribute('songtitle', title as string);
        wikiSongElement.setAttribute('available', 'true');
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