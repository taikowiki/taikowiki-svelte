import { browser } from "$app/environment";
import { getContext, setContext } from "svelte";
import { get, writable, type Writable } from "svelte/store";
import type { Action } from "svelte/action";

/**
 * Save a store to the context indicating theme(light or dark).
 */
export default function useTheme(init?: 'light' | 'dark'): [Writable<'light' | 'dark'>, () => void] {
    let theme = writable<"light" | "dark">();
    setContext("theme", theme)

    if (browser) {
        const themeValue = window.localStorage.theme ??
            (window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light");
        theme.set(themeValue);
        theme.subscribe((value) => {
            document.body.setAttribute("data-theme", value);
            window.localStorage.theme = value;
            if("cookieStore" in window){
                //@ts-expect-error
                window.cookieStore.set('theme', value);
            }
        })
    }
    else {
        theme.set(init ?? "light");
    }

    const toggleTheme = () => {
        if (get(theme) === "light") {
            theme.set("dark");
        }
        else {
            theme.set('light');
        }
    }
    setContext('toggleTheme', toggleTheme);

    return [theme, toggleTheme];
}

/**
 * Get a store indicating theme and a function which can change theme from context.
 */
export function getTheme(): [Writable<'light' | 'dark'>, () => void] {
    return [getContext('theme'), getContext('toggleTheme')]
}

/**
 * @deprecated
 */
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