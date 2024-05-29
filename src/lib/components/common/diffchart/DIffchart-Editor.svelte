<script lang="ts" context="module">
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
    import intercept from "$lib/module/common/intercept";

    import { type DiffChart } from "$lib/module/common/diffchart/types";
    import DiffchartEditorSection from "./Diffchart-Editor-Section.svelte";

    export let diffchart: DiffChart;
</script>

<div class="container">
    <div class="layer">
        <input
            type="text"
            value={JSON.stringify(diffchart)}
            disabled
            class="json"
        />
        <button
            on:click={() => {
                copyJSON(JSON.stringify(diffchart));
            }}
            >복사하기
        </button>
    </div>
    <div class="layer">
        <table>
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
                    <table>
                        {#each diffchart.sections.sort((a, b) => a.order - b.order) as section, index (section)}
                            <DiffchartEditorSection
                                bind:section
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
                                    diffchart.sections = diffchart.sections.filter((_, i) => i !== index).map((section, i) => {
                                        section.order = i;
                                        return section;
                                    });
                                }}
                            />
                        {/each}
                        <tr>
                            <td colspan="4">
                                <button
                                    on:click={() => {
                                        diffchart.sections = [
                                            ...diffchart.sections,
                                            {
                                                order: diffchart.sections
                                                    .length,
                                                name: "",
                                                songs: [],
                                            },
                                        ];
                                    }}
                                >
                                    섹션 추가
                                </button>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
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

    table {
        width: 100%;
        border-collapse: collapse;
    }
    td {
        border: 1px solid black;
    }

    input.title {
        width: 100%;
        height: 100%;

        margin: 0;

        box-sizing: border-box;
    }
</style>
