<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import PageSelector from "$lib/components/common/PageSelector.svelte";
    import type { Doc } from "$lib/module/common/wikidoc/types.js";
    import { DateTime } from "luxon";

    let { data } = $props();

    const current = data.logData.current as Exclude<
        Doc.DB.ControllerReturnTypes.getLogData["current"],
        null
    >;
    const logs = data.logData.logs;
    const id = page.params.id;
    const pageNum = data.page;
</script>

{#snippet logView(log: Doc.DB.ControllerReturnTypes.getLogData["logs"][number])}
    <div class="log">
        <div class="log-version">
            {#if log.version === current.version}
                <a style="height:100%;" href={`/doc/r/${log.title}`}>
                    {log.version}
                </a>
                <div class="current-version">(현재 버전)</div>
            {:else}
                <a style="height:100%;" href={`/doc/log/${id}/${log.version}`}>
                    {log.version}
                </a>
            {/if}
        </div>
        {#if log.diffIncrease || log.diffDecrease}
            <div class="diff-container">
                {#if log.diffIncrease}
                    <div class="diff increase">
                        +{log.diffIncrease}
                    </div>
                {/if}
                {#if log.diffDecrease}
                    <div class="diff decrease">
                        -{log.diffDecrease}
                    </div>
                {/if}
            </div>
        {/if}
        <div class="log-editor">
            {log.editor}
        </div>
        {#if log.comment}
            <div class="log-comment">
                ({log.comment})
            </div>
        {/if}
        <div class="log-date">
            <div>
                {DateTime.fromJSDate(log.editedTime, {
                    zone: "Asia/Seoul",
                }).toFormat("yyyy-MM-dd")}
            </div>
        </div>
    </div>
{/snippet}

<h1>
    {current.title}
</h1>
<div class="current-version">
    현재 버전: {current.version}
</div>
<div class="log-container">
    {#each logs as log}
        {@render logView(log)}
    {/each}
</div>
<PageSelector
    {pageNum}
    length={current.version}
    movePage={(p) => goto(`/doc/log/${id}?page=${encodeURIComponent(p)}`)}
    countPerPage={100}
/>

<style>
    h1 {
        margin-bottom: 0px;
    }

    .current-version {
        color: gray;
        font-size: 12px;
    }

    .log-container {
        margin-top: 10px;

        display: flex;
        flex-direction: column;

        row-gap: 2px;
    }

    .log {
        display: flex;
        align-items: center;

        column-gap: 5px;
    }
    .log::before {
        content: "•";
        transform: translateY(-1px);
    }

    .log-version {
        display: flex;
        align-items: flex-end;
    }

    .diff-container {
        display: flex;
        align-items: center;
        column-gap: 3px;
        transform: translateY(0.5px);

        & .diff {
            font-size: 13px;
        }
        & .increase {
            color: green;
        }
        & .decrease {
            color: red;
            transform: translateY(0.5px);
        }
    }

    .log-editor {
        font-weight: bold;
    }

    .log-comment{
        font-size: 13px;
    }

    .log-date {
        font-size: 10px;
        height: 100%;
        display: flex;
        align-items: flex-end;
    }
</style>
