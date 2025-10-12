<script lang="ts">
    import { page } from "$app/state";
</script>

<div class="container">
    <h1>
        {page.status} Error
    </h1>
    {#if page.status === 404}
        <img src="/assets/img/error/404.png" alt="404 error" />
    {:else}
        <img src="/assets/img/error/other.png" alt="error" />
    {/if}
</div>

<style>
    .container{
        display:flex;
        flex-direction: column;
        align-items: center;
    }

    img{
        max-width: 100%;

        width: 300px;
    }
</style>