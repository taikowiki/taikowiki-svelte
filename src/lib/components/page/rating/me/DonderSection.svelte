<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        opened: boolean;
        sectionName: string;
        children?: Snippet;
    }

    let { opened = $bindable(), sectionName, children }: Props = $props();
</script>

<div class="container">
    <h2
        class:opened
        role="presentation"
        onclick={() => {
            opened = !opened;
        }}
    >
        {sectionName}
    </h2>
    <div class="content" class:opened>
        {@render children?.()}
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    h2 {
        margin-block: 0;
        border-bottom: 3px solid black;
        cursor: pointer;
    }
    h2::before {
        content: "▼";
    }
    h2.opened::before {
        content: "▲";
    }

    .content {
        width: 100%;
        visibility: hidden;
        position: absolute;
        left: 0;
        top: 0;
        transform: translate(-100%, -100%);
    }
    .content.opened {
        position: static;
        transform: translate(0, 0);
        visibility: visible;
    }
</style>
