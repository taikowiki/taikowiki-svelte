<script lang="ts">
    import PollList from "$lib/components/page/poll/PollList.svelte";

    let { data } = $props();
</script>

<PollList polls={data.openedPolls} answers={data.answers} />
