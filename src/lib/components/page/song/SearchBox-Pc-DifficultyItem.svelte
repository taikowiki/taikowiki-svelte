<script lang="ts">
    import type { Difficulty } from "$lib/module/common/song/types";
    import color from "$lib/module/common/color/color";

    export let value: Difficulty | "oniura";
    export let group: Difficulty | "oniura" | undefined;

    function clickHandle() {
        if (group !== value) {
            group = value;
        } else {
            group = undefined;
        }
    }
</script>

<div
    class={`button`}
    class:selected={group === value}
    class:unselected={group !== value && group !== undefined}
    style={`background:${color.difficulty[value]};`}
    on:click={clickHandle}
    role="presentation"
>
    <slot />
</div>
<input type="radio" bind:group {value} />

<style>
    input {
        display: none;
    }

    .button {
        width: 55px;

        display: flex;
        justify-content: center;
        align-items: center;

        height: 30px;
        border-radius: 5px;
        color:white;
        font-weight: bold;
        font-size: 14px;
        
        box-sizing: border-box;

        cursor: pointer;
    }

    .button.selected{
        border: 2px solid black;
    }
    .button.unselected{
        opacity: 0.4;
    }

    .button.long{
        width: 110px;
    }
    .button.short{
        width: 60px;
    }
</style>
