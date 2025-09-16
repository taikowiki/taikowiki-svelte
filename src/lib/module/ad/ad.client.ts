import { writable } from "svelte/store";

export namespace Ad{
    export const adScriptLoaded = {
        res: () => {},
        promise: new Promise<void>((res) => adScriptLoaded.res = res)
    };
}