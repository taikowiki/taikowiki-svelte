<script lang="ts">
    import { getContext, onMount, type Snippet } from "svelte";
    import type { Writable } from "svelte/store";
    import AsideItem from "./AsideItem.svelte";

    interface Props {
        title?: string;
        titleHref?: string;
        align?: "left" | "center" | "right";
        icon?: string;
        children?: Snippet;
    }

    let {
        title = "",
        titleHref = "",
        align = "center",
        icon = "",
        children,
    }: Props = $props();

    const pageAsideRootStore = getContext("pageAside") as Writable<HTMLDivElement | null>;
    let pageAsideRoot = $state.raw($pageAsideRootStore);
    $effect(() => {
        if(!pageAsideRoot){
            pageAsideRoot = $pageAsideRootStore;
        }
    })
    let wrapper: HTMLDivElement;

    let isPageAsideRootExists = $derived(pageAsideRoot !== null);
    $effect(() => {
        if(isPageAsideRootExists && wrapper){
            (pageAsideRoot as HTMLDivElement).innerHTML = "";
            (pageAsideRoot as HTMLDivElement).appendChild(wrapper);
        }
    })
</script>

<div class="container">
    <div class="wrapper" bind:this={wrapper}>
        <AsideItem {title} {titleHref} {align} {icon}>
            {@render children?.()}
        </AsideItem>
    </div>
</div>

<style>
    .container {
        display: none;
    }
</style>
