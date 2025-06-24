<script lang="ts">
    import { browser } from "$app/environment";
    import { getI18N, getLang } from "$lib/module/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";
    import FumenImg from "./FumenImg.svelte";

    interface Props {
        images: string[];
    }
    let { images }: Props = $props();

    let opened = $state(true);
    if (browser) {
        const fumenImageOpened =
            window.localStorage.getItem("fumenImageOpened");
        if (fumenImageOpened !== null) {
            opened = fumenImageOpened === "true";
        }
    }

    const [theme] = getTheme();
    const isMobile = getIsMobile();

    const lang = getLang();
    let i18n = $derived(getI18N($lang).page.songNo.course);

    function toggleOpen() {
        opened = !opened;
        if (typeof window !== undefined) {
            window.localStorage.setItem("fumenImageOpened", `${opened}`);
        }
    }
</script>

{#if images.length}
    <div class="container" data-isMobile={$isMobile}>
        <div
            class="opener"
            role="presentation"
            onclick={toggleOpen}
            data-opened={opened}
            data-theme={$theme}
        >
            {i18n.fumenImage}
        </div>
        {#if opened}
            <div class="img-container">
                {#each images as src}
                    <FumenImg {src} />
                {/each}
            </div>
        {/if}
    </div>
{/if}

<style>
    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    /*
     .container[data-isMobile="false"] {
        width: calc(100% - 80px);
        margin-left: 80px;
        transform: translateY(-34px);
    }*/

    .img-container {
        width: 100%;
        max-width: 800px;

        display: flex;
        flex-direction: column;

        row-gap: 3px;
    }

    .opener {
        width: 100%;
        height: 34px;

        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        background-color: #cf4844;

        color: white;

        column-gap: 5px;
    }
    .opener[data-opened="true"]::after {
        content: "▲";
    }
    .opener[data-opened="false"]::after {
        content: "▼";
    }
    .opener[data-theme="dark"] {
        background-color: #1c1c1c;
    }
</style>
