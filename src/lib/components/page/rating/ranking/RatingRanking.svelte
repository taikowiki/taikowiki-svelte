<script lang="ts">
    import type { UserRatingTierName } from "$lib/module/common/user/types";
    import { getTheme } from "$lib/module/layout/theme";
    import TierImage from "../me/TierImage.svelte";

    export let rankings: {
        UUID: string;
        currentRating: number;
        donder: {
            nickname: string;
            taikoNumber: number | null;
        };
        tier: {
            tierName: UserRatingTierName;
            detailTierGrade: 1 | 2 | 3 | 5 | 4 | null;
        };
    }[];
    export let page: number;

    const [theme] = getTheme();
</script>

<table>
    <thead>
        <tr>
            <th> 순위 </th>
            <th> 티어 </th>
            <th> 레이팅 </th>
            <th> 닉네임 </th>
        </tr>
    </thead>
    <tbody data-theme={$theme}>
        {#each rankings as ranking, index}
            <tr>
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
                    {ranking.donder.nickname}
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
    }
    td {
        text-align: center;
        min-width: 70px;
        width: min-content;
    }
    td.nickname {
        width: 100%;
    }

    tbody tr:hover{
        background-color: rgb(228, 228, 228);
        cursor: pointer;
    }
    tbody[data-theme="dark"] tr:hover{
        background-color: rgb(53, 53, 53);
    }

    .tier-image{
        display:inline-block;
    }

    .taikoNumber{
        font-size: 12px;
        color:rgb(84, 84, 84);
    }
    tbody[data-theme="dark"] .taikoNumber{
        color: rgb(155, 155, 155);
    }
</style>
