<script lang="ts">
    import { browser } from "$app/environment";

    interface Props{
        src: string
    }
    let {src}: Props = $props();
</script>

<div class="container">
    <img class="loading" src="/assets/icon/loading.svg" alt="loading" />
    {#if browser}
        <img
            {src}
            class="fumen"
            alt="fumen"
            onload={(event) => {
                event.currentTarget.parentElement?.children[0]?.remove();
            }}
            onerror={(event) => {
                event.currentTarget.parentElement?.remove();
            }}
        />
    {/if}
</div>

<style>
    .container {
        width: 100%;
        text-align: center;
    }

    img.loading {
        width: 250px;
    }

    img.fumen {
        width: 100%;
    }
</style>
