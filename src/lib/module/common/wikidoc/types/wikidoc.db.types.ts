import type { WikiContentTree } from "./wikidoc.types";

export interface WikiDocDBDataBase {
    id: number;
    title: string;
    type: 'normal' | 'song' | 'frame' | 'redirect';
    createdTime: Date;
    editedTime: Date;
    editableGrade: number;
    editorUUID: string;
    isDeleted: boolean;
}

export interface WikiNormalDocDBData extends WikiDocDBDataBase {
    type: 'normal';
    contentTree: WikiContentTree;
    renderedContentTree: WikiContentTree;
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
}

export interface WikiRedirectDocDBData extends WikiDocDBDataBase {
    type: 'redirect';
    redirectTo: string;
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