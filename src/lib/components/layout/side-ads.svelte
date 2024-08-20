<script>
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import AsideItem from "./main/AsideItem.svelte";
    import { navigating } from "$app/stores";

    /*
    let container;
    onMount(() => {
        if (container.childNodes.length === 1) {
            if (typeof HawkEyes !== "undefined") {
                new HawkEyes({
                    type: "banner",
                    responsive: "Y",
                    platform: "W",
                    scriptCode: "938200",
                    frameCode: "61",
                    width: "250",
                    height: "250",
                    settings: { cntad: "1", cntsr: "1" },
                });
            }
        }
    });
    */

    /**
     * @type {HTMLDivElement}
     */
    let container;
    $: if ($navigating) {
        container.childNodes[1].remove();
        new HawkEyes({
            type: "banner",
            responsive: "Y",
            platform: "W",
            scriptCode: "938200",
            frameCode: "61",
            width: "250",
            height: "250",
            settings: { cntad: "1", cntsr: "1" },
        });
    }
</script>

<div bind:this={container}>
    <script>
        if (typeof HawkEyes !== "undefined") {
            new HawkEyes({
                type: "banner",
                responsive: "Y",
                platform: "W",
                scriptCode: "938200",
                frameCode: "61",
                width: "250",
                height: "250",
                settings: { cntad: "1", cntsr: "1" },
            });
        }
    </script>
</div>
