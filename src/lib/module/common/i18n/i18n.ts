import { type I18N, type RecursiveStringRecord } from "./types"

const i18nProxyTarget: I18N = {
    'ko': {
        '/':{
            header: 'asd',
            body: {
                'a': '1',
                'b': '2'
            }
        }
    },
    en: {
        '/':{
            header: 'bsd'
        }
    }
}

function getI18nProxy(target: I18N|any) {
    const proxy = new Proxy(target, {
        get(target, key, receiver) {
            const koProxy = getRecursiveStringProxy(target[key]);
            if(key === "ko"){
                return koProxy
            }
            if(typeof(key) === "symbol"){
                return Reflect.get(target, key, receiver);
            }
            if(Object.keys(target).includes(key)){
                return getProxyWithRepresentative(target[key], koProxy);
            }
            return getRecursiveStringProxy(koProxy);
        },
    })

    return proxy;
}

function getRecursiveStringProxy(target: RecursiveStringRecord|string): RecursiveStringRecord {
    if(typeof(target) === "string"){
        const value = target;
        return new Proxy({}, {
            get(target, key){
                if(key === Symbol.toPrimitive){
                    return () => value;
                }
                return getRecursiveStringProxy({});
            }
        })
    }
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
            return getRecursiveStringProxy(value);
        }
    })

    return proxy;
}

function getProxyWithRepresentative(target: RecursiveStringRecord, representative: RecursiveStringRecord): RecursiveStringRecord {
    return new Proxy(target, {
        get(target, key, receiver){
            const value = Reflect.get(target, key, receiver);
            if(typeof(key) === "symbol"){
                return Reflect.get(target, key, receiver);
            }
            if(value === undefined){
                return Reflect.get(representative, key, receiver);
            }
            else{
                if(typeof(value) === "string"){
                    return value;
                }
                else{
                    return getProxyWithRepresentative(value, Reflect.get(representative, key) as RecursiveStringRecord)
                }
            }
        }
    })
}

const i18n = getI18nProxy(i18nProxyTarget);

export default i18n;