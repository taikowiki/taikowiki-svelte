import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

export function useIsMobile(): Writable<boolean> {
    let isMobile = writable<boolean>();
    setContext('isMobile', isMobile);

    if (browser) {
        isMobile.set(window.innerWidth <= 1000);
        window.addEventListener('resize', () => {
            isMobile.set(window.innerWidth <= 1000)
        })
    }
    else{
        isMobile.set(false);
    }

    return isMobile
}

export function getIsMobile(): Writable<boolean> {
    return getContext('isMobile')
}