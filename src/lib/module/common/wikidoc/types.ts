export namespace Doc {
    /**
     * Toast 에디터에서 사용하는 타입
     */
    export namespace Toast {
        export interface ImagePluginFunctionOption {
            url: string;
            description: string;
            size: {
                x: number | null;
                y: number | null;
            }
        }

        export interface AnnotPluginFunctionOption {
            key: string | null;
            content: string | null;
        }

        export interface WikiLinkPluginFunctionOption {
            docTitle: string | null;
            content: string | null;
        }
    }
    /**
     * DB에서 가져오는 데이터
     */
    export namespace DB {
        // doc
        export interface WikiDocDBDataBase {
            id: number;
            title: string;
            type: 'normal' | 'song' | 'frame' | 'redirect';
            editableGrade: number;
            editorUUID: string;
            editorIp: string;
            comment: string;
            contentTree: Data.WikiContentTree | null; // JSON
            renderedContentTree: Data.WikiContentTree | null; // JSON
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
            contentTree: Data.WikiContentTree;
            renderedContentTree: Data.WikiContentTree;
            songNo: null;
            redirectTo: null;
            //annotations: string[];
            //renderedAnnotations: string[];
        }
        export interface WikiSongDocDBData extends WikiDocDBDataBase {
            type: 'song';
            contentTree: Data.WikiContentTree;
            renderedContentTree: Data.WikiContentTree;
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
    }
    /**
     * 문서 데이터에 관련한 타입
     */
    export namespace Data {
        export interface WikiContentTree {
            content: string;
            subParagraphs: WikiDocParagraph[];
        }
        export interface WikiDocParagraph {
            title: string;
            content: string;
            subParagraphs: WikiDocParagraph[];
        }
        export type WikiPrerenderedContentTree = WikiContentTree;

        export interface WikiDocDataBase {
            title: string;
            type: 'normal' | 'song' | 'frame' | 'redirect';
            comment: string;
            contentTree: WikiContentTree | null;
            songNo: string | null;
            redirectTo: string | null;
        }
        export interface WikiNormalDocData extends WikiDocDataBase {
            type: 'normal';
            contentTree: WikiContentTree;
            songNo: null;
            redirectTo: null;
        }
        export interface WikiSongDocData extends WikiDocDataBase {
            type: 'song';
            contentTree: WikiContentTree;
            songNo: string;
            redirectTo: null;
        }
        export interface WikiRedirectDocData extends WikiDocDataBase {
            type: 'redirect';
            contentTree: null;
            songNo: null;
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
    }
    /**
     * 렌더러에 사용하는 타입
     */
    export namespace Render {
        export type AllowedTag = string | { tagName: string, attributes: string[] };
    }
    /**
     * 
     */
    export namespace Element {

    }
    /**
     * API에서 사용하는 타입
     */
    export namespace Rest {
        export interface WikiFrameResponse {
            title: string;
            renderedContentTree: DB.WikiFrameDBData['renderedContentTree']
        }
    }
}

// 윈도우 컨텍스트
import type { Writable } from "svelte/store";
declare global{
	interface Window {
		__wiki__window__context__: WikiWindowContext;
	}
}
export type WikiWindowContext = 
	Map<'theme', Writable<'light' | 'dark'>> &
	Map<'isMobile', Writable<boolean>> &
	Map<'wikiDocAnnotations', Map<string, string>> &
	Map<'wikiDocFrames', Map<string, string>> &
	Map<'wikiDocURLBase', string> & 
	Map<string & {}, any>;