import { Doc } from "$lib/module/doc/doc.server";
import { error } from "@sveltejs/kit";
import { queryBuilder, runQuery, Where } from "@yowza/db-handler";
import type { QueryFunction } from "@yowza/db-handler/types";
import type { HTMLElement } from "node-html-parser";

const {renderer} = Doc;
const {DBController, prepareParagraphs, setWikiLinkAvailable} = Doc.Server;

export async function load({ params, locals }) {
    const id = Number(params.id);
    const version = Number(params.version);

    if (Number.isNaN(id) || Number.isNaN(version)) {
        throw error(404);
    }

    const { docData, editableGrade } = await runQuery(async (run) => {
        const pastDoc = await DBController.getPast.getCallback(id, version)(run);
        if (!pastDoc) {
            return {
                docData: null
            };
        }

        const preparedContent: Doc.Data.ContentTree = await getPreparedContent(pastDoc, run);

        const query = queryBuilder.select('docs', ['editableGrade']).where(Where.Compare('id', '=', id)).build();
        const r = await run(query);
        const editableGrade = r[0]?.editableGrade ?? 10;

        return {
            docData: {
                ...pastDoc,
                contentTree: preparedContent
            },
            editableGrade
        }
    });


    if (!docData) {
        throw error(404);
    }

    return {
        docData,
        canEditable: locals.userData ? locals.userData.grade >= editableGrade : false
    }
}

async function getPreparedContent(pastDoc: Pick<Doc.DB.DocDBData, 'renderedContentTree' | 'type' | 'redirectTo'>, run: QueryFunction){
    if(pastDoc.type === "redirect"){
        return {
            content: ``,
            subParagraphs: []
        }
    }
    return {
        content: await renderer.prepareView(pastDoc.renderedContentTree?.content as string, async(dom: HTMLElement) => {await setWikiLinkAvailable(dom, run)}),
        subParagraphs: await prepareParagraphs(pastDoc.renderedContentTree?.subParagraphs as Doc.Data.DocParagraph[], run)
    }
}