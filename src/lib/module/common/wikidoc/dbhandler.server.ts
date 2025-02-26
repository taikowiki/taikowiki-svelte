import { defineDBHandler } from "@yowza/db-handler";
import type { WikiDocData, WikiNormalDocData, WikiRedirectDocData, WikiSongDocData } from "./types/wikidoc.types.js";
import { WikiError } from "./wikiError.js";
import { renderer } from "./renderer.js";
import { validateDocData } from "./util.js";

export const docDBHandler = {
    /**
     * @throws `DUPLICATED_TITLE` 제목이 중복됨.
     * @throws `EMPTY_TITLE` 제목이 비어있음.
     * @throws `INVALID_DOC_DATA_TYPE` 올바르지 않은 문서 데이터 타입.
     * @throws `EMPTY_PARAGRAPH_TITLE` 문단 제목이 비어있음.
     */
    uploadNewDoc: defineDBHandler<[UUID: string, docData: WikiDocData]>((UUID, docData) => {
        return async(run) => {
            if(!docData.title){
                throw new WikiError("EMPTY_TITLE");
            }

            const docTitleExists = await docDBHandler.isDocTitleExists.getCallback(docData.title)(run);
            if(docTitleExists){
                throw new WikiError("DUPLICATED_TITLE");
            }

            if(!["normal", "song", "redirect"].includes(docData.type)){
                throw new WikiError("INVALID_DOC_DATA_TYPE");
            }

            if(!validateDocData(docData)){
                throw new WikiError("EMPTY_PARAGRAPH_TITLE");
            }

            const rendered = (docData as WikiNormalDocData).contentTree ? await renderer.prerenderContentTree((docData as WikiNormalDocData).contentTree) : null;

            console.log(rendered);

            await run("INSERT INTO `wiki/docs` (`title`, `type`, `editorUUID`, `contentTree`, `renderedContentTree`, `songNo`, `redirectTo`) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [
                    docData.title, 
                    docData.type, 
                    UUID, 
                    (docData as WikiNormalDocData).contentTree ? JSON.stringify((docData as WikiNormalDocData).contentTree) : null, 
                    (docData as WikiNormalDocData).contentTree ? JSON.stringify(await renderer.prerenderContentTree((docData as WikiNormalDocData).contentTree)) : null, 
                    (docData as WikiSongDocData).songNo ?? null,
                    (docData as WikiRedirectDocData).redirectTo ?? null
                ]
            );
        }
    }),
    isDocTitleExists: defineDBHandler<[titls: string]>((title) => {
        return async(run) => {
            const result = await run("SELECT COUNT(*) AS COUNT FROM `wiki/docs` WHERE `title` = ?",
                [title]
            );

            if(result[0].COUNT === 0){
                return false;
            }

            return true;
        }
    })
} as const;