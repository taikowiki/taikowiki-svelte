<script lang="ts">
    import { pushState } from "$app/navigation";
    import { page } from "$app/stores";

    export let pageNum: number;
    export let length: number;

    $: maxPage = Math.ceil(length / 30);

    $: displayPages = (function () {
        let p: number[] = [];
        for (
            let i = Math.floor((pageNum - 1) / 10) * 10 + 1;
            i <= Math.min(Math.ceil(pageNum / 10) * 10, maxPage);
            i++
        ) {
            p.push(i);
        }
        return p;
    })();

    function movePage(p: number) {
        $page.url.searchParams.set("page", p.toString());
        let searchParams = new URLSearchParams(
            $page.url.searchParams.toString(),
        );
        let url = new URL($page.url.href);
        [...searchParams.entries()].forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        pushState(url.href, $page.state);
        pageNum = p;

        if (window) {
            window.scrollTo({
                top: 0,
            });
        }
    }
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
        .btn > span {
            transform: translateY(-1px);
        }
        .wrapper {
            column-gap: calc( (100% - 252px) / 11 );
        }
    }
</style>
