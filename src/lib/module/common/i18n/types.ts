export type Language = "jp" | "ko" | "en";

export interface PathLangFile{
    [key: string]: string|PathLangFile
}

export interface LangFile{
    [pathname: string]: PathLangFile
}

export interface RecursiveStringRecord{
    [key: string]: string|RecursiveStringRecord
}

export type I18N = Record<'ko', LangFile>&Partial<Record<Language, LangFile>>;