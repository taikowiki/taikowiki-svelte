<script lang="ts">
    import DaniDisplay from "$lib/components/page/dani/DaniDisplay.svelte";
    import type { Dani } from "$lib/module/common/dani/types";

    export let data;

    const dani:Dani = {
        dan: "tatsujin",
        name: null,
        version: "23",
        songs: [
            {
                songNo: "116",
                difficulty: "ura",
            },
            {
                songNo: "1016",
                difficulty: "normal",
            },
            {
                songNo: "84",
                difficulty: "normal",
            },
        ],
        conditions: [
            {
                isIndividualCondition: false,
                type: "gauge",
                criteria:{
                    red: [933, 112, 331],
                    gold: []
                }
            },
            {
                isIndividualCondition: false,
                type: "hit",
                criteria:{
                    red: [852],
                    gold: [902]
                }
            }
        ]
    };
</script>

<div class="container">
    <DaniDisplay {dani} songDatas={data.songs}/>
    <DaniDisplay {dani} songDatas={data.songs}/>
    <DaniDisplay {dani} songDatas={data.songs}/>
    <DaniDisplay {dani} songDatas={data.songs}/>
    <DaniDisplay {dani} songDatas={data.songs}/>
</div>

<style>
    .container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;

        row-gap: 20px;
    }

    @media only screen and (max-width:1000px){
        .container{
            flex-direction: column;
            justify-content: center;
        }
    }
</style>