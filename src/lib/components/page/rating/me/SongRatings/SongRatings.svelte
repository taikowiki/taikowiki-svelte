<script lang="ts">
    import { getI18N, getLang } from "$lib/module/i18n";
    import { Song } from "$lib/module/song";
    import { User } from "$lib/module/user";
    import type { getRating } from "@taiko-wiki/taiko-rating";
    import GridIcon from "$lib/assets/grid.svg";
    import ListIcon from "$lib/assets/list.svg";
    import { getTheme } from "$lib/module/layout/theme";
    import SongRatingsList from "./List/SongRatings-List.svelte";
    import html2canvas from "html2canvas";
    import DonderData from "../DonderData.svelte";
    import DonderRating from "../DonderRating.svelte";
    import SongRatingsGrid from "./Grid/SongRatings-Grid.svelte";

    type ViewType = "grid" | "list";
    interface Props {
        songDatas: Pick<Song.SongData, "songNo" | "title">[];
        songRatingDatas: ReturnType<typeof getRating>["songRatingDatas"];
        scoreData: User.DonderData["scoreData"];
        only50?: boolean;
        dataForImage?: {
            ratings: ReturnType<typeof getRating>;
            tier: ReturnType<typeof User.getTier>;
            ranking: { count: number; ranking: number };
            donderData: User.DonderData;
        };
    }

    let {
        songDatas,
        songRatingDatas,
        scoreData,
        only50 = false,
        dataForImage,
    }: Props = $props();

    /** 곡 레이팅 뷰 타입 */
    let viewType = $state(getViewTypeInitValue());
    /** 이미지 생성용 복제본 */
    let replicaForImage = $state<HTMLElement | null>();

    const [theme] = getTheme();
    const lang = getLang();
    let newI18n = $derived(getI18N($lang).page.donder);

    /** 곡 레이팅 뷰 타입 초기 값 가져오기 */
    function getViewTypeInitValue(): ViewType {
        return (
            (window.localStorage.getItem(
                "songRatingsViewType",
            ) as ViewType | null) ?? "grid"
        );
    }
    /** 곡 레이팅 뷰 타입 설정 */
    function setViewType(type: ViewType) {
        viewType = type;
        window.localStorage.setItem("songRatingsViewType", type);
    }
    /** 이미지 다운로드 */
    function downloadImage() {
        queueMicrotask(async () => {
            if (!replicaForImage) return;
            const canvas = await html2canvas(replicaForImage, {
                backgroundColor: "rgb(255, 255, 255)",
            });
            const url = canvas.toDataURL();
            const a = document.createElement("a");
            a.setAttribute("download", `rating.png`);
            a.href = url;
            a.click();
            a.remove();
            canvas.remove();
        });
        alert(newI18n.downloadMessage);
    }
</script>

<h2>
    <div>
        {newI18n.section.song}
    </div>
    <div class="viewtype-btn-container">
        <img
            class="viewtype-btn grid"
            class:selected={viewType === "grid"}
            src={GridIcon}
            data-theme={$theme}
            onclick={() => setViewType("grid")}
            role="presentation"
            alt="grid"
        />
        <img
            class="viewtype-btn list"
            class:selected={viewType === "list"}
            src={ListIcon}
            data-theme={$theme}
            onclick={() => setViewType("list")}
            role="presentation"
            alt="list"
        />
    </div>
</h2>
{@render songRatingsView(songRatingDatas, only50)}
{@render replica()}

{#snippet songRatingsView(
    songRatingDatas: Props["songRatingDatas"],
    only50: boolean,
    forDownload?: boolean,
)}
    {#if viewType === "grid"}
        <SongRatingsGrid
            {songRatingDatas}
            {songDatas}
            {scoreData}
            {only50}
            {downloadImage}
            {forDownload}
        />
    {:else if viewType === "list"}
        <SongRatingsList
            {songRatingDatas}
            {songDatas}
            {scoreData}
            {only50}
            {downloadImage}
            {forDownload}
        />
    {/if}
{/snippet}

{#snippet replica()}
    {#if dataForImage}
        {@const { donderData, ratings, tier, ranking } = dataForImage}
        <div class="replica" data-theme="light" bind:this={replicaForImage}>
            <div class="replica-head">
                <DonderData {donderData} isDownload={true} />
                <DonderRating {ratings} {tier} {ranking} isDownload={true} />
            </div>
            {@render songRatingsView(songRatingDatas.slice(0, 50), true, true)}
        </div>
    {/if}
{/snippet}

<style>
    h2 {
        width: 100%;

        display: flex;
        justify-content: space-between;

        margin-block: 0;
    }

    .viewtype-btn-container {
        display: flex;
        justify-items: center;
        align-items: center;
        column-gap: 5px;

        & .viewtype-btn {
            cursor: pointer;
            &.grid {
                width: 25px;
                height: 25px;
            }
            &.list {
                width: 30px;
                height: 30px;
            }
            &[data-theme="light"] {
                filter: invert(60%);
                &:hover {
                    filter: invert(30%);
                }
                &.selected {
                    filter: invert(0%);
                }
            }
            &[data-theme="dark"] {
                filter: invert(40%);
                &:hover {
                    filter: invert(70%);
                }
                &.selected {
                    filter: invert(100%);
                }
            }
        }
    }

    .replica {
        width: 830px;
        position: absolute;

        left: -100vw;
        top: -100vh;

        transform: translate(-100%, -100%);

        padding: 3px;
    }
    .replica-head {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        color: black;
        margin-bottom: 15px;
    }
</style>
