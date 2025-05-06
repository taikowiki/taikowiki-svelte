<script lang="ts">
    import { getContext, mount, onDestroy, onMount, unmount, type Snippet } from "svelte";
    import AsideItem from "./AsideItem.svelte";
    import { get, type Writable } from "svelte/store";

    interface Props {
        title?: string;
        titleHref?: string;
        align?: "left" | "center" | "right";
        icon?: string;
        children?: Snippet;
    }

    let props: Props = $props();

    let wrapper = $state<HTMLElement>();
    let asideItem = $state<AsideItem>();
    onMount(() => {
        let _aside = getContext('asideElement') as Writable<HTMLElement>;
        const aside = get(_aside);
        if(!aside) return;
        wrapper = document.createElement('div');
        asideItem = mount(AsideItem, {
            target: wrapper,
            props
        });
        aside.prepend(wrapper);
    })
    onDestroy(() => {
        if(asideItem){
            unmount(asideItem);
        }
        if(wrapper){
            wrapper.remove();
        }
    })
</script>