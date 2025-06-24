import { defineRequestHandler } from "@yowza/rrequestor";
import showdown from "showdown";
import { Notice } from ".";

namespace NoticeClient {
    const converter = new showdown.Converter({
        requireSpaceBeforeHeadingText: true,
        tables: true,
        strikethrough: true,
        simplifiedAutoLink: true,
        ghCodeBlocks: true
    });

    export function convertNoticeMd(md: string) {
        return converter.makeHtml(md);
    }

    export const adminRequest = {
        writeNotice: defineRequestHandler<{ notice: Omit<Notice.Notice, "order" | "writtenDate"> }, void>({
            url: '/admin/api/notice/write',
            method: 'post'
        }),
        deleteNotice: defineRequestHandler<{ order: number }, void>({

            url: '/admin/api/notice/delete',
            method: 'delete'
        }),
        editNotice: defineRequestHandler<{ order: number; notice: Omit<Notice.Notice, "order" | "writtenDate"> }, void>({
            url: '/admin/api/notice/edit',
            method: 'post'
        })
    }
};

Notice.Client = NoticeClient;