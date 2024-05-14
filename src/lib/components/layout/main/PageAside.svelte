<script lang="ts">
    import { afterUpdate, getContext, onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import AsideItem from "./AsideItem.svelte";

    export let title: string = "";
    export let titleHref: string = "";
    export let align: "left" | "center" | "right" = "center";
    export let icon: string = "";

    const pageAsideRoot = getContext('pageAside') as Writable<HTMLDivElement|null>
    let wrapper:HTMLDivElement;
    afterUpdate(() => {
        if($pageAsideRoot && wrapper){
            $pageAsideRoot.innerHTML = "";
            $pageAsideRoot.appendChild(wrapper);
        }
    })
</script>

<div class="container">
    <div class="wrapper" bind:this={wrapper}>
        <AsideItem {title} {titleHref} {align} {icon}>
            <slot/>
        </AsideItem>
    </div>
</div>

<style>
    .container{
        display:none;
    }
</style>