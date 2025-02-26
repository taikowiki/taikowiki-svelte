import { defineRequestHandler } from "@yowza/rrequestor";
import type { WikiDocData } from "./types/wikidoc.types"

export const wikiRequestor = {
    uploadNew: defineRequestHandler<{docData: WikiDocData}, void>({
        url: '/api/wikidoc/upload-new',
        method: 'post'
    })
} as const;