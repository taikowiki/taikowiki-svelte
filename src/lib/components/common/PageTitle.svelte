<script lang="ts">
    export let title:string = '';

    import {getLang, getI18N} from '$lib/module/common/i18n/i18n';

    const lang = getLang();
    $: i18n = getI18N('other', $lang).title
</script>

<svelte:head>
    {#if title}
        <title>
            {title} - {i18n.base}
        </title>
    {:else}
        <title>
            {i18n.base}
        </title>
    {/if}
</svelte:head>