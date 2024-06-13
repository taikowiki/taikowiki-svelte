import { browser } from "$app/environment";
import { getContext, setContext } from "svelte";
import { get, writable, type Writable } from "svelte/store";
import type { Action } from "svelte/action";

export default function useTheme(): [Writable<'light' | 'dark'>, () => void] {
    let theme = writable<"light" | "dark">();
    setContext("theme", theme)

    if (browser) {
        theme.set(window.localStorage.theme ??
            (window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"))
        theme.subscribe((value) => {
            window.localStorage.theme = value;
        })
    }
    else{
        theme.set("light");
    }

    const toggleTheme = () => {
        if (get(theme) === "light") {
            theme.set("dark")
        }
        else {
            theme.set('light')
        }
    }
    setContext('toggleTheme', toggleTheme)

    return [theme, toggleTheme];
}

export function getTheme(): [Writable<'light' | 'dark'>, () => void] {
    return [getContext('theme'), getContext('toggleTheme')]
}

export const useThemeAction: Action = (element: HTMLElement) => {
    let unsubscribe = getTheme()[0].subscribe(value => {
        element.setAttribute("data-theme", value);
    })
    return {
        destroy() {
            unsubscribe();
        }
    }
}