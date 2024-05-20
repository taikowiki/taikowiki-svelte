<script lang="ts">
    import useTheme from "$lib/module/layout/theme";
    import { browser } from "$app/environment";
    import Header from '$lib/components/layout/main/Header.svelte';

    let [theme, _] = useTheme();
    $: if (browser) {
        document.body.setAttribute("data-theme", $theme);
    }
</script>

<Header>
    <svelte:fragment slot="right">
        
    </svelte:fragment>
</Header>

<slot />