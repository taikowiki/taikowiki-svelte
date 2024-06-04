<script lang="ts">
    import DaniDisplay from "$lib/components/page/dani/DaniDisplay.svelte";
    import type { Dani } from "$lib/module/common/dani/types";

    export let data;

    const danis: Dani[] = [
        {
            dan: "5kyu",
            name: null,
            version: "24",
            songs: [
                {
                    songNo: "1228",
                    difficulty: "normal",
                },
                {
                    songNo: "1209",
                    difficulty: "normal",
                },
                {
                    songNo: "1218",
                    difficulty: "hard",
                },
            ],
            conditions: [
                {
                    type: "gauge",
                    criteria: {
                        red: [92],
                        gold: [],
                    },
                },
                {
                    type: "hit",
                    criteria: {
                        red: [724],
                        gold: [748],
                    },
                },
            ],
        },
        {
            dan: "4kyu",
            name: null,
            version: "24",
            songs: [
                {
                    songNo: "1234",
                    difficulty: "normal",
                },
                {
                    songNo: "97",
                    difficulty: "normal",
                },
                {
                    songNo: "1194",
                    difficulty: "hard",
                },
            ],
            conditions: [
                {
                    type: "gauge",
                    criteria: {
                        red: [94],
                        gold: [],
                    },
                },
                {
                    type: "hit",
                    criteria: {
                        red: [1122],
                        gold: [],
                    },
                },
                {
                    type: "bad",
                    criteria: {
                        red: [112],
                        gold: [],
                    },
                },
            ],
        },
        {
            dan: "3kyu",
            name: null,
            version: "24",
            songs: [
                {
                    songNo: "981",
                    difficulty: "hard",
                },
                {
                    songNo: "1217",
                    difficulty: "hard",
                },
                {
                    songNo: "1141",
                    difficulty: "hard",
                },
            ],
            conditions: [
                {
                    type: "gauge",
                    criteria: {
                        red: [96],
                        gold: [],
                    },
                },
                {
                    type: "hit",
                    criteria: {
                        red: [1247],
                        gold: [],
                    },
                },
                {
                    type: "bad",
                    criteria: {
                        red: [96],
                        gold: [],
                    },
                },
            ],
        },
        {
            dan: "2kyu",
            name: null,
            version: "24",
            songs: [
                {
                    songNo: "1242",
                    difficulty: "hard",
                },
                {
                    songNo: "1211",
                    difficulty: "hard",
                },
                {
                    songNo: "1144",
                    difficulty: "oni",
                },
            ],
            conditions: [
                {
                    type: "gauge",
                    criteria: {
                        red: [97],
                        gold: [],
                    },
                },
                {
                    type: "hit",
                    criteria: {
                        red: [1512],
                        gold: [],
                    },
                },
                {
                    type: "bad",
                    criteria: {
                        red: [91],
                        gold: [],
                    },
                },
            ],
        },
        {
            dan: "1kyu",
            name: null,
            version: "24",
            songs: [
                {
                    songNo: "1231",
                    difficulty: "hard",
                },
                {
                    songNo: "882",
                    difficulty: "oni",
                },
                {
                    songNo: "39",
                    difficulty: "hard",
                },
            ],
            conditions: [
                {
                    type: "gauge",
                    criteria: {
                        red: [98],
                        gold: [],
                    },
                },
                {
                    type: "hit",
                    criteria: {
                        red: [1589],
                        gold: [],
                    },
                },
                {
                    type: "bad",
                    criteria: {
                        red: [59],
                        gold: [],
                    },
                },
            ],
        },
        {
            dan: "1dan",
            name: null,
            version: "24",
            songs: [
                {
                    songNo: "318",
                    difficulty: "oni",
                },
                {
                    songNo: "613",
                    difficulty: "oni",
                },
                {
                    songNo: "741",
                    difficulty: "oni",
                },
            ],
            conditions: [
                {
                    type: "gauge",
                    criteria: {
                        red: [98],
                        gold: [],
                    },
                },
                {
                    type: "good",
                    criteria: {
                        red: [866],
                        gold: [917],
                    },
                },
                {
                    type: "bad",
                    criteria: {
                        red: [28],
                        gold: [],
                    },
                },
                {
                    type: "roll",
                    criteria: {
                        red: [293],
                        gold: [327],
                    },
                },
            ],
        },
        {
            dan: "2dan",
            name: null,
            version: "24",
            songs: [
                {
                    songNo: "1230",
                    difficulty: "oni",
                },
                {
                    songNo: "469",
                    difficulty: "oni",
                },
                {
                    songNo: "107",
                    difficulty: "oni",
                },
            ],
            conditions: [
                {
                    type: "gauge",
                    criteria: {
                        red: [98],
                        gold: [],
                    },
                },
                {
                    type: "good",
                    criteria: {
                        red: [965],
                        gold: [1017],
                    },
                },
                {
                    type: "bad",
                    criteria: {
                        red: [26],
                        gold: [],
                    },
                },
                {
                    type: "roll",
                    criteria: {
                        red: [210],
                        gold: [235],
                    },
                },
            ],
        },
        {
            dan: "3dan",
            name: null,
            version: "24",
            songs: [
                {
                    songNo: "1033",
                    difficulty: "oni",
                },
                {
                    songNo: "149",
                    difficulty: "oni",
                },
                {
                    songNo: "1019",
                    difficulty: "oni",
                },
            ],
            conditions: [
                {
                    type: "gauge",
                    criteria: {
                        red: [99],
                        gold: [],
                    },
                },
                {
                    type: "good",
                    criteria: {
                        red: [1086],
                        gold: [1138],
                    },
                },
                {
                    type: "bad",
                    criteria: {
                        red: [24],
                        gold: [],
                    },
                },
                {
                    type: "roll",
                    criteria: {
                        red: [344],
                        gold: [386],
                    },
                },
            ],
        },
        {
            dan: "4dan",
            name: null,
            version: "24",
            songs: [
                {
                    songNo: "703",
                    difficulty: "oni",
                },
                {
                    songNo: "652",
                    difficulty: "ura",
                },
                {
                    songNo: "266",
                    difficulty: "oni",
                },
            ],
            conditions: [
                {
                    type: "gauge",
                    criteria: {
                        red: [99],
                        gold: [],
                    },
                },
                {
                    type: "good",
                    criteria: {
                        red: [1484],
                        gold: [1548],
                    },
                },
                {
                    type: "bad",
                    criteria: {
                        red: [28],
                        gold: [],
                    },
                },
                {
                    type: "roll",
                    criteria: {
                        red: [143],
                        gold: [161],
                    },
                },
            ],
        },
        {
            dan: "5dan",
            name: null,
            version: "24",
            songs: [
                {
                    songNo: "626",
                    difficulty: "oni",
                },
                {
                    songNo: "459",
                    difficulty: "oni",
                },
                {
                    songNo: "108",
                    difficulty: "oni",
                },
            ],
            conditions: [
                {
                    type: "gauge",
                    criteria: {
                        red: [99],
                        gold: [],
                    },
                },
                {
                    type: "good",
                    criteria: {
                        red: [1708],
                        gold: [1771],
                    },
                },
                {
                    type: "bad",
                    criteria: {
                        red: [26],
                        gold: [],
                    },
                },
                {
                    type: "roll",
                    criteria: {
                        red: [117],
                        gold: [132],
                    },
                },
            ],
        },
        {
            dan: "6dan",
            name: null,
            version: "24",
            songs: [
                {
                    songNo: "95",
                    difficulty: "oni",
                },
                {
                    songNo: "1082",
                    difficulty: "ura",
                },
                {
                    songNo: "970",
                    difficulty: "oni",
                },
            ],
            conditions: [
                {
                    type: "gauge",
                    criteria: {
                        red: [100],
                        gold: [100],
                    },
                },
                {
                    type: "good",
                    criteria: {
                        red: [1613],
                        gold: [1664],
                    },
                },
                {
                    type: "bad",
                    criteria: {
                        red: [18],
                        gold: [],
                    },
                },
                {
                    type: "roll",
                    criteria: {
                        red: [21, 62, 158],
                        gold: [25, 74, 185],
                    },
                },
            ],
        },
        {
            dan: "7dan",
            name: null,
            version: "24",
            songs: [
                {
                    songNo: "356",
                    difficulty: "oni",
                },
                {
                    songNo: "944",
                    difficulty: "oni",
                },
                {
                    songNo: "1069",
                    difficulty: "oni",
                },
            ],
            conditions: [
                {
                    type: "gauge",
                    criteria: {
                        red: [100],
                        gold: [100],
                    },
                },
                {
                    type: "good",
                    criteria: {
                        red: [1720, 1765],
                        gold: [],
                    },
                },
                {
                    type: "bad",
                    criteria: {
                        red: [15],
                        gold: [],
                    },
                },
                {
                    type: "roll",
                    criteria: {
                        red: [81, 90, 257],
                        gold: [88, 105, 293],
                    },
                },
            ],
        },
        {
            dan: "8dan",
            name: null,
            version: "24",
            songs: [
                {
                    songNo: "588",
                    difficulty: "oni",
                },
                {
                    songNo: "31",
                    difficulty: "oni",
                },
                {
                    songNo: "418",
                    difficulty: "oni",
                },
            ],
            conditions: [
                {
                    type: "gauge",
                    criteria: {
                        red: [100],
                        gold: [100],
                    },
                },
                {
                    type: "good",
                    criteria: {
                        red: [2051],
                        gold: [2094],
                    },
                },
                {
                    type: "bad",
                    criteria: {
                        red: [13],
                        gold: [],
                    },
                },
                {
                    type: "roll",
                    criteria: {
                        red: [149, 68, 150],
                        gold: [174, 72, 180],
                    },
                },
            ],
        },
        {
            dan: "9dan",
            name: null,
            version: "24",
            songs: [
                {
                    songNo: "572",
                    difficulty: "oni",
                },
                {
                    songNo: "1067",
                    difficulty: "ura",
                },
                {
                    songNo: "938",
                    difficulty: "ura",
                },
            ],
            conditions: [
                {
                    type: "gauge",
                    criteria: {
                        red: [100],
                        gold: [100],
                    },
                },
                {
                    type: "good",
                    criteria: {
                        red: [2067],
                        gold: [2099],
                    },
                },
                {
                    type: "bad",
                    criteria: {
                        red: [8],
                        gold: [],
                    },
                },
                {
                    type: "roll",
                    criteria: {
                        red: [45, 32, 200],
                        gold: [52, 35, 240],
                    },
                },
            ],
        },
        {
            dan: "10dan",
            name: null,
            version: "24",
            songs: [
                {
                    songNo: "499",
                    difficulty: "oni",
                },
                {
                    songNo: "994",
                    difficulty: "oni",
                },
                {
                    songNo: "1308",
                    difficulty: "ura",
                },
            ],
            conditions: [
                {
                    type: "gauge",
                    criteria: {
                        red: [100],
                        gold: [100],
                    },
                },
                {
                    type: "ok",
                    criteria: {
                        red: [75],
                        gold: [50],
                    },
                },
                {
                    type: "bad",
                    criteria: {
                        red: [8],
                        gold: [4],
                    },
                },
                {
                    type: "roll",
                    criteria: {
                        red: [174, 64, 56],
                        gold: [208, 69, 62],
                    },
                },
            ],
        },
    ];
</script>

<div class="container">
    {#each danis as dani}
        <DaniDisplay {dani} songDatas={data.songs} />
    {/each}
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;

        row-gap: 20px;
    }

    @media only screen and (max-width: 1000px) {
        .container {
            flex-direction: column;
            justify-content: center;
        }
    }
</style>
