<script lang="ts">
    import type { Dani } from "$lib/module/common/dani/types";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { DAN } from "$lib/module/common/song/const";

    interface Props {
        dan: Dani["dan"];
        changeDan: (dan: Dani["dan"]) => void;
        init: (dan: Dani["dan"]) => void;
    }

    let {dan, init, changeDan}: Props = $props();
    init(dan);

    let danValue = $state(dan);
    
    function danChangeHandler(){
        let isDanGaiden = dan === "gaiden";
        let isDanValueGaiden = danValue === "gaiden";

        if(isDanGaiden != isDanValueGaiden){
            init(danValue);
        }
        else{
            changeDan(danValue);
        }
    }

    const lang = getLang();
    let daniI18n = $derived(getI18N("other", $lang).dani);
</script>

<tr>
    <td> 단 </td>
    <td>
        <select bind:value={danValue} onchange={danChangeHandler}>
            {#each DAN as dan}
                <option value={dan}>
                    {daniI18n.dan[dan]}
                </option>
            {/each}
        </select>
    </td>
</tr>

<style>
    td {
        border: 1px solid black;
    }

    td:nth-child(1) {
        width: 100px;
        text-align: center;
    }
</style>
