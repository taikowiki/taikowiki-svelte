<script lang="ts">
    import type { Dani } from "$lib/module/common/dani/types";
    import AdminDaniEditorDan from "./AdminDaniEditor-Dan.svelte";
    import AdminDaniEditorName from "./AdminDaniEditor-Name.svelte";
    import AdminDaniEditorSong from "./AdminDaniEditor-Song.svelte";
    import AdminDaniEditorCondition from "./AdminDaniEditor-Conditions.svelte";
    import type { MouseEventHandler } from "svelte/elements";
    import AdminDaniEditorQr from "./AdminDaniEditor-Qr.svelte";

    export let daniData: Dani;
    export let deleteDani: MouseEventHandler<any>;

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
    {#if daniData.dan === "gaiden"}
        <AdminDaniEditorName bind:name={daniData.name} />
        <AdminDaniEditorQr bind:qr={daniData.qr}/>
    {/if}
    <AdminDaniEditorSong bind:songs={daniData.songs} />
    <AdminDaniEditorCondition bind:conditions={daniData.conditions}/>
    <tr>
        <td>
            <button on:click={deleteDani}>
                삭제
            </button>
        </td>
    </tr>
</table>

<style>
    table{
        border-collapse: collapse;
        border: 3px solid black;
    }

    td{
        text-align: center;
    }
</style>