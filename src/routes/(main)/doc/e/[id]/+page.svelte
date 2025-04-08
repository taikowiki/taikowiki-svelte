<script lang="ts">
    import { page } from "$app/state";
    import DocEditor from "$lib/components/page/wikidoc/edit/DocEditor.svelte";
    import DocSubmit from "$lib/components/page/wikidoc/edit/DocSubmit.svelte";
    import { docContext } from "$lib/module/common/wikidoc/util";

    let { data } = $props();
    let wikiDoc = $state(data.docData);
    wikiDoc.comment = "";

    docContext.defineWikiDocURLBase(
        (() => {
            const base = new URL(page.url);
            base.pathname = "/doc/r";
            return base;
        })(),
    );
</script>

<DocEditor {wikiDoc} />
<div class="comment-container">
    <input type="text" bind:value={wikiDoc.comment} placeholder="수정 사항을 간략하게 써주세요."/>
</div>
<DocSubmit {wikiDoc} type="update" />

<style>
    .comment-container input{
        width: 100%;
    }
</style>