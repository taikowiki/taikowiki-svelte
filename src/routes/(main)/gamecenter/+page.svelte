<script>
    import { browser } from "$app/environment";
    import KakaoMap from "$lib/components/page/gamecenter/KakaoMap.svelte";
</script>

{#if browser}
    <KakaoMap />
{/if}
