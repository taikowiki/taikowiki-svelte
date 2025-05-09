<script lang="ts">
    import { page } from "$app/state";
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import DocContentView from "$lib/components/page/wikidoc/view/DocContentView.svelte";
    import DocTitleView from "$lib/components/page/wikidoc/view/DocTitleView.svelte";
    import { setContext } from "svelte";
    import { writable } from "svelte/store";

    let { data } = $props();

    const docData = data.docData;
    setContext('docReady', writable(false))
</script>

<PageTitle title={`${data.docData.title}(v${data.docData.version})`} />
<DocTitleView
    id={docData.id}
    title={`${docData.title}`}
    editedTime={docData.editedTime}
    canEditable={data.canEditable}
    version={docData.version}
/>
<div class="whisper">
    버전: {docData.version}
</div>
{#if docData.type === "redirect"}
    <div class="whisper">
        #redirect {docData.redirectTo}
    </div>
{:else}
    {#if docData.type === "song"}
        <div class="whisper">
            #song {docData.songNo}
        </div>
    {/if}
    <DocContentView contentTree={docData.contentTree} />
{/if}

<style>
    .whisper {
        font-size: 13px;
        color: gray;
    }
</style>
