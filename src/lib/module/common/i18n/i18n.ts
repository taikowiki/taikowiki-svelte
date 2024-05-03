import { type I18N, type RecursiveStringRecord } from "./types"

const i18nProxyTarget: I18N = {
    'ko': {
        
    }
}

function getI18nProxy(target: I18N|any) {
    const proxy = new Proxy(target, {
        get(target, key, receiver) {
            if(key === "ko"){
                return getRecursiveStringProxy(target[key]);
            }
            if(typeof(key) === "symbol"){
                return Reflect.get(target, key, receiver);
            }
            if(Object.keys(target).includes(key)){
                return getProxyWithRepresentative(target[key], target.ko);
            }
            return getRecursiveStringProxy(target.ko);
        },
    })

    return proxy;
}

function getRecursiveStringProxy(target: RecursiveStringRecord): RecursiveStringRecord {
    const proxy: any = new Proxy(target, {
        get(target, key, receiver){
            if(key === "toString"){
                return () => "";
            }
            const value = Reflect.get(target, key, receiver);
            if(typeof(key) === "symbol"){
                return Reflect.get(target, key, receiver);
            }
            if(value === undefined){
                return getRecursiveStringProxy({});
            }
            if(typeof(value) === "string"){
                return value;
            }
            return getRecursiveStringProxy(value);
        }
    })

    return proxy;
}

function getProxyWithRepresentative(target: RecursiveStringRecord, representative: RecursiveStringRecord): RecursiveStringRecord {
    return new Proxy(target, {
        get(target, key, receiver){
            const value = Reflect.get(target, key, receiver);
            if(value === undefined){
                return Reflect.get(representative, key, receiver);
            }
            else{
                if(typeof(value) === "string"){
                    return value;
                }
                else{
                    return getProxyWithRepresentative(value, Reflect.get(representative, key, receiver))
                }
            }
        }
    })
}

const i18n = getI18nProxy(i18nProxyTarget);

export default i18n;