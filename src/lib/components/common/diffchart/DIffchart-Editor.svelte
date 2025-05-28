<script lang="ts" module>
    function copyJSON(json: string) {
        try {
            navigator.clipboard.writeText(json);
            alert("복사 완료");
        } catch {
            alert("복사 실패");
        }
    }
</script>

<script lang="ts">
    import { intercept } from "$lib/module/common/util";

    import { Diffchart } from "$lib/module/diffchart/index";
    import DiffchartEditorSection from "./Diffchart-Editor-Section.svelte";
    import { page } from "$app/state";
    import { Table } from "../styled";

    interface Props {
        diffchart: Diffchart.Diffchart;
        mode?: "admin" | "normal";
    }

    let { diffchart = $bindable(), mode = "normal" }: Props = $props();

    $effect.pre(() => {
        diffchart.sections.sort((a, b) => a.order - b.order);
    });

    const url = new URL(page.url);
    $effect.pre(() => {
        url.hash = Diffchart.encodeDiffchart(diffchart);
    });

    function copyLink() {
        try {
            navigator.clipboard.writeText(url.href);
            alert("복사 완료");
        } catch {
            alert("복사 실패");
        }
    }
</script>

<div class="container">
    <div class="layer">
        {#if mode === "admin"}
            <input
                type="text"
                value={JSON.stringify(diffchart)}
                disabled
                class="json"
            />
            <button
                onclick={() => {
                    copyJSON(JSON.stringify(diffchart));
                }}
                >복사하기
            </button>
        {:else}
            <input type="text" value={url.href} disabled class="json" />
            <button
                onclick={() => {
                    copyLink();
                }}
                >복사하기
            </button>
        {/if}
    </div>
    <div class="layer">
        <Table style="width: 100%;border-collapse: collapse;">
            <tr>
                <td class="bold"> 제목 </td>
                <td>
                    <div class="layer">
                        <input bind:value={diffchart.name} class="title" />
                    </div>
                </td>
            </tr>
            <tr>
                <td class="bold"> 색상 </td>
                <td>
                    <div class="layer" style="column-gap:5px;">
                        <span class="color-text">글씨</span>
                        <input type="color" bind:value={diffchart.color} />

                        <span class="color-text">배경</span>
                        <input
                            type="color"
                            bind:value={diffchart.backgroundColor}
                        />
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <div class="layer bold" style="justify-content:center;">
                        섹션
                    </div>
                    <Table style="width: 100%;border-collapse: collapse;">
                        {#each diffchart.sections as section, index (section)}
                            <DiffchartEditorSection
                                bind:section={diffchart.sections[index]}
                                {index}
                                intercept={(from, to) => {
                                    const intercepted = intercept(
                                        diffchart.sections,
                                        from,
                                        to,
                                    );
                                    intercepted.forEach((section, index) => {
                                        section.order = index;
                                    });
                                    diffchart.sections = intercepted;
                                }}
                                remove={(index) => {
                                    diffchart.sections = diffchart.sections
                                        .filter((_, i) => i !== index)
                                        .map((section, i) => {
                                            section.order = i;
                                            return section;
                                        });
                                }}
                            />
                        {/each}
                        <tr>
                            <td colspan="4">
                                <button
                                    onclick={() => {
                                        diffchart.sections.push({
                                            order: diffchart.sections.length,
                                            name: "",
                                            songs: [],
                                            color: "black",
                                            backgroundColor: "grey",
                                        });
                                    }}
                                >
                                    섹션 추가
                                </button>
                            </td>
                        </tr>
                    </Table>
                </td>
            </tr>
        </Table>
    </div>
</div>

<style>
    .container {
        width: 100%;
    }

    .json {
        flex: 1 0 auto;
    }

    .layer {
        width: 100%;

        display: flex;
        align-items: center;
    }

    .color-text {
        font-size: 13px;
    }

    .bold {
        font-weight: bold;
        font-size: 18px;
    }

    td {
        border: 1px solid black;
        text-align: center;
    }

    input.title {
        width: 100%;
        height: 100%;

        margin: 0;

        box-sizing: border-box;
    }
</style>
