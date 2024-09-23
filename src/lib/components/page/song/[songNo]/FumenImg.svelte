<script lang="ts">
    export let src: string;

    let loading: HTMLImageElement;
    let container: HTMLDivElement;
</script>

<div class="container" bind:this={container}>
    <img src="/assets/icon/loading.svg" alt="loading" bind:this={loading}/>
    <img
        {src}
        alt="fumen"
        on:load={() => {
            loading.remove();
        }}
        on:error={() => {
            container.remove();
        }}
    />
</div>

<style>
    .container {
        width: 100%;
        text-align: center;
    }

    img {
        width: 100%;
    }
</style>
