<script lang="ts">
    import { getI18N, getLang } from "$lib/module/i18n";

    interface Props {
        isAsiaBanned: 1 | 0;
        isKrBanned: 1 | 0;
        isDeleted: 1 | 0;
    }

    let {isAsiaBanned, isKrBanned, isDeleted}: Props = $props();

    const lang = getLang();
    let i18n = $derived(getI18N($lang).page.songNo.alert);
</script>

<div class="container">
    {#if isDeleted}
        <img src="/assets/icon/warning.svg" alt="warning" />
        <span> {i18n.deleted} </span>
    {:else if isKrBanned}
        <img src="/assets/icon/warning.svg" alt="warning" />
        <span> {i18n.krBanned} </span>
    {:else if isAsiaBanned}
        <img src="/assets/icon/warning.svg" alt="warning" />
        <span> {i18n.asiaBanned} </span>
    {/if}
</div>

<style>
    .container {
        display: flex;
        align-items: center;

        column-gap: 5px;

        margin-bottom: 10px;
    }

    img {
        width: 25px;
        height: 25px;
    }

    span {
        color: #c14d4c;
        font-weight: bold;

        transform: translateY(-1px);
    }
</style>
