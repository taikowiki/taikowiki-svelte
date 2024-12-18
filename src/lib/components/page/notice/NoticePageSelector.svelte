<script lang="ts" module>
    import { goto } from "$app/navigation";

    function movePage(p: number) {
        const searchParam = new URLSearchParams(location.search);

        searchParam.set("page", p.toString());

        goto(`/notice?${searchParam}`);

        window.scrollTo({
            top: 0,
        });
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

    interface Props {
        pageNum: number;
        length: number;
    }

    let { pageNum = $bindable(), length }: Props = $props();

    let maxPage = Math.ceil(length / 30);
    let displayPages = getDisplayPages(pageNum, maxPage);

    const isMobile = getIsMobile();
</script>

{#if length !== 0}
    <div class="wrapper" data-isMobile={$isMobile}>
        {#if displayPages[0] !== 1}
            <div
                class="btn"
                role="presentation"
                onclick={() => {
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
                onclick={() => {
                    movePage(displayPages[0] - 10);
                }}
            >
                <img src="/assets/icon/page_arrow1.svg" alt="" />
            </div>
        {/if}
        {#if $isMobile}
            <select
                bind:value={pageNum}
                onchange={() => {
                    movePage(pageNum);
                }}
            >
                {#each [...Array(maxPage).keys()] as pNum}
                    <option value={pNum + 1}>
                        {pNum + 1}
                    </option>
                {/each}
            </select>
        {:else}
            {#each displayPages as pNum}
                <div
                    class="btn"
                    onclick={() => {
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
                onclick={() => {
                    movePage(displayPages[displayPages.length - 1] + 1);
                }}
            >
                <img
                    src="/assets/icon/page_arrow1.svg"
                    alt=""
                    class="rotated"
                />
            </div>
        {/if}
        {#if displayPages[displayPages.length - 1] !== maxPage}
            <div
                class="btn"
                role="presentation"
                onclick={() => {
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
{/if}

<style>
    .wrapper {
        width: 100%;

        display: flex;

        justify-content: center;
        align-items: center;

        column-gap: 8px;

        margin-top: 15px;

        box-sizing: border-box;
    }
    .wrapper[data-isMobile="false"] {
        padding-left: 40px;
        padding-right: 100px;
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

        select {
            width: 60px;
            height: 22px;
            font-size: 16px;
        }
    }
</style>
