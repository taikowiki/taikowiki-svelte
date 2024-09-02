<script lang="ts">
    import AdminDaniEditor from "$lib/components/page/admin/dani/AdminDaniEditor.svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n.js";

    export let data;
    const { versionDaniData } = data;

    const lang = getLang();
    $: daniI18n = getI18N("other", $lang).dani;
</script>

<h1>
    {daniI18n.version[versionDaniData.version]}
</h1>

<div class="container">
    {#each versionDaniData.data as daniData}
        <AdminDaniEditor bind:daniData />
    {/each}
</div>

<style>
    .container{
        display:flex;
        flex-direction: column;
        row-gap: 10px;
    }
</style>