<script lang="ts">
    import groupBy from "object.groupby";
    import MainShortcutItem from "./MainShortcutItem.svelte";

    const items = [
        {
            src: "/assets/icon/song.svg",
            name: "곡",
            href: "/song",
        },
        {
            src: "/assets/icon/document.svg",
            name: "문서",
            href: "/w",
        },
        {
            src: "/assets/icon/leaderboard.svg",
            name: "서열표",
            href: "/diffchart",
        },
        {
            src: "/assets/icon/dani.svg",
            name: "단위도장",
            href: "/dani",
        },
        {
            src: "/assets/icon/maps-pin-header.svg",
            name: "오락실",
            href: "/gamecenter",
        },
        {
            src: "/assets/icon/user.svg",
            name: "내 정보",
            href: "/auth/user",
        },
    ];

    function divide<T = any>(arr: T[], by: number): T[][] {
        const cloneArr = [...arr];
        const newArray: T[][] = [];
        for (let i = 0; i < Math.floor(arr.length / by); i++) {
            newArray.push(cloneArr.splice(0, by));
        }
        return newArray;
    }
</script>

<div class="container">
    {#each divide(items, 3) as subItems}
        <div class="sub-container">
            {#each subItems as { src, name, href }}
                <MainShortcutItem {src} {name} {href} />
            {/each}
        </div>
    {/each}
</div>

<style>
    .container {
        width: min(450px, 100%);

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;

        row-gap: 5px;

        margin-top: 20px;
    }

    .sub-container {
        width: min(225px, 100%);

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
    }
</style>
