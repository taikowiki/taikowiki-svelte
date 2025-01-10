<script lang="ts">
    interface Props {
        name: string;
        color?: string;
        backgroundColor?: string;
        userCrownCount: {
            clearCount: number,
            fcCount: number,
            dfcCount: number
        } | null;
        closed: boolean;
        onclick: (event: MouseEvent) => void
    }

    let {
        name,
        color = "white",
        backgroundColor = "#7f7f7f",
        userCrownCount,
        closed,
        onclick
    }: Props = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="name"
    class:closed
    style={`color:${color};background-color:${backgroundColor};`}
    {onclick}
>
    {name}{userCrownCount !== null ? ` (${userCrownCount.clearCount}/${userCrownCount.fcCount}/${userCrownCount.dfcCount})` : ""}
</div>

<style>
    .name {
        width: 100%;
        height: 70px;

        border-radius: 10px;

        display: flex;
        justify-content: center;
        align-items: flex-start;

        font-size: 28px;
        font-weight: bold;

        transition: filter 0.2s;
    }

    .name.closed {
        filter: brightness(0.7);
        margin-bottom: 8px;
        height: 42px;
        padding-bottom: 3px;
    }

    .name:hover {
        cursor: pointer;
        filter: brightness(1.05);
    }

    .name.closed:hover {
        filter: brightness(0.9);
    }
</style>
