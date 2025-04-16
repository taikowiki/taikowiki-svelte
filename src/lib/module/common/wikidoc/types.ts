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

        export interface WikiYoutubePluginFunctionOption{
            v: string;
            width: string | null;
            height: string | null;
        }

        export interface ColoredTextFunctionOption{
            color: string;
        }
    }
    /**
     * DB에서 가져오는 데이터
     */
    export namespace DB {
        // doc
        export interface DocDBDataBase {
            id: number;
            title: string;
            type: 'normal' | 'song' | 'frame' | 'redirect';
            editableGrade: number;
            editorUUID: string | null;
            editorIp: string;
            comment: string;
            contentTree: Data.ContentTree | null; // markdown JSON
            renderedContentTree: Data.ContentTree | null; // html JSON
            flattenedContent: string | null; // string
            songNo: string | null;
            redirectTo: number | null;
            createdTime: Date;
            editedTime: Date;
            isDeleted: boolean;
            version: number;
            diffIncrease: number | null;
            diffDecrease: number | null;
        }
        export interface NormalDocDBData extends DocDBDataBase {
            type: 'normal';
            contentTree: Data.ContentTree;
            renderedContentTree: Data.ContentTree;
            songNo: null;
            redirectTo: null;
            //annotations: string[];
            //renderedAnnotations: string[];
        }
        export interface SongDocDBData extends DocDBDataBase {
            type: 'song';
            contentTree: Data.ContentTree;
            renderedContentTree: Data.ContentTree;
            //annotations: string[];
            //renderedAnnotations: string[];
            songNo: string;
            redirectTo: null;
        }
        export interface RedirectDocData extends DocDBDataBase {
            type: 'redirect';
            contentTree: null;
            renderedContentTree: null;
            songNo: null;
            redirectTo: number;
        }
        export type DocDBData = NormalDocDBData | SongDocDBData | RedirectDocData;

        // frame
        export interface FrameDBData {
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

        export type DocLogData = DocDBData & {
            diffAdd: number;
            diffSubtract: number;
        };

        // controller Return Type
        export namespace ControllerReturnTypes {
            export type getLogData = {
                logs: (Pick<Doc.DB.DocDBData, 'title' | 'version' | 'editedTime' | 'comment' | 'diffDecrease' | 'diffIncrease'> & { editor: string })[];
                current: getLogData["logs"][number] | null;
            }
        }
    }
    /**
     * 문서 데이터에 관련한 타입
     */
    export namespace Data {
        export interface ContentTree {
            content: string;
            subParagraphs: DocParagraph[];
        }
        export interface DocParagraph {
            title: string;
            content: string;
            subParagraphs: DocParagraph[];
        }
        export type PrerenderedContentTree = ContentTree;

        export interface DocDataBase {
            title: string;
            type: 'normal' | 'song' | 'frame' | 'redirect';
            comment: string;
            contentTree: ContentTree | null;
            songNo: string | null;
            redirectTo: string | null;
        }
        export interface NormalDocData extends DocDataBase {
            type: 'normal';
            contentTree: ContentTree;
            songNo: null;
            redirectTo: null;
        }
        export interface SongDocData extends DocDataBase {
            type: 'song';
            contentTree: ContentTree;
            songNo: string;
            redirectTo: null;
        }
        export interface RedirectDocData extends DocDataBase {
            type: 'redirect';
            contentTree: null;
            songNo: null;
            redirectTo: string;
        }
        export type DocData = NormalDocData | RedirectDocData | SongDocData;

        export interface FrameData {
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
        export interface FrameResponse {
            title: string;
            renderedContentTree: DB.FrameDBData['renderedContentTree']
        }
    }
}

// 윈도우 컨텍스트
import type { Writable } from "svelte/store";
declare global{
	interface Window {
		__doc__window__context__: DocWindowContext;
	}
}
export type DocWindowContext = 
	Map<'theme', Writable<'light' | 'dark'>> &
	Map<'isMobile', Writable<boolean>> &
	Map<'wikiDocAnnotations', Map<string, string>> &
	Map<'wikiDocFrames', Map<string, string>> &
	Map<'wikiDocURLBase', string> & 
	Map<string & {}, any>;