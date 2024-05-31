export type Language = "jp" | "ko" | "en" | string;

export interface SubLangFile{
    [key: string]: string|SubLangFile
}

export interface PathLangFile{
    [pathname: string]: SubLangFile
}

export interface LayoutLangFile{
    layout?: {
        [layoutName: string]: SubLangFile
    };
}

export interface ComponentLangFile{
    component?:{
        [componentName: string]: SubLangFile
    }
}

export interface RecursiveStringRecord{
    [key: string]: string|RecursiveStringRecord
}

export type LangFile = LayoutLangFile & PathLangFile & ComponentLangFile

export type I18N = Record<'ko', LangFile>&Partial<Record<Language, LangFile>>;