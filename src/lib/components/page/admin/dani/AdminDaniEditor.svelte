<script lang="ts">
    import type { Dani } from "$lib/module/common/dani/types";
    import AdminDaniEditorDan from "./AdminDaniEditor-Dan.svelte";
    import AdminDaniEditorName from "./AdminDaniEditor-Name.svelte";
    import AdminDaniEditorSong from "./AdminDaniEditor-Song.svelte";
    import AdminDaniEditorCondition from "./AdminDaniEditor-Conditions.svelte";
    import type { MouseEventHandler } from "svelte/elements";
    import AdminDaniEditorQr from "./AdminDaniEditor-Qr.svelte";

    interface Props {
        daniData: Dani;
        deleteDani: MouseEventHandler<any>;
    }

    let { daniData = $bindable(), deleteDani }: Props = $props();

    function changeDan(dan: Dani["dan"]) {
        daniData.dan = dan;
    }
    function init(dan: Dani["dan"]) {
        daniData.dan = dan;
        if (daniData.dan === "gaiden") {
            daniData.name = {
                ja: daniData?.name?.ja ?? "",
                ko: daniData?.name?.ko ?? "",
            };
            daniData.qr = "";
        } else {
            daniData.name = null;
            //@ts-expect-error
            if (typeof daniData.qr === "string") {
                //@ts-expect-error
                delete daniData.qr;
            }
        }
    }
</script>

<table>
    <tbody>
        <AdminDaniEditorDan dan={daniData.dan} {changeDan} {init} />
        {#if daniData.dan === "gaiden"}
            <AdminDaniEditorName bind:name={daniData.name} />
            {#if typeof daniData.qr === "string"}
                <AdminDaniEditorQr bind:qr={daniData.qr} />
            {/if}
        {/if}
        <AdminDaniEditorSong bind:songs={daniData.songs} />
        <AdminDaniEditorCondition bind:conditions={daniData.conditions} />
        <tr>
            <td>
                <button onclick={deleteDani}> 삭제 </button>
            </td>
        </tr>
    </tbody>
</table>

<style>
    table {
        border-collapse: collapse;
        border: 3px solid black;
    }

    td {
        text-align: center;
    }
</style>
