<script lang="ts">
    import OpenedPollList from "$lib/components/page/poll/OpenedPollList.svelte";
    import { DateTime } from "luxon";

    let { data } = $props();
</script>

<OpenedPollList polls={data.openedPolls} answers={data.answers} />
