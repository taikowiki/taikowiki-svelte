<script lang="ts">
    import type { Section } from "$lib/module/common/diffchart/types";
    import DiffchartEditorSong from "./Diffchart-Editor-Song.svelte";
    import {intercept as _intercept} from '$lib/module/common/util';

    export let section: Section;
    export let index;
    export let intercept: (from: number, to: number) => any;
    export let remove: (index: number) => any;

    section.order = index;
</script>

<tr class="container">
    <td class="bold" style="text-align:center;width:150px;">
        <button
            on:click={() => {
                intercept(section.order, section.order - 1);
            }}>↑</button
        >
        <input
            class="bold"
            type="text"
            bind:value={section.name}
            style="width:80px;display:inline-block;text-align:center;"
        />
        <button
            on:click={() => {
                intercept(section.order, section.order + 1);
            }}>↓</button
        >

        <button
            on:click={() => {
                remove(index);
            }}>삭제</button
        >
    </td>
    <td style="padding:0;">
        <table>
            <tr>
                <td>
                    <div class="layer" style="justify-content:center;">
                        색상
                    </div>
                </td>
                <td>
                    <div class="layer" style="column-gap:5px;">
                        <span class="color-text">글씨</span>
                        <input type="color" bind:value={section.color} />

                        <span class="color-text">배경</span>
                        <input
                            type="color"
                            bind:value={section.backgroundColor}
                        />
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="layer" style="justify-content:center;">곡</div>
                </td>
                <td>
                    <table>
                        <tr>
                            <th style="width:110px; "> 순서 </th>
                            <th style="width:110px;"> 곡 번호 </th>
                            <th> 제목 </th>
                            <th style="width:110px;"> 난이도 </th>
                            <th style="width: 110px;">삭제</th>
                        </tr>
                        {#each section.songs.sort((a, b) => a.order - b.order) as song, index (song)}
                            <DiffchartEditorSong
                                bind:song
                                {index}
                                intercept={(from, to) => {
                                    const intercepted = _intercept(
                                        section.songs,
                                        from,
                                        to,
                                    );
                                    intercepted.forEach((song, index) => {
                                        song.order = index;
                                    });
                                    section.songs = intercepted;
                                }}
                                remove={(index) => {
                                    section.songs = section.songs
                                        .filter((_, i) => i !== index)
                                        .map((song, i) => {
                                            song.order = i;
                                            return song;
                                        });
                                }}
                            />
                        {/each}
                        <tr>
                            <td colspan="5">
                                <button
                                    on:click={() => {
                                        section.songs = [
                                            ...section.songs,
                                            {
                                                order: section.songs.length,
                                                songNo: "0",
                                                title: "",
                                                difficulty: "oni",
                                            },
                                        ];
                                    }}>곡 추가</button
                                >
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </td>
</tr>

<style>
    .container:hover {
        background-color: rgba(156, 156, 255, 0.495);
    }
    table {
        width: 100%;

        border-collapse: collapse;
    }

    th,
    td {
        border: 1px solid black;
    }

    .layer {
        width: 100%;

        display: flex;
        align-items: center;
    }

    .bold {
        font-weight: bold;
    }

    .color-text {
        font-size: 13px;
    }
</style>
