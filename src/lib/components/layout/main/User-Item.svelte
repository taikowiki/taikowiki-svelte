<script lang="ts">
    export let href: string = "";
    export let isButton: boolean = false;
    export let separated: boolean = false;
    export let height: string = "50px"
    export let reload:boolean = false;
</script>

<svelte:element this={href ? "a" : "div"} {href} data-sveltekit-reload={reload}>
    <div class="item" class:button={isButton} style={`height:${height};`}>
        {#if separated}
            <div class="left">
                <slot name="left"/>
            </div>
            <div class="right">
                <slot name="right"/>
            </div>
        {:else}
            <slot />
        {/if}
    </div>
</svelte:element>

<style>
    a {
        color:inherit !important;
        text-decoration: none;
    }

    .item {
        width: 200px;
        height: 50px;

        border-radius: 10px;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .button {
        cursor: pointer;
    }
    .button:hover {
        background-color: rgba(196, 196, 196, 0.223);
    }

    .left, .right{
        height: 100%;

        display:flex;
        align-items: center;
    }
    .left{
        min-width: 50px;
        box-sizing: border-box;

        padding-inline-start: 20px;
    }
    .right{
        flex: 1 0 auto;
        justify-content: center;
    }
</style>
