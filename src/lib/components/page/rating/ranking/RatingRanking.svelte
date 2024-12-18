<script lang="ts">
    import { goto } from "$app/navigation";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import type { UserRatingTierName } from "$lib/module/common/user/types";
    import { getTheme } from "$lib/module/layout/theme";
    import type { Action } from "svelte/action";
    import TierImage from "../me/TierImage.svelte";

    interface Props {
        rankings: {
            UUID: string;
            currentRating: number;
            donder: {
                nickname: string | null;
                taikoNumber: string | null;
            };
            tier: {
                tierName: UserRatingTierName;
                detailTierGrade: 1 | 2 | 3 | 5 | 4 | null;
            };
        }[];
        page: number;
    }

    let { rankings, page }: Props = $props();

    const [theme] = getTheme();
    const lang = getLang();
    let i18n = $derived(getI18N($lang).page.rating.ranking);
</script>

<div class="table">
    <div class="thead">
        <div class="tr">
            <div class="th">{i18n.ranking}</div>
            <div class="th">{i18n.tier}</div>
            <div class="th">{i18n.rating}</div>
            <div class="th nickname">{i18n.nickname}</div>
        </div>
    </div>
    <div class="tbody" data-theme={$theme}>
        {#each rankings as ranking, index}
            <a class="tr" href={`/rating/user/${ranking.UUID}`}>
                <div class="td"> {(page - 1) * 50 + index + 1} </div>
                <div class="td">
                    <div class="td tier-image">
                        <TierImage
                            tierName={ranking.tier.tierName}
                            grade={ranking.tier.detailTierGrade}
                            width="50px"
                            height="50px"
                            fontSize="34px"
                            transform="translate(0px, -2px)"
                        />
                    </div>
                </div>
                <div class="td">
                    {ranking.currentRating}
                </div>
                <div class="td nickname">
                    {#if ranking.donder.nickname}
                        {ranking.donder.nickname}
                    {:else}
                        <span class="noName"> ??? </span>
                    {/if}
                    {#if ranking.donder.taikoNumber}
                        <span class="taikoNumber">
                            {ranking.donder.taikoNumber}
                        </span>
                    {/if}
                </div>
            </a>
        {/each}
    </div>
</div>

<style>
    .table {
        width: 100%;
        border-collapse: collapse;
        display: table;
        box-sizing: border-box;
        text-indent: initial;
        unicode-bidi: isolate;
        border-spacing: 2px;
        border-color: gray;
    }
    .thead {
        display: table-header-group;
        vertical-align: middle;
        unicode-bidi: isolate;
        border-color: inherit;
    }
    .tbody {
        display: table-row-group;
        vertical-align: middle;
        unicode-bidi: isolate;
        border-color: inherit;
    }
    .tr {
        display: table-row;
        vertical-align: inherit;
        unicode-bidi: isolate;
        border-color: inherit;
    }
    .th {
        padding-inline: 5px;
        font-size: 20px;
        text-align: center;
        min-width: 70px;
        width: fit-content;
        text-wrap: nowrap;
        display: table-cell;
        vertical-align: inherit;
        font-weight: bold;
        unicode-bidi: isolate;
    }
    .th.nickname {
        width: 100%;
    }
    .td {
        text-align: center;
        display: table-cell;
        vertical-align: inherit;
        unicode-bidi: isolate;
    }

    .tr {
        display: table-row;
        vertical-align: inherit;
        color: inherit;
    }
    .tbody .tr:hover {
        background-color: rgb(228, 228, 228);
        cursor: pointer;
    }
    .tbody[data-theme="dark"] .tr:hover {
        background-color: rgb(53, 53, 53);
    }

    .tier-image {
        display: inline-block;
    }

    .noName {
        font-size: 13px;
        color: rgb(84, 84, 84);
    }
    .tbody[data-theme="dark"] .noName {
        color: rgb(155, 155, 155);
    }

    .taikoNumber {
        font-size: 12px;
        color: rgb(84, 84, 84);
    }
    .tbody[data-theme="dark"] .taikoNumber {
        color: rgb(155, 155, 155);
    }
</style>
