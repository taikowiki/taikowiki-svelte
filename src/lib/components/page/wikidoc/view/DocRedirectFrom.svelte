<script lang="ts">
    import { page } from "$app/state";

    let redirectFrom = $derived(page.url.searchParams.get("from"));
</script>

{#if redirectFrom}
    <div class="redirect-from">
        {redirectFrom}에서 리다이렉트 됨
    </div>
{/if}

<style>
    .redirect-from {
        color: gray;
    }
</style>
