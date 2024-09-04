<script lang="ts">
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    export let versions: string;
    export let version: string;

    const lang = getLang();
    $: versionI18n = getI18N('other', $lang).dani.version;

    const isMobile = getIsMobile();
</script>

<select bind:value={version} data-isMobile={$isMobile}>
    {#each versions as version}
        <option value={version}>{versionI18n[version]}</option>
    {/each}
</select>

<style>
    select{
        box-sizing: border-box;
        height: 24px;
    }

    select[data-isMobile="true"]{
        flex: 1 0 auto;
    }
</style>