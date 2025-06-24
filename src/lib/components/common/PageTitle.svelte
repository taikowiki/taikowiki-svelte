<script lang="ts">
    interface Props{
        title?: string;
    }

    let {title = $bindable("")}:Props = $props();

    import {getLang, getI18N} from '$lib/module/i18n';

    const lang = getLang();
    let i18n = $derived(getI18N($lang).title);
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