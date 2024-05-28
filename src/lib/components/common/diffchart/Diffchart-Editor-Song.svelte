<script lang="ts">
    import type { Song } from "$lib/module/common/diffchart/types";
    import { difficulty } from "$lib/module/common/color";

    export let song: Song;
    export let index: number;
    export let intercept: (from: number, to: number) => any;

    song.order = index;
</script>

<tr class="container">
    <td>
        <div class="layer">
            <button
                class="order-button"
                on:click={() => {
                    intercept(song.order, song.order - 1);
                }}>↑</button
            >
            <input
                type="number"
                value={song.order}
                min="0"
                on:change={(event) => {
                    intercept(song.order, Number(event.currentTarget.value));
                }}
                style="width:calc(100% - 50px);"
            />
            <button
                class="order-button"
                on:click={() => {
                    intercept(song.order, song.order + 1);
                }}>↓</button
            >
        </div>
    </td>
    <td>
        <input type="text" bind:value={song.songNo} />
    </td>
    <td>
        <input type="text" bind:value={song.title} />
    </td>
    <td>
        <div class="layer" style="column-gap: 5px;justify-content:center;">
            <div
                class="color"
                style={`background-color:${difficulty[song.difficulty]};`}
            />
            <select bind:value={song.difficulty}>
                {#each ["easy", "normal", "hard", "oni", "ura"] as diff}
                    <option value={diff}>{diff}</option>
                {/each}
            </select>
        </div>
    </td>
</tr>

<style>
    .container:hover{
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
