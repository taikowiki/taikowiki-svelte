<script lang="ts">
    import PollList from "$lib/components/page/poll/PollList.svelte";

    let { data } = $props();
</script>

<PollList polls={data.openedPolls} answers={data.answers} />
{#if !data.openedPolls.length}
    <div>
        현재 진행중인 설문이 없습니다.
    </div>
{/if}

<style>
    div{
        text-align: center;
    }
</style>