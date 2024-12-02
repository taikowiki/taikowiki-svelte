<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";

    export let donder: { nickname: string | null; taikoNumber: string | null };
    export let loaded: boolean = false;

    const myDon = `https://img.taiko-p.jp/imgsrc.php?v=&kind=mydon&fn=mydon_${donder.taikoNumber}`;
    if(!donder.taikoNumber){
        loaded = true;
    }

    const [theme] = getTheme();
    const lang = getLang();
    $: i18n = getI18N("/auth/user/donder", $lang);
</script>

<div class="container">
    {#if donder.taikoNumber}
        <img
            src={myDon}
            alt={i18n.myDon}
            on:load={() => {
                loaded = true;
            }}
            on:error={() => {
                loaded = true;
            }}
        />
    {:else}
        <div class="anonymous">
            ?
        </div>
    {/if}
    <table data-theme={$theme}>
        <tr>
            <td class="taikonumber">
                {donder.taikoNumber ?? '???'}
            </td>
        </tr>
        <tr>
            <td>
                {donder.nickname ?? '???'}
            </td>
        </tr>
    </table>
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

    table {
        width: 100%;

        border: 1px solid black;
        border-radius: 6px;
    }

    img {
        width: 100%;
        max-width: 200px;
    }
    .anonymous{
        width: 100%;
        max-width: 200px;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        display:flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(236, 236, 236);
        font-size: 50px;
        font-weight: bold;
        color:rgb(83, 83, 83);
    }

    td {
        text-align: center;
        padding: 0;
        transform: translateY(-2px);
    }
    tr:nth-child(1) td {
        padding-bottom: 1px;
        border-bottom: 1px solid black;
    }

    table[data-theme="dark"],
    table[data-theme="dark"] td {
        border-color: #818181;
    }

    .taikonumber {
        font-size: 13px;
    }
</style>
