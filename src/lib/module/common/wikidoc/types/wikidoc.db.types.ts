import type { WikiContentTree } from "./wikidoc.types";

export interface WikiDocDBDataBase {
    id: number;
    title: string;
    type: 'normal' | 'song' | 'frame' | 'redirect';
    editableGrade: number;
    editorUUID: string;
    editorIp: string;
    comment: string;
    contentTree: WikiContentTree | null; // JSON
    renderedContentTree: WikiContentTree | null; // JSON
    normalizedContentTree: string | null;
    songNo: string | null;
    redirectTo: number | null;
    createdTime: Date;
    editedTime: Date;
    isDeleted: boolean;
    version: number;
}

export interface WikiNormalDocDBData extends WikiDocDBDataBase {
    type: 'normal';
    contentTree: WikiContentTree;
    renderedContentTree: WikiContentTree;
    songNo: null;
    redirectTo: null;
    //annotations: string[];
    //renderedAnnotations: string[];
}

export interface WikiSongDocDBData extends WikiDocDBDataBase {
    type: 'song';
    contentTree: WikiContentTree;
    renderedContentTree: WikiContentTree;
    //annotations: string[];
    //renderedAnnotations: string[];
    songNo: string;
    redirectTo: null;
}

export interface WikiRedirectDocDBData extends WikiDocDBDataBase {
    type: 'redirect';
    contentTree: null;
    renderedContentTree: null;
    songNo: null;
    redirectTo: number;
}

export type WikiDocDBData = WikiNormalDocDBData | WikiSongDocDBData | WikiRedirectDocDBData;

// frame

export interface WikiFrameDBData {
    id: number;
    title: string;
    type: 'frame';
    contentTree: {
        content: string;
    }
    renderedContentTree: {
        content: string;
    }
    createdTime: Date;
    editedTime: Date;
    editableGrade: number;
    editorUUID: string;
}

// log
export type WikiDocLogDBData = WikiDocDBData;