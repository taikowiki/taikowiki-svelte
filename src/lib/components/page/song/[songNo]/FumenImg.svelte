<script lang="ts">
    export let src: string;
</script>

<div class="container">
    <img class="loading" src="/assets/icon/loading.svg" alt="loading"/>
    <img
        {src}
        class="fumen"
        alt="fumen"
        on:load={(event) => {
            event.currentTarget.parentElement?.children[0]?.remove();
        }}
        on:error={(event) => {
            event.currentTarget.parentElement?.remove();
        }}
    />
</div>

<style>
    .container {
        width: 100%;
        text-align: center;
    }

    img.loading{
        width: 250px;
    }

    img.fumen {
        width: 100%;
    }
</style>
