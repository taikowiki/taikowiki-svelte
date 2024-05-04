import { getContext, setContext } from "svelte";
import { type I18N, type Language, type PathLangFile, type RecursiveStringRecord, type SubLangFile } from "./types"
import { get, writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";
import ko from "./lang/ko";
import en from './lang/en';
import jp from './lang/jp';

const i18nProxyTarget: I18N = {
    ko,
    en,
    jp
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

const i18n = getI18nProxy(i18nProxyTarget);

export default i18n;

export function useLang() {
    let lang;
    if(browser){
        lang = writable<Language | string>(window?.localStorage.lang ?? 'ko');
    }
    else{
        lang = writable<Language | string>('ko');
    }
    setContext('lang', lang);
    return lang;
}

function setLang(lang: Language | string) {
    const langg = getContext('lang') as Writable<Language | string>;
    langg.set(lang);
    window?.localStorage.setItem('lang', get(langg))
}

export function getLang(): Writable<Language | string> {
    return getContext('lang')
}

export function setI18N(language:string, pathname:string ):any{
    return i18n[language][pathname];
}

export function getI18N(): Writable<any> {
    return getContext('i18n')
}