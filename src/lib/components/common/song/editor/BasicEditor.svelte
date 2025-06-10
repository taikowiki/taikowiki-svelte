<script lang="ts">
    import TitledContainer from "$lib/components/common/TitledContainer.svelte";
    import { getI18N, getLang } from "$lib/module/i18n";

    interface Props {
        songNo: string;
        type: "edit" | "new";
        isAdmin?: boolean;
    }

    let { songNo = $bindable(), type = "new", isAdmin }: Props = $props();

    const lang = getLang();
    let i18n = $derived(getI18N($lang).component.SongEditor.BasicEditor)
</script>

<TitledContainer title={i18n.songNo} color="#cf4844">
    <table>
        <tbody>
            <tr>
                <td> {i18n.songNo} </td>
                <td class="title">
                    <input
                        type="text"
                        bind:value={songNo}
                        disabled={type === "edit" && !isAdmin}
                    />
                </td>
            </tr>
        </tbody>
    </table>
</TitledContainer>

<style>
    table {
        width: 100%;
    }

    td:nth-child(1) {
        width: 150px;
        font-weight: bold;
    }
    td:nth-child(2) {
        display: flex;
        align-items: center;
    }

    .title {
        box-sizing: border-box;
    }

    input[type="text"] {
        height: 20px;
        font-size: 17px;
    }
</style>
