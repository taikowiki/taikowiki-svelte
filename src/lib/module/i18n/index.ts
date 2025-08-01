import ko from "./lang/ko";
import en from "./lang/en";
import ja from "./lang/ja";
import zhtw from "./lang/zh-tw";
import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";
import { page } from "$app/state";
import Cookies from "js-cookie";
import { getContext, setContext } from "svelte";
import axios from "axios";

export namespace I18N {
    export const i18nProxyTarget: I18N = {
        ko,
        en,
        ja,
        'zh-tw': zhtw,
    }

    function getI18nProxy(target: I18N | any) {
        const proxy = new Proxy(target, {
            get(target, key, receiver) {
                const koProxy = getRecursiveStringProxy(target.ko);
                if (key === "ko") {
                    return koProxy
                }
                if (typeof (key) === "symbol") {
                    return Reflect.get(target, key, receiver);
                }
                if (Object.keys(target).includes(key)) {
                    return getProxyWithRepresentative(target[key], koProxy);
                }
                return getRecursiveStringProxy(koProxy);
            },
        })

        return proxy;
    }

    function getRecursiveStringProxy(target: RecursiveStringRecord | string): RecursiveStringRecord {
        if (typeof (target) === "string") {
            const value = target;
            return new Proxy({}, {
                get(_, key) {
                    if (key === Symbol.toPrimitive) {
                        return () => value;
                    }
                    return getRecursiveStringProxy({});
                }
            })
        }
        const proxy: any = new Proxy(target, {
            get(target, key, receiver) {
                if (key === "toString") {
                    return () => "";
                }
                const value = Reflect.get(target, key, receiver);
                if (typeof (key) === "symbol") {
                    return Reflect.get(target, key, receiver);
                }
                if (value === undefined) {
                    return getRecursiveStringProxy({});
                }
                return getRecursiveStringProxy(value);
            }
        })

        return proxy;
    }

    function getProxyWithRepresentative(target: RecursiveStringRecord, representative: RecursiveStringRecord): RecursiveStringRecord {
        return new Proxy(target, {
            get(target, key, receiver) {
                const value = Reflect.get(target, key, receiver);
                if (typeof (key) === "symbol") {
                    return Reflect.get(target, key, receiver);
                }
                if (value === undefined) {
                    return Reflect.get(representative, key, receiver);
                }
                else {
                    if (typeof (value) === "string") {
                        return value;
                    }
                    else {
                        return getProxyWithRepresentative(value, Reflect.get(representative, key) as RecursiveStringRecord)
                    }
                }
            }
        })
    }

    export const i18n = getI18nProxy(i18nProxyTarget);

    function getNavigatorLang() {
        //@ts-expect-error
        let navigatorLang = window.navigator.language ?? window.navigator.userLanguage;
        navigatorLang = navigatorLang.toLowerCase();

        if (navigatorLang in i18nProxyTarget) {
            return navigatorLang;
        }
        else if (navigatorLang.slice(0, 2) in i18nProxyTarget) {
            return navigatorLang.slice(0, 2);
        }
        else {
            return 'ko';
        }
    }

    export function useLang() {
        let lang: Writable<Language | string>;
        let usingLangParam = false;
        if (browser) {
            const urlLang = page.url.searchParams.get('lang');
            if (urlLang && (Object.keys(i18nProxyTarget).includes(urlLang))) {
                lang = writable<Language | string>(urlLang);
                usingLangParam = true;
            }
            else {
                //@ts-expect-error
                lang = writable<Language | string>((Object.keys(i18nProxyTarget).includes(window.localStorage.getItem('lang')) ? window.localStorage.getItem('lang') : undefined) ?? getNavigatorLang());
            }
        }
        else {
            const urlLang = page.url.searchParams.get('lang');
            if (urlLang && (Object.keys(i18nProxyTarget).includes(urlLang))) {
                lang = writable<Language | string>(urlLang);
                usingLangParam = true;
            }
            else {
                lang = writable<Language | string>('ko');
            }
        }

        lang.subscribe((value) => {
            if (browser && typeof (window) !== "undefined") {
                const urlLang = page.url.searchParams.get('lang');
                if (!urlLang || !(Object.keys(i18nProxyTarget).includes(urlLang))) {
                    window.localStorage.setItem('lang', value);
                    Cookies.set('language', value);
                    try {
                        axios({
                            url: '/api/user/lang/set',
                            data: {
                                lang: value
                            },
                            method: 'post'
                        })
                    } catch (err) {
                        //console.warn(err);
                    }
                }
            }
        })

        setContext('lang', lang);
        setContext('usingLangParam', usingLangParam);
        return lang;
    }

    export function getLang(): Writable<Language | string> {
        return getContext('lang')
    }

    export function setI18N(language: string, pathname: string): any {
        return i18n[language][pathname];
    }

    export function getI18N(): Writable<any>;
    export function getI18N(lang: string): any;
    export function getI18N(key: string, lang: string): any;
    export function getI18N(key?: string, lang?: string) {
        if (key === undefined) {
            return getContext('i18n')
        }
        else if (key !== undefined) {
            if (lang === undefined) {
                return i18n[key];
            }
            else {
                return i18n[lang][key];
            }
        }
    }
}

export namespace I18N {
    export type Language = "jp" | "ko" | "en" | string;

    export interface SubLangFile {
        [key: string]: string | SubLangFile
    }

    export interface PathLangFile {
        [pathname: string]: SubLangFile
    }

    export interface LayoutLangFile {
        layout?: {
            [layoutName: string]: SubLangFile
        };
    }

    export interface ComponentLangFile {
        component?: {
            [componentName: string]: SubLangFile
        }
    }

    export interface OtherLangFile {
        other?: {
            [other: string]: SubLangFile
        }
    }

    export interface RecursiveStringRecord {
        [key: string]: string | RecursiveStringRecord
    }

    export type LangFile = LayoutLangFile & PathLangFile & ComponentLangFile & OtherLangFile;

    export type I18N = Record<'ko', LangFile> & Partial<Record<Language, LangFile>>;
}

const { useLang, getLang, setI18N, getI18N } = I18N;

export { useLang, getLang, setI18N, getI18N };