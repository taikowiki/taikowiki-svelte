<script>
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import KakaoMap from "$lib/components/page/gamecenter/KakaoMap.svelte";
    import { getTheme } from "$lib/module/layout/theme";

    export let data;
</script>

{#if browser}
    <KakaoMap gamecenterDatas={data.gamecenterDatas}/>
{/if}
