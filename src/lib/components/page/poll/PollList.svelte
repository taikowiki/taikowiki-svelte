<script lang="ts">
    import type { Poll } from "$lib/module/poll";
    import PollView from "./PollView.svelte";

    interface Props {
        polls: Poll.Data[];
        answers: Record<number, Poll.Answer>;
        closed?: boolean;
    }

    let { polls, answers, closed }: Props = $props();
</script>

<div class="container">
    {#each polls as poll}
        <PollView {poll} answer={answers[poll.id]} closed={closed} />
    {/each}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
