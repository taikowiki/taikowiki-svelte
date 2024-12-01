<script lang="ts">
    import i18n from "$lib/module/common/i18n/i18n";
    import { page } from "$app/stores";

    function getAlternativeLink(lang: string) {
        const url = new URL($page.url);
        url.searchParams.set("lang", lang);
        return url.href;
    }
</script>

<svelte:head>
    {#each Object.keys(i18n) as lang}
        {@const alternativeLink = getAlternativeLink(lang)}
        <link rel="alternate" hreflang={lang} href={alternativeLink} />
    {/each}
    <link
        rel="alternate"
        hreflang="x-default"
        href={getAlternativeLink("ko")}
    />
</svelte:head>
