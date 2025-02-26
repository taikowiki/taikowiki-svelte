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

// view data
export interface WikiDocViewDataBase {
    title: string;
    type: 'normal' | 'song' | 'frame' | 'redirect';
    editedTime: Date;
    editableGrade: number;
}

export interface WikiNormalDocViewData extends WikiDocViewDataBase {
    type: 'normal';
    renderedContentTree: WikiContentTree;
    renderedAnnotations: string[];
}

export interface WikiSongDocViewData extends WikiDocViewDataBase {
    type: 'song';
    renderedContentTree: WikiContentTree;
    renderedAnnotations: string[];
    songNo: string;
}

export type WikiDocViewData = WikiNormalDocViewData | WikiSongDocViewData;

export interface WikiFrameViewData {
    title: string;
    type: 'frame';
    renderedContentTree: {
        content: string;
    }
    editedTime: Date;
    editableGrade: number;
}

// endpoint response
export interface WikiFrameResponse {
    title: string;
    renderedContentTree: WikiFrameDBData['renderedContentTree']
}