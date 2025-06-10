<script lang="ts">
    import type { UserDonderData } from "$lib/module/common/user/types";
    import { getTheme } from "$lib/module/layout/theme";
    import { getI18N, getLang } from "$lib/module/i18n";
    import { DateTime } from "luxon";
    import { onMount } from "svelte";

    interface Props {
        donderData: UserDonderData;
        loaded?: boolean;
        isDownload?: boolean;
    }

    let {
        donderData,
        loaded = $bindable(false),
        isDownload = false,
    }: Props = $props();

    const [theme] = getTheme();
    const lang = getLang();
    let i18n = $derived(getI18N("/auth/user/donder", $lang));
</script>

{#snippet donderImg()}
    <img
        src={isDownload
            ? `/api/hirobaimg/mydon/${donderData.donder.taikoNumber}`
            : donderData.donder.myDon}
        alt={i18n.myDon}
        onload={() => {
            loaded = true;
        }}
        onerror={() => {
            loaded = true;
        }}
    />
{/snippet}
{#snippet donderProfile()}
    <div class="div-table" data-theme={$theme}>
        <div class="div-tr">
            <div class="div-td taikonumber">
                {donderData.donder.taikoNumber}
            </div>
        </div>
        <div class="div-tr">
            <div class="div-td">
                {donderData.donder.nickname}
            </div>
        </div>
    </div>
{/snippet}
{#snippet lastUpdate()}
    {#if !isDownload}
        <div class="last-update">
            {i18n.lastUpdate}: {DateTime.fromJSDate(
                donderData.lastUpdate,
            ).toFormat("yyyy-MM-dd HH:mm:ss")}
        </div>
    {/if}
{/snippet}

<div class="container">
    {@render donderImg()}
    {@render donderProfile()}
    {@render lastUpdate()}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 300px;
        max-width: 100%;
        row-gap: 5px;
    }

    .div-table {
        width: 100%;

        border: 1px solid black;
        border-radius: 6px;
    }

    img {
        width: 100%;
        max-width: 200px;
    }

    .div-td {
        text-align: center;
        padding: 0;
        transform: translateY(-2px);
    }
    .div-tr:nth-child(1) .div-td {
        padding-bottom: 1px;
        border-bottom: 1px solid black;
    }

    .div-table[data-theme="dark"],
    .div-table[data-theme="dark"] .div-td {
        border-color: #818181;
    }

    .taikonumber {
        font-size: 13px;
    }

    .last-update {
        font-size: 13px;
    }
</style>
