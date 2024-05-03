<script lang="ts" context="module">
    import { pushState } from "$app/navigation";
    import { page } from "$app/stores";
    import { get } from "svelte/store";

    function movePage(p: number) {
        const searchParam = new URLSearchParams(location.search);

        searchParam.set('page', p.toString());

        pushState(`/song?${searchParam}`, get(page).state);
    }

    function getDisplayPages(pageNum: number, maxPage: number) {
        let p: number[] = [];
        for (
            let i = Math.floor((pageNum - 1) / 10) * 10 + 1;
            i <= Math.min(Math.ceil(pageNum / 10) * 10, maxPage);
            i++
        ) {
            p.push(i);
        }
        return p;
    }
</script>

<script lang="ts">
    import { getIsMobile } from "$lib/module/layout/isMobile";

    export let pageNum: number;
    export let length: number;

    $: maxPage = Math.ceil(length / 30);

    $: displayPages = getDisplayPages(pageNum, maxPage);

    const isMobile = getIsMobile();
</script>

<div class="wrapper">
    {#if displayPages[0] !== 1}
        <div
            class="btn"
            role="presentation"
            on:click={() => {
                movePage(1);
            }}
        >
            <img src="/assets/icon/page_arrow2.svg" alt="" class=" scale" />
        </div>
    {/if}
    {#if displayPages[0] !== 1}
        <div
            class="btn"
            role="presentation"
            on:click={() => {
                movePage(displayPages[0] - 10);
            }}
        >
            <img src="/assets/icon/page_arrow1.svg" alt="" />
        </div>
    {/if}
    {#if $isMobile}
        <select bind:value={pageNum}>
            {#each displayPages as pNum}
            <option value={pNum}>
            {pNum}
            </option>
            {/each}
        </select>
    {:else}
        {#each displayPages as pNum}
            <div
                class="btn"
                on:click={() => {
                    movePage(pNum);
                }}
                role="presentation"
                class:selected={pNum === pageNum}
            >
                <span>{pNum}</span>
            </div>
        {/each}
    {/if}
    {#if displayPages[displayPages.length - 1] !== maxPage}
        <div
            class="btn"
            role="presentation"
            on:click={() => {
                movePage(displayPages[displayPages.length - 1] + 1);
            }}
        >
            <img src="/assets/icon/page_arrow1.svg" alt="" class="rotated" />
        </div>
    {/if}
    {#if displayPages[displayPages.length - 1] !== maxPage}
        <div
            class="btn"
            role="presentation"
            on:click={() => {
                movePage(maxPage);
            }}
        >
            <img
                src="/assets/icon/page_arrow2.svg"
                alt=""
                class="rotated scale"
            />
        </div>
    {/if}
</div>

<style>
    .wrapper {
        width: 100%;

        display: flex;

        justify-content: center;
        align-items: center;

        column-gap: 8px;

        margin-top: 15px;
    }

    .btn {
        width: 18px;
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .btn.selected {
        text-decoration: underline;
        font-weight: bold;
    }
    .btn > img {
        width: 18px;
        height: 18px;
    }
    .btn > span {
        transform: translateY(-2px);
    }

    .rotated {
        transform: rotateY(180deg);
    }
    .scale {
        transform: scale(115%);
    }
    .rotated.scale {
        transform: rotateY(180deg) scale(115%);
    }

    @media only screen and (max-width: 1000px) {
        .btn {
            font-size: 18px;
        }
        .btn > img {
            width: 18px;
            height: 18px;
        }

        select{
            width: 60px;
            height: 22px;
            font-size: 16px;
        }
    }
</style>
