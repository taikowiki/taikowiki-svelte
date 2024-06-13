<script>
    import PageAside from "$lib/components/layout/main/PageAside.svelte";
    import { page } from "$app/stores";

    export let data;

    const { versions } = data;
    let version = $page.url.pathname.replace("/dani/", "") || "24";
</script>

<!--
<PageAside>
    <select bind:value={version}>
        {#each versions as version}
            <option value={version}>{version}</option>
        {/each}
    </select>
</PageAside>
-->

<slot />
