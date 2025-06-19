<script lang="ts" module>
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
    import { Song } from "$lib/module/song";
    import { Util } from "$lib/module/util";
    import { getTheme } from "$lib/module/layout/theme";
    import type { Snippet } from "svelte";

    type Difficulty = Song.Difficulty;

    interface Props {
        value: Difficulty | "oniura";
        group?: Difficulty | "oniura";
        children?: Snippet;
    }

    let { value, group = $bindable(), children }: Props = $props();

    const [theme] = getTheme();
</script>

<div
    class={`button`}
    class:selected={group === value}
    class:unselected={group !== value && group !== undefined}
    style={`background:${Util.Color.difficulty[value]};`}
    onclick={() => {
        group = clickHandle(group, value);
    }}
    role="presentation"
    data-theme={$theme}
>
    <span>
        {@render children?.()}
    </span>
</div>
<input type="radio" bind:group {value} />

<style>
    input {
        display: none;
    }

    .button {
        min-width: 55px;

        display: flex;
        justify-content: center;
        align-items: center;

        height: 30px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        font-size: 14px;

        box-sizing: border-box;

        padding-inline: 5px;

        cursor: pointer;
    }

    .button.selected {
        border: 2px solid black;
        padding-inline: 3px;
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

    span {
        transform: translateY(-1px);
    }
</style>
