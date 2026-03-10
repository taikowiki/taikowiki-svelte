import { browser } from "$app/environment";
import { getContext, setContext } from "svelte";
import { get, writable, type Writable } from "svelte/store";

export namespace Layout {
    export function useTimezone(timezone: string) {
        setContext('timezone', timezone);
    }
    export function getTimezone() {
        return getContext('timezone') as string;
    }
    export function useExperimentalFlag() {
        if (browser) {
            const store = writable<boolean>(window.localStorage.getItem('experimentalFlag') === "true")
            window.localStorage.setItem('experimentalFlag', String(get(store)))
            store.subscribe((value) => {
                window.localStorage.setItem('experimentalFlag', String(value))
            });
            setContext('experimentalFlag', store)
        }
        else {
            const store = writable<boolean>(false)
            setContext('experimentalFlag', store)
        }
    }
    export function getExperimentalFlag(): Writable<boolean> {
        return getContext('experimentalFlag')
    }
}