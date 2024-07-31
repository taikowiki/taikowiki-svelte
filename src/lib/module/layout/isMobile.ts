import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

/**
 * Save a store to the context indicating mobile. If the width is 1000px or less, it is considered mobile.
 */
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

/**
 * Get a store indicating mobile from context.
 */
export function getIsMobile(): Writable<boolean> {
    return getContext('isMobile')
}