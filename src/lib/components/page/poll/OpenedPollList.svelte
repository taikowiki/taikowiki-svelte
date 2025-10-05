<script lang="ts">
    import type { Poll } from "$lib/module/poll";
    import OpenedPollView from "./OpenedPollView.svelte";

    interface Props {
        polls: Poll.Data[];
        answers: Record<number, Poll.Answer>;
    }

    let { polls, answers }: Props = $props();
</script>

<div class="container">
    {#each polls as poll}
        <OpenedPollView {poll} answer={answers[poll.id]} />
    {/each}
</div>

<style>
    .container{
        display:flex;
        flex-direction: column;
        align-items: center;
    }
</style>