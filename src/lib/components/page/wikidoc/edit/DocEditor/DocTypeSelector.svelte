<script lang="ts">
    import type {Doc} from '$lib/module/common/wikidoc/types';

    interface Props {
        wikiDoc: Doc.Data.DocData;
    }

    let { wikiDoc = $bindable() }: Props = $props();

    let type: Doc.Data.DocData["type"] = $state(wikiDoc.type);

    let songNo: string = $state((wikiDoc as Doc.Data.SongDocData)?.songNo ?? "");
    $effect.pre(() => {
        if (type === "song") {
            (wikiDoc as Doc.Data.SongDocData).songNo = songNo;
        }
        else{
            (wikiDoc as any).songNo = null;
        }
    });
    let redirectTo: string = $state(
        (wikiDoc as Doc.Data.RedirectDocData).redirectTo || "",
    );
    $effect.pre(() => {
        if (type === "redirect") {
            (wikiDoc as Doc.Data.RedirectDocData).redirectTo = redirectTo;
        }
        else{
            (wikiDoc as any).redirectTo = null;
        }
    });

    function changeType(type: Doc.Data.DocData["type"]) {
        switch (type) {
            case "normal": {
                wikiDoc.type = "normal";
                (wikiDoc as Doc.Data.NormalDocData).contentTree = {
                    content:
                        (wikiDoc as Doc.Data.NormalDocData).contentTree?.content ??
                        "",
                    subParagraphs:
                        (wikiDoc as Doc.Data.NormalDocData).contentTree
                            ?.subParagraphs ?? [],
                };
                return;
            }
            case "song": {
                wikiDoc.type = "song";
                (wikiDoc as Doc.Data.SongDocData).contentTree = {
                    content:
                        (wikiDoc as Doc.Data.SongDocData).contentTree?.content ?? "",
                    subParagraphs:
                        (wikiDoc as Doc.Data.SongDocData).contentTree
                            ?.subParagraphs ?? [],
                };
                (wikiDoc as Doc.Data.SongDocData).songNo = songNo;
                return;
            }
            case "redirect": {
                wikiDoc.type = "redirect";
                (wikiDoc as Doc.Data.RedirectDocData).redirectTo = redirectTo;
                return;
            }
        }
    }
</script>

<!-- svelte-ignore ownership_invalid_mutation -->
<!-- svelte-ignore ownership_invalid_binding -->

{#snippet typeSelect()}
    <div class="row-left">
        <label>
            <input
                type="radio"
                value="normal"
                bind:group={type}
                onchange={() => changeType("normal")}
            />
            일반 문서
        </label>
        <label>
            <input
                type="radio"
                value="song"
                bind:group={type}
                onchange={() => changeType("song")}
            />
            곡 문서
        </label>
        <label>
            <input
                type="radio"
                value="redirect"
                bind:group={type}
                onchange={() => changeType("redirect")}
            />
            리다이렉트
        </label>
    </div>
{/snippet}

<div class="container">
    {@render typeSelect()}
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
