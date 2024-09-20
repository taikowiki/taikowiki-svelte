<script lang="ts">
    import Loading from "$lib/components/common/Loading.svelte";
    import type { SvelteComponent } from "svelte";

    export let src: string;

    let loading: SvelteComponent;
    let container: HTMLDivElement;
</script>

<div class="container" bind:this={container}>
    <Loading bind:this={loading}/>
    <img
        {src}
        alt="fumen"
        on:load={() => {
            loading?.$destroy?.();
        }}
        on:error={() => {
            container.remove();
        }}
    />
</div>

<style>
    .container {
        width: 100%;
    }

    img {
        width: 100%;
    }
</style>
