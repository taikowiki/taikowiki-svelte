import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";
import { onMount } from "svelte";
import { browser } from "$app/environment";

export function useIsMobile():Writable<boolean>{
    let isMobile = writable<boolean>();
    setContext('isMobile', isMobile);

    onMount(() => {
        if (browser) {
            window.addEventListener('resize', () => {
                isMobile.set(window.innerWidth <= 1000)
            })
        }
    })

    return isMobile
}

export function getIsMobile():Writable<boolean>{
    return getContext('isMobile')
}