import type { WikiFrameDBData } from "./wikidoc.db.types";

//wiki doc type
export interface WikiContentTree{
    content: string;
    subParagraphs: WikiDocParagraph[];
}

export interface WikiPrerenderedContentTree{
    content: string;
    subParagraphs: WikiDocPrerenderedParagraph[];
}

export interface WikiDocDataBase {
    title: string;
    type: 'normal' | 'song' | 'frame' | 'redirect';
    comment: string;
}

export interface WikiDocParagraph {
    title: string;
    content: string;
    subParagraphs: WikiDocParagraph[];
}

export interface WikiDocPrerenderedParagraph{
    title: string;
    content: string;
    subParagraphs: WikiDocPrerenderedParagraph[];
}

export interface WikiNormalDocData extends WikiDocDataBase {
    type: 'normal';
    contentTree: WikiContentTree;
}

export interface WikiSongDocData extends WikiDocDataBase {
    type: 'song';
    contentTree: WikiContentTree;
    songNo: string;
}

export interface WikiRedirectDocData extends WikiDocDataBase {
    type: 'redirect';
    redirectTo: string;
}

export type WikiDocData = WikiNormalDocData | WikiRedirectDocData | WikiSongDocData;

// frame

export interface WikiFrameData {
    title: string;
    type: 'frame';
    contentTree: {
        content: string;
    }
}

export type DocType = 'normal' | 'song' | 'frame' | 'redirect';

// allowed tags
export type AllowedTag = string | { tagName: string, attributes: string[] };

// endpoint response
export interface WikiFrameResponse {
    title: string;
    renderedContentTree: WikiFrameDBData['renderedContentTree']
}