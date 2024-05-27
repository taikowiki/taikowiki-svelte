<script lang="ts">
    export let images: string[];

    let opened = true;
</script>

{#if images.length}
    <div class="container">
        <div class="opener">보면 이미지</div>
        {#if opened}
            {#each images as image}
                <img
                    src={image}
                    alt="fumen"
                    on:error={(event) => {
                        event.currentTarget.remove();
                    }}
                />
            {/each}
        {/if}
    </div>
{/if}

<style>
</style>
