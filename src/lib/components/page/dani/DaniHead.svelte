<script lang="ts" module>
    import { dani as daniColor } from "$lib/module/common/color";

    function getColor(dan: DaniType.Dan, theme: "dark" | "light"): string {
        let d = "kyu";
        if (/^[1-5]dan$/.test(dan) || dan === "senpo") {
            d = "lowdan";
        } else if (
            /^[6-9]dan$/.test(dan) ||
            /^10dan$/.test(dan) ||
            dan === "taisho"
        ) {
            d = "highdan";
        } else if (dan === "kuroto" || dan === "meijin" || dan === "chojin") {
            d = "jin";
        } else if (dan === "tatsujin") {
            d = "tatsujin";
        } else if (dan === "jiho") {
            d = "jiho";
        } else if (dan === "chiuken") {
            d = "chiuken";
        } else if (dan === "fukusho") {
            d = "fukusho";
        } else if (dan === "gaiden") {
            d = "gaiden";
        }

        return (daniColor.color?.[theme] as any)?.[d] ?? "";
    }

    function outsideClickHandler(event: MouseEvent) {
        const target = event.target as HTMLDialogElement;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        if (
            rect.left > event.clientX ||
            rect.right < event.clientX ||
            rect.top > event.clientY ||
            rect.bottom < event.clientY
        ) {
            target.close();
        }
    }
</script>

<script lang="ts">
    import type { DaniType } from "$lib/module/common/dani/types";
    import { getLang } from "$lib/module/common/i18n/i18n";
    import { getTheme } from "$lib/module/layout/theme";
    import { getI18N } from "$lib/module/common/i18n/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import DaniPlate from "./DaniPlate.svelte";

    interface Props {
        opened: boolean;
        dani: DaniType.Dani;
    }

    let { opened = $bindable(), dani }: Props = $props();

    const [theme] = getTheme();
    const isMobile = getIsMobile();

    const jpDaniI18n = getI18N("other", "ja").dani;
    const href =
        dani.dan === "gaiden"
            ? `https://www.youtube.com/results?search_query=${encodeURI(`太鼓の達人 ${dani.name.ja}`)}`
            : `https://www.youtube.com/results?search_query=${encodeURI(`太鼓の達人 ${jpDaniI18n.version[dani.version]} ${jpDaniI18n.dan[dani.dan]}`)}`;

    const lang = getLang();
    let i18n = $derived(getI18N("other", $lang).dani);

    let dialog: HTMLDialogElement | undefined = $state();
</script>

{#snippet danAndVersion()}
    <div class="section">
        <DaniPlate dan={dani.dan} />
        <div
            class="item"
            style={`background-color:${getColor(dani.dan, $theme)};`}
        >
            <span>
                {i18n.version[dani.version]}
            </span>
        </div>
    </div>
{/snippet}
{#snippet youtubeLink()}
    <a
        class="yt-link"
        {href}
        target="_blank"
        onclick={(event) => {
            event.stopPropagation();
        }}
    >
        <img
            src={`/assets/icon/dani/youtube${$theme === "dark" ? "_dark" : "_dark"}_256px.svg`}
            alt=""
        />
    </a>
{/snippet}
{#snippet qrModal()}
    {#if dani.dan === "gaiden" && dani.qr !== undefined}
        <img
            src={"/assets/icon/dani/qr_dark.svg"}
            alt="qr button"
            onclick={(event) => {
                event.stopPropagation();
                if (!dialog) return;
                dialog.showModal();
            }}
            role="presentation"
            style="cursor:pointer;"
        />
        <dialog
            bind:this={dialog}
            onclick={(event) => {
                event.stopPropagation();
                outsideClickHandler(event);
            }}
            role="presentation"
        >
            <div class="dialog-content-wrapper">
                <div>
                    {dani.name[$lang] ?? dani.name.ja}
                </div>
                <img class="qr" src={dani.qr} alt="qr" />
                <button
                    onclick={(event) => {
                        try {
                            event.stopPropagation();
                        } catch {}
                        if (!dialog) return;
                        dialog.close();
                    }}
                >
                    닫기
                </button>
            </div>
        </dialog>
    {/if}
{/snippet}
{#snippet mobileFold()}
    {#if $isMobile}
        <img
            class="fold"
            src="/assets/icon/dani/unfold_dark.svg"
            alt=""
            class:opened
        />
    {/if}
{/snippet}

<div
    class="head"
    onclick={() => {
        if ($isMobile) opened = !opened;
    }}
    role="presentation"
>
    {@render danAndVersion()}
    <div class="section">
        {@render youtubeLink()}
        {@render qrModal()}
        {@render mobileFold()}
    </div>
</div>
{#if dani.name}
    <div
        class="name"
        style={`background-color:${daniColor.color.light["gaiden"]};`}
    >
        <span>
            {dani.name[$lang] ?? dani.name.ja}
        </span>
    </div>
{/if}

<style>
    .head {
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .item {
        min-width: 50px;
        height: 30px;

        font-weight: bold;
        font-size: 18px;
        color: white;

        padding-block: 2px;
        padding-inline: 7px;

        border-radius: 5px;

        display: flex;
        justify-content: center;
        align-items: center;

        box-sizing: border-box;
    }

    span {
        transform: translateY(-1px);
    }

    img {
        width: 30px;
        height: 30px;
    }

    .yt-link {
        width: 30px;
        height: 30px;
    }

    .fold {
        width: 30px;
        height: 30px;

        transition: transform 0.1s;
    }
    .fold.opened {
        transform: rotate(180deg);
    }

    .section {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        column-gap: 5px;
    }

    .name {
        font-weight: bold;
        font-size: 17px;

        transform: translateY(-2px);

        color: white;

        padding-inline: 4px;
        padding-block: 2px;

        border-radius: 5px;
    }

    .name span {
        transform: translateY(-1px);
        display: block;
    }

    img.qr {
        width: 300px;
        max-width: 100%;
        height: auto;
    }

    .dialog-content-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .dialog-content-wrapper button {
        width: 50px;
        height: 30px;

        border-radius: 5px;

        cursor: pointer;

        background-color: white;
    }
    dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(1px);
    }
</style>
