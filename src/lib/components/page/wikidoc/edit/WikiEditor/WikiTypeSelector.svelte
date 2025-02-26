<script lang="ts">
    import type { WikiDocData, WikiNormalDocData, WikiRedirectDocData, WikiSongDocData } from "$lib/module/common/wikidoc/types/wikidoc.types";

    interface Props{
        wikiDoc: WikiDocData
    }

    let {wikiDoc = $bindable()}: Props = $props();

    let type: WikiDocData['type'] = $state(wikiDoc.type);

    let songNo: string = $state((wikiDoc as WikiSongDocData)?.songNo ?? '');
    $effect.pre(() => {
        if(type === "song"){
            (wikiDoc as WikiSongDocData).songNo = songNo;
        }
    })
    let redirectTo: string = $state((wikiDoc as WikiRedirectDocData).redirectTo || '');
    $effect.pre(() => {
        if(type === "redirect"){
            (wikiDoc as WikiRedirectDocData).redirectTo = redirectTo;
        }
    })
    
    function changeType(type: WikiDocData['type']){
        switch(type){
            case('normal'):{
                wikiDoc.type = 'normal';
                (wikiDoc as WikiNormalDocData).contentTree = {
                    content: (wikiDoc as WikiNormalDocData).contentTree?.content ?? '',
                    subParagraphs: (wikiDoc as WikiNormalDocData).contentTree?.subParagraphs ?? []
                };
                return;
            }
            case('song'):{
                wikiDoc.type = 'song';
                (wikiDoc as WikiSongDocData).contentTree = {
                    content: (wikiDoc as WikiSongDocData).contentTree?.content ?? '',
                    subParagraphs: (wikiDoc as WikiSongDocData).contentTree?.subParagraphs ?? []
                };
                (wikiDoc as WikiSongDocData).songNo = songNo;
                return;
            }
            case('redirect'):{
                wikiDoc.type = 'redirect';
                (wikiDoc as WikiRedirectDocData).redirectTo = redirectTo;
                return;
            }
        }
    }
</script>

<div class="container">
    <div class="row-left">
        <label>
            <input type="radio" value="normal" bind:group={type} onchange={() => changeType('normal')}/>
            일반 문서
        </label>
        <label>
            <input type="radio" value="song" bind:group={type} onchange={() => changeType('song')}/>
            곡 문서
        </label>
        <label>
            <input type="radio" value="redirect" bind:group={type} onchange={() => changeType('redirect')} />
            리다이렉트
        </label>
    </div>
    {#if type === "song"}
        <input type="text" bind:value={songNo} placeholder="곡 번호" />
    {/if}
    {#if type === "redirect"}
        <input type="text" bind:value={redirectTo} placeholder="문서 제목" />
    {/if}
</div>

<style>
    .container {
        height: 50px;
    }

    label {
        font-size: 15px;

        display: flex;
        align-items: center;
    }

    input[type="radio"] {
        margin-top: 0;
    }
    input[type="text"] {
        width: 100%;
    }

    .row-left {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }
</style>
