<script lang="ts">
    import type { Dani } from "$lib/module/common/dani/types";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { DAN } from "$lib/module/common/song/const";

    export let dan: Dani['dan'];
    export let gaidenInit: (dan: Dani['dan']) => void;

    let danValue = dan;
    $: gaidenInit(danValue);

    const lang = getLang();
    $: daniI18n = getI18N("other", $lang).dani;
</script>

<tr>
    <td> 단 </td>
    <td>
        <select bind:value={danValue}>
            {#each DAN as dan}
                <option value={dan}>
                    {daniI18n.dan[dan]}
                </option>
            {/each}
        </select>
    </td>
</tr>

<style>
    td{
        border: 1px solid black;
    }

    td:nth-child(1){
        width: 100px;
        text-align: center;
    }
</style>