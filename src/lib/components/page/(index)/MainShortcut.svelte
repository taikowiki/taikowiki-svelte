<script lang="ts">
    import { getI18N, getLang } from "$lib/module/i18n";
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
            href: "/doc",
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
            src: "/assets/icon/rating.svg",
            name: "레이팅",
            href: "/rating",
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

    const lang = getLang();
    $: i18n = getI18N($lang).page.index.shortcut;
    $: {
        items[0].name = i18n.song;
        items[1].name = i18n.doc;
        items[2].name = i18n.diffchart;
        items[3].name = i18n.dani;
        items[4].name = i18n.gamecenter;
        items[5].name = i18n.rating;
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
        align-items: flex-start;

        row-gap: 5px;

        margin-top: 20px;
    }

    .sub-container {
        width: min(225px, 100%);

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: flex-start;
    }
</style>
