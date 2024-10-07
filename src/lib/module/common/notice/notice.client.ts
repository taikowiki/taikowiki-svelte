import { defineRequestHandler } from "@yowza/rrequestor";
import showdown from "showdown";
import type { Notice } from "./types";

const converter = new showdown.Converter({
    requireSpaceBeforeHeadingText: true,
    tables: true,
    strikethrough: true,
    simplifiedAutoLink: true,
    ghCodeBlocks: true
})

export function convertNoticeMd(md: string){
    return converter.makeHtml(md);
}

export const adminNoticeRequestor = {
    writeNotice: defineRequestHandler<{notice: Omit<Notice, "order" | "writtenDate">}, void>({
        url: '/admin/api/notice/write',
        method: 'post'
    }),
    deleteNotice: defineRequestHandler<{order: number}, void>({

        url: '/admin/api/notice/delete',
        method: 'delete'
    }),
    editNotice: defineRequestHandler<{order: number; notice: Omit<Notice, "order" | "writtenDate">}, void>({
        url: '/admin/api/notice/edit',
        method: 'post'
    })
}