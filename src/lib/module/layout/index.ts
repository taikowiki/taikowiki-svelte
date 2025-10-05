import { getContext, setContext } from "svelte";

export namespace Layout {
    export function useTimezone(timezone: string) {
        setContext('timezone', timezone);
    }
    export function getTimezone() {
        return getContext('timezone') as string;
    }
}