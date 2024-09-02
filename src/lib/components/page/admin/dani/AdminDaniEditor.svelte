<script lang="ts">
    import type { Dani } from "$lib/module/common/dani/types";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { DAN, DIFFICULTY } from "$lib/module/common/song/const";
    import AdminDaniEditorDan from "./AdminDaniEditor-Dan.svelte";
    import AdminDaniEditorName from "./AdminDaniEditor-Name.svelte";
    import AdminDaniEditorSong from "./AdminDaniEditor-Song.svelte";
    import AdminDaniEditorCondition from "./AdminDaniEditor-Conditions.svelte";

    export let daniData: Dani;

    function setDaniName() {
        if (daniData.dan === "gaiden") {
            daniData.name = {
                ja: "",
                ko: "",
            };
        } else {
            daniData.name = null;
        }
    }
</script>

<table>
    <AdminDaniEditorDan bind:dan={daniData.dan} {setDaniName} />
    {#if daniData.name}
        <AdminDaniEditorName bind:name={daniData.name} />
    {/if}
    <AdminDaniEditorSong bind:songs={daniData.songs} />
    <AdminDaniEditorCondition bind:conditions={daniData.conditions}/>
</table>

<style>
    table{
        border-collapse: collapse;
        border: 3px solid black;
    }
</style>