<script lang="ts" context="module">
    function parseSongScoreJSON(json: string): SongScore[] | null {
        try {
            let result = JSON.parse(json);
            if (Array.isArray(result)) {
                return result;
            }
            return null;
        } catch (err) {
            if (browser) {
                console.log(err);
            }
            return null;
        }
    }

    function parseSongScoreDonderData(data: UserDonderData): SongScore[] | null{
        const result : SongScore[] = [];
        try {
            for(let scoreData of data.clearData) {
                const details : Partial<Record<DifficultyType, SongScoreDetail>> = parseDetail(scoreData.difficulty);
                const score : SongScore = {
                    title : scoreData.title,
                    songNo : scoreData.songNo,
                    details : details,
                };
                result.push(score);
            }
            return result;
        } catch (err) {
            if (browser) {
                console.log(err);
            }
            return null;
        }
    }

    function parseDetail(data: Partial<Record<Difficulty, Clear>>) : Partial<Record<DifficultyType, SongScoreDetail>> {
        const result : Partial<Record<DifficultyType, SongScoreDetail>> = {}; 
        
        if(data.ura !== null && data.ura !== undefined) {
            result.oni_ura = {
                crown: crowntoCrownType(data.ura.crown),
                badge: badgetoBadgeType(data.ura.badge),
            }
        }

        if(data.oni !== null && data.oni !== undefined) {
            result.oni = {
                crown: crowntoCrownType(data.oni.crown),
                badge: badgetoBadgeType(data.oni.badge),
            }
        }

        return result;
    }

    function crowntoCrownType (crown : string | null) : CrownType  {
        switch (crown) {
            case 'silver' : 
                return "silver";
            case 'gold' :
                return "gold";
            case 'donderfull' :
                return "donderfull";
        }

        return "none";
    }

    function badgetoBadgeType (badge : string | null) : BadgeType  {
        switch (badge) {
            case 'rainbow' : 
                return 8;
            case 'purple' :
                return 7;
            case 'pink' :
                return 6;
            case 'gold' :
                return 5;
            case 'silver' :
                return 4;
            case 'bronze' :
                return 3;
            case 'white' :
                return 2;
        }
        
        return 0;
    }
</script>

<script lang="ts">
    import type {
        BadgeType,
        CrownType,
        DiffChart,
        DifficultyType,
        SongScore,
        SongScoreDetail,
    } from "$lib/module/common/diffchart/types";
    import DiffchartName from "./DiffchartName.svelte";
    import DiffchartSection from "./DiffchartSection.svelte";
    import { afterUpdate } from "svelte";
    import { getTheme } from "$lib/module/layout/theme";
    import { browser } from "$app/environment";
    import html2canvas from "html2canvas";
    import type { SongDataPickedForDiffchart } from "$lib/module/common/diffchart/types";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import type { UserDonderData } from "$lib/module/common/user/types";
    import type { Clear, Difficulty } from "node-hiroba/types";

    export let diffChart: DiffChart;
    export let songs: SongDataPickedForDiffchart[];
    export let donderData: UserDonderData | null;
    export let color: string | undefined = diffChart.color;
    export let backgroundColor: string | undefined = diffChart.backgroundColor;
    export let downloadImage: (() => Promise<void>) | null = null;

    const [theme] = getTheme();

    let replica: HTMLDivElement;
    afterUpdate(async () => {
        if (!browser) {
            return;
        }
        downloadImage = async () => {
            (async () => {
                const canvas = await html2canvas(replica);
                const url = canvas.toDataURL();
                const a = document.createElement("a");
                a.setAttribute("download", `${i18n.diffchart}.png`);
                a.href = url;
                a.click();
                a.remove();
                canvas.remove();
            })();
            alert(i18n.downloadMessage);
        };
    });

    let userScoreDataJSON: string = ''; // 확장 프로그램
    let userScoreDataServer: UserDonderData | null = donderData; // 서버 프로그램
    $: userScoreData = (userScoreDataServer !== null) ? parseSongScoreDonderData(userScoreDataServer) : parseSongScoreJSON(userScoreDataJSON);

    const lang = getLang();
    $: i18n = getI18N('component', $lang).Diffchart;
</script>

<input
    type="text"
    on:change={(event) => {
        userScoreDataJSON = event.currentTarget.value;
    }}
    id="scoredata_input"
    style="display:none;"
/>
<div class="container">
    <DiffchartName name={diffChart.name} {color} {backgroundColor} />
    {#each diffChart.sections.toSorted((a, b) => a.order - b.order) as section}
        <DiffchartSection {section} {songs} theme={$theme} {userScoreData} />
    {/each}
</div>

<div class="replica" bind:this={replica}>
    <DiffchartName name={diffChart.name} {color} {backgroundColor} />
    {#each diffChart.sections.toSorted((a, b) => a.order - b.order) as section}
        <DiffchartSection
            {section}
            {songs}
            theme={"light"}
            useMobile={false}
            {userScoreData}
        />
    {/each}
</div>

<style>
    .container {
        width: 100%;

        display: flex;
        flex-direction: column;
    }

    .replica {
        width: 1200px;
        position: absolute;

        background-color: white;

        top: 0;
        left: 0;

        transform: translateX(-100%);
    }
</style>
