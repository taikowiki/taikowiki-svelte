<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";
    import { type Snippet } from "svelte";

    interface Props {
        show: boolean;
        children?: Snippet;
    }

    let { show = $bindable(), children }: Props = $props();
    let dialog = $state<HTMLDialogElement>();

    $effect(() => {
        if (!dialog) return;
        if (show) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    });

    const [theme] = getTheme();
</script>

<dialog
    bind:this={dialog}
    class:light={$theme === "light"}
    class:dark={$theme === "dark"}
    class:show
>
    {@render children?.()}
</dialog>

<style>
    dialog {
        max-width: 100%;

        display: none;

        border-radius: 5px;
        border: 0;

        &.light {
            background-color: white;

            &::backdrop {
                background-color: rgb(15, 15, 15);
                opacity: 0.5;
            }
        }

        &.dark {
            background-color: rgb(40, 40, 40);
            color: white;
            border: 2px solid rgb(105, 105, 105);

            &::backdrop {
                background-color: black;
                opacity: 0.4;
            }
        }

        &.show {
            display: flex;
            flex-direction: column;
            row-gap: 20px;
        }
    }
</style>
