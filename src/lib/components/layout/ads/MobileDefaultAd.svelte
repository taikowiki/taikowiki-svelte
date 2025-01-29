<script lang="ts">
    import { page } from "$app/state";
    import DefaultAd from "./DefaultAd.svelte";

    interface Props {
        style?: string;
    }

    let { style = "" }: Props = $props();

    function checkPath(path: string) {
        const notAllowedPaths: string[] = ["/gamecenter", "/auth"];

        return (
            notAllowedPaths.every((notAllowedPath) => {
                return !path.startsWith(notAllowedPath);
            }) && path !== "/"
        );
    }
</script>

{#if checkPath(page.url.pathname)}
    <DefaultAd onlyFor="mobile" {style} />
{/if}
