<script lang="ts">
    import type { Dani } from "$lib/module/dani";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { DIFFICULTY } from "$lib/module/common/song/const";

    interface Props {
        songs: Dani.Song[];
    }

    let { songs = $bindable() }: Props = $props();

    const lang = getLang();
    let diffI18n = $derived(getI18N("other", $lang).difficulty);
</script>

<tr>
    <td> 곡 </td>
    <td>
        {#each songs as song}
            <div>
                <input type="text" bind:value={song.songNo} />
                <select bind:value={song.difficulty}>
                    {#each DIFFICULTY as difficulty}
                        <option value={difficulty}>
                            {diffI18n[difficulty]}
                        </option>
                    {/each}
                </select>
            </div>
        {/each}
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
