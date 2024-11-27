<script lang="ts">
    import { goto } from "$app/navigation";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import type { UserRatingTierName } from "$lib/module/common/user/types";
    import { getTheme } from "$lib/module/layout/theme";
    import TierImage from "../me/TierImage.svelte";

    export let rankings: {
        UUID: string;
        currentRating: number;
        donder: {
            nickname: string | null;
            taikoNumber: number | null;
        };
        tier: {
            tierName: UserRatingTierName;
            detailTierGrade: 1 | 2 | 3 | 5 | 4 | null;
        };
    }[];
    export let page: number;

    const [theme] = getTheme();
    const lang = getLang();
    $: i18n = getI18N($lang).page.rating.ranking;
</script>

<table>
    <thead>
        <tr>
            <th> {i18n.ranking} </th>
            <th> {i18n.tier} </th>
            <th> {i18n.rating} </th>
            <th class="nickname"> {i18n.nickname} </th>
        </tr>
    </thead>
    <tbody data-theme={$theme}>
        {#each rankings as ranking, index}
            <tr on:click={() => {goto(`/rating/user/${ranking.UUID}`)}}>
                <td> {(page - 1) * 50 + index + 1} </td>
                <td>
                    <div class="tier-image">
                        <TierImage
                            tierName={ranking.tier.tierName}
                            grade={ranking.tier.detailTierGrade}
                            width="50px"
                            height="50px"
                            fontSize="34px"
                            transform="translate(0px, -2px)"
                        />
                    </div>
                </td>
                <td>
                    {ranking.currentRating}
                </td>
                <td class="nickname">
                    {#if ranking.donder.nickname}
                        {ranking.donder.nickname}
                    {:else}
                        <span class="noName">
                            ???
                        </span>
                    {/if}
                    {#if ranking.donder.taikoNumber}
                        <span class="taikoNumber">
                            {ranking.donder.taikoNumber}
                        </span>
                    {/if}
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th {
        padding-inline: 5px;
        font-size: 20px;
        text-align: center;
        min-width: 70px;
        width: fit-content;
        text-wrap: nowrap;
    }
    th.nickname {
        width: 100%;
    }
    td {
        text-align: center;
    }

    tbody tr:hover {
        background-color: rgb(228, 228, 228);
        cursor: pointer;
    }
    tbody[data-theme="dark"] tr:hover {
        background-color: rgb(53, 53, 53);
    }

    .tier-image {
        display: inline-block;
    }

    .noName{
        font-size: 13px;
        color: rgb(84, 84, 84);
    }
    tbody[data-theme="dark"] .noName {
        color: rgb(155, 155, 155);
    }

    .taikoNumber {
        font-size: 12px;
        color: rgb(84, 84, 84);
    }
    tbody[data-theme="dark"] .taikoNumber {
        color: rgb(155, 155, 155);
    }
</style>
