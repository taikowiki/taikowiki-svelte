<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";
    import { getI18N, getLang } from "$lib/module/i18n";

    interface Props {
        donder: { nickname: string | null; taikoNumber: string | null };
        loaded?: boolean;
    }

    let {donder, loaded = $bindable(false)}: Props = $props();

    const myDon = `https://img.taiko-p.jp/imgsrc.php?v=&kind=mydon&fn=mydon_${donder.taikoNumber}`;
    if (!donder.taikoNumber) {
        loaded = true;
    }

    const [theme] = getTheme();
    const lang = getLang();
    let i18n = $derived(getI18N("/auth/user/donder", $lang));
</script>

<div class="container">
    {#if donder.taikoNumber}
        <img
            src={myDon}
            alt={i18n.myDon}
            onload={() => {
                loaded = true;
            }}
            onerror={() => {
                loaded = true;
            }}
        />
    {:else}
        <div class="anonymous">?</div>
    {/if}
    <div class="div-table" data-theme={$theme}>
        <div class="div-tr">
            <div class="div-td taikonumber">
                {donder.taikoNumber ?? "???"}
            </div>
        </div>
        <div class="div-tr">
            <div class="div-td">
                {donder.nickname ?? "???"}
            </div>
        </div>
    </div>
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
    .anonymous {
        width: 100%;
        max-width: 200px;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(236, 236, 236);
        font-size: 50px;
        font-weight: bold;
        color: rgb(83, 83, 83);
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
</style>
