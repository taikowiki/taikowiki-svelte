<script lang="ts">
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";

    export let images: string[];

    let opened = true;

    const [theme] = getTheme();
    const isMobile = getIsMobile();
</script>

{#if images.length}
    <div class="container" data-isMobile={$isMobile}>
        <div
            class="opener"
            role="presentation"
            on:click={() => {
                opened = !opened;
            }}
            data-opened={opened}
            data-theme={$theme}
        >
            보면 이미지
        </div>
        {#if opened}
            {#each images as image}
                <img
                    src={image}
                    alt="fumen"
                    on:error={(event) => {
                        event.currentTarget.remove();
                    }}
                />
            {/each}
        {/if}
    </div>
{/if}

<style>
    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    /*
     .container[data-isMobile="false"] {
        width: calc(100% - 80px);
        margin-left: 80px;
        transform: translateY(-34px);
    }*/

    img {
        width: 100%;
        max-width: 800px;
    }

    .opener {
        width: 100%;
        height: 34px;

        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        background-color: #cf4844;

        color: white;

        column-gap: 5px;
    }
    .opener[data-opened="true"]::after {
        content: "▲";
    }
    .opener[data-opened="false"]::after {
        content: "▼";
    }
    .opener[data-theme="dark"] {
        background-color: #1c1c1c;
    }
</style>
