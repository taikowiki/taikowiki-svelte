<script lang="ts">
    let { data } = $props();
</script>

{#if data.count === 0}
    검색 결과가 없습니다.
{:else}
    {#each data.searchResults as searchResult}
        {searchResult.title}
    {/each}
{/if}
