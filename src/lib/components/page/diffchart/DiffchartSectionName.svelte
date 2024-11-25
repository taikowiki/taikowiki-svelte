<script lang="ts">
    export let name: string;
    export let color: string = "white";
    export let backgroundColor: string = "#7f7f7f";
    export let clearedSongsCount: number|null;
    export let closed: boolean;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
    class="name" 
    class:closed
    style={`color:${color};background-color:${backgroundColor};`}
    on:click
>
    {name}{clearedSongsCount !== null ? ` (${clearedSongsCount})` : ""}
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
    }

    .name:hover {
        cursor: pointer;
        filter: brightness(1.05);
    }

    .name.closed:hover {
        filter: brightness(0.9);
    }
</style>
