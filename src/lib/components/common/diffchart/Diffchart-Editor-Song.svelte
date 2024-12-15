<script lang="ts">
    import type { Song } from "$lib/module/common/diffchart/types";
    import { difficulty } from "$lib/module/common/color";

    interface Props{
        song: Song;
        index: number;
        intercept: (from: number, to: number) => any;
        remove: (index: number) => any;
    }

    let {song = $bindable(), index, intercept, remove}: Props = $props();

    song.order = index;
</script>

<tr class="container">
    <td>
        <div class="layer">
            <button
                class="order-button"
                onclick={() => {
                    intercept(song.order, song.order - 1);
                }}>↑</button
            >
            <input
                type="number"
                value={song.order}
                min="0"
                onchange={(event) => {
                    intercept(song.order, Number(event.currentTarget.value));
                }}
                style="width:calc(100% - 50px);"
            />
            <button
                class="order-button"
                onclick={() => {
                    intercept(song.order, song.order + 1);
                }}>↓</button
            >
        </div>
    </td>
    <td>
        <div class="layer">
            <input type="text" bind:value={song.songNo} />
        </div>
    </td>
    <td>
        <div class="layer">
            <input type="text" bind:value={song.title} placeholder="비워두어도 됩니다."/>
        </div>
    </td>
    <td>
        <div class="layer" style="column-gap: 5px;justify-content:center;">
            <div
                class="color"
                style={`background-color:${difficulty[song.difficulty]};`}
            ></div>
            <select bind:value={song.difficulty}>
                {#each ["easy", "normal", "hard", "oni", "ura"] as diff}
                    <option value={diff}>{diff}</option>
                {/each}
            </select>
        </div>
    </td>
    <td> 
        <div class="layer">
            <button onclick={() => {
                remove(index)
            }}>삭제</button>
        </div>
    </td>
</tr>

<style>
    .container:hover {
        background-color: rgba(255, 162, 162, 0.553);
    }

    .layer {
        width: 100%;

        display: flex;
        align-items: center;
    }

    .color {
        width: 15px;
        height: 15px;
    }

    input {
        width: calc(100% - 10px);
    }

    td {
        border: 1px solid black;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    /* Firefox */
    input[type="number"] {
        appearance: textfield;
    }

    .order-button {
        width: 20px;
        height: 20px;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
