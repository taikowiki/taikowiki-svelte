<script lang="ts">
    import { I18N } from "$lib/module/i18n";
    import { page } from "$app/stores";

    const { i18n } = I18N;

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
