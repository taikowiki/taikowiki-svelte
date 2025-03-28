<script lang="ts">
    import DocContentView from '$lib/components/page/wikidoc/view/DocContentView.svelte';
import DocTitleView from '$lib/components/page/wikidoc/view/DocTitleView.svelte';

    let {data} = $props();

    const docData = data.docData;
</script>

<DocTitleView
    id={docData.id}
    title={`${docData.title}`}
    editedTime={docData.editedTime}
    canEditable={false}
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
    <DocContentView contentTree={docData.contentTree}/>
{/if}

<style>
    .whisper{
        font-size: 13px;
        color: gray;
    }
</style>