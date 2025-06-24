<script lang="ts">
    import { getI18N, getLang } from "$lib/module/i18n";
    import { Song } from "$lib/module/song";

    const { DAN, DANIVERSION } = Song.CONST;

    interface Props {
        dani: Song.Dani;
    }

    let { dani = $bindable() }: Props = $props();

    const lang = getLang();
    let daniI18n = $derived(getI18N("other", $lang).dani);
    let i18n = $derived(getI18N($lang).component.SongEditor.DaniEditor);
</script>

<div class="container">
    <select bind:value={dani.version}>
        {#each DANIVERSION as daniVersion}
            <option value={daniVersion}>
                {daniI18n.version[daniVersion]}
            </option>
        {/each}
    </select>
    <select bind:value={dani.dan}>
        {#each DAN as dan}
            <option value={dan}>
                {daniI18n.dan[dan]}
            </option>
        {/each}
    </select>
    <select bind:value={dani.order}>
        <option value={1}>{i18n.first}</option>
        <option value={2}>{i18n.second}</option>
        <option value={3}>{i18n.third}</option>
    </select>
</div>

<style>
    .container {
        display: flex;
    }
</style>
