<script lang="ts" context="module">
    function clickHandle(
        group: Difficulty | "oniura" | undefined,
        value: Difficulty | "oniura",
    ) {
        if (group !== value) {
            return value;
        } else {
            return undefined;
        }
    }
</script>

<script lang="ts">
    import type { Difficulty } from "$lib/module/common/song/types";
    import color from "$lib/module/common/color";
    import { getTheme } from "$lib/module/layout/theme";

    export let value: Difficulty | "oniura";
    export let group: Difficulty | "oniura" | undefined;

    const [theme] = getTheme();
</script>

<div
    class={`button`}
    class:selected={group === value}
    class:unselected={group !== value && group !== undefined}
    style={`background:${color.difficulty[value]};`}
    on:click={() => {
        group = clickHandle(group, value);
    }}
    role="presentation"
    data-theme={$theme}
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
        color: white;
        font-weight: bold;
        font-size: 14px;

        box-sizing: border-box;

        cursor: pointer;
    }

    .button.selected {
        border: 2px solid black;
    }
    .button.unselected {
        opacity: 0.4;
    }

    .button.long {
        width: 110px;
    }
    .button.short {
        width: 60px;
    }

    .button.selected[data-theme="dark"] {
        border-color: white;
    }
</style>
