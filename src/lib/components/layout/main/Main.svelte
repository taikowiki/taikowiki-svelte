<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";
    import { onMount, type Snippet } from "svelte";

    interface Props{
        aside?: Snippet;
        main?: Snippet;
    }

    let {aside, main}: Props = $props();

    let mainElement = $state<HTMLElement>();
    let observer = $state<MutationObserver>();
    onMount(() => {
        if(!mainElement) return;
        observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if(mutation.attributeName === "style"){
                    (mutation.target as HTMLElement).removeAttribute('style');
                }
            })
        });
        observer.observe(mainElement, {attributes: true, attributeOldValue: true});
        mainElement.removeAttribute('style');
    })
    const [theme] = getTheme();
</script>

<div class="container-container">
    <div class="container" data-theme={$theme}>
        {@render aside?.()}
        <main data-theme={$theme} style="" bind:this={mainElement}>
            {@render main?.()}
        </main>
    </div>
</div>

<style>
    .container-container {
        width: 100%;
        display: flex;
        justify-content: center;

        overflow-x: hidden;
    }

    .container {
        width: 100%;
        max-width: 1400px;

        display: flex;
        flex-direction: row;
        column-gap: 20px;

        padding-inline: 20px;

        box-sizing: border-box;
    }

    main {
        width: calc(100% - 270px);

        box-sizing: border-box;

        border-radius: 10px;

        padding: 15px
    }
    main[data-theme="light"] {
        background-color: white;
    }
    main[data-theme="dark"] {
        background-color: rgb(40, 40, 40);
    }

    @media only screen and (max-width: 1000px) {
        .container {
            padding-inline: 0;
        }

        main {
            width: 100%;
            min-height: calc(100vh - 50px);

            border-radius: 0;
        }
    }
</style>
