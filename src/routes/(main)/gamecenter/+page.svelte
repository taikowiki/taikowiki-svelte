<script>
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import KakaoMap from "$lib/components/page/gamecenter/KakaoMap.svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n.ts";
    import { getTheme } from "$lib/module/layout/theme";

    export let data;

    const lang = getLang();
    $: i18n = getI18N('/gamecenter', $lang);
    $: titleI18n = getI18N('other', $lang).title['/gamecenter'];

    let showAlert = (typeof(window) !== "undefined" ?( window.localStorage.getItem('show gamecenter alert') === 'false' ? false : true) : true);
</script>

<PageTitle title={titleI18n}/>

{#if browser}
    {#if $lang !== 'ko' && showAlert}
        <span class="alert">
            {i18n.koreanGamecenterAlert}
        </span>
        <button on:click={() => {showAlert = !showAlert; window.localStorage.setItem('show gamecenter alert', false)}}>
            X
        </button>
    {/if}
    <KakaoMap gamecenterDatas={data.gamecenterDatas}/>
{/if}

<style>
    .alert{
        font-weight: bold;
        color:red;
    }
</style>