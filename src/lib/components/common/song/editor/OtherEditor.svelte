<script lang="ts">
    import type {
        Genre,
        SongData,
        Version,
    } from "$lib/module/common/song/types";
    import TitledContainer from "$lib/components/common/TitledContainer.svelte";
    import { GENRE, VERSION } from "$lib/module/common/song/const";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";

    interface Props {
        bpm: SongData["bpm"];
        bpmShiver: 1 | 0;
        version: Version[];
        genre: Genre[];
        artists: string[];
        isAsiaBanned: 1 | 0;
        isKrBanned: 1 | 0;
        isDeleted: 1 | 0;
        addedDate: number | null;
    }

    let {
        bpm = $bindable(),
        bpmShiver = $bindable(),
        version = $bindable(),
        genre = $bindable(),
        artists = $bindable(),
        isAsiaBanned = $bindable(),
        isKrBanned = $bindable(),
        isDeleted = $bindable(),
        addedDate = $bindable(),
    }: Props = $props();

    $effect.pre(() => {
        if (genre.length > 3) {
            genre = genre.slice(genre.length - 3, genre.length);
        }
    });

    let artistsString = $state(artists.join(", "));
    $effect.pre(() => {
        artists = artistsString.split(",").map((e) => e.trim().replaceAll("\n", ""));
    });

    let addedDATE = $state(
        new Date(addedDate || Date.now()).toISOString().slice(0, 10),
    );
    $effect.pre(() => {
        if (addedDate !== null) {
            addedDate = new Date(addedDATE).getTime();
        }
    });

    const lang = getLang();
    let genreI18n = $derived(getI18N("/song/add", $lang).genres);
    let i18n = $derived(getI18N($lang).component.SongEditor.OtherEditor);
</script>

<TitledContainer title={i18n.other} color="#cf4844">
    <table>
        <tbody>
            <tr>
                <td> {i18n.genre} </td>
                <td>
                    <div class="genre">
                        {#each GENRE as gen}
                            <label>
                                <input
                                    type="checkbox"
                                    value={gen}
                                    bind:group={genre}
                                />
                                {genreI18n[gen]}
                            </label>
                        {/each}
                    </div>
                </td>
            </tr>
            <tr>
                <td> BPM </td>
                <td>
                    <div>
                        <input
                            type="checkbox"
                            onchange={({ currentTarget }) => {
                                if (currentTarget.checked) {
                                    bpmShiver = 1;
                                } else {
                                    bpmShiver = 0;
                                }
                            }}
                            checked={Boolean(bpmShiver)}
                        />
                        <div style="margin-right: 10px; font-size:13px">
                            {i18n.bpmShiver}
                        </div>
                        <div>
                            <input type="number" bind:value={bpm.min} />
                            ~
                            <input type="number" bind:value={bpm.max} />
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div>{i18n.versoin}</div>
                </td>
                <td>
                    <div class="version">
                        {#each VERSION as versionGroup}
                            <div class="group">
                                {#each versionGroup as ver}
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={ver}
                                            bind:group={version}
                                        />
                                        {ver}
                                    </label>
                                {/each}
                            </div>
                        {/each}
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div>{i18n.artist}</div>
                    <div class="sub">{i18n.commaPlz}</div>
                </td>
                <td>
                    <textarea bind:value={artistsString}></textarea>
                </td>
            </tr>
            <tr>
                <td>
                    <div>{i18n.included}</div>
                </td>
                <td>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                onchange={({ currentTarget }) => {
                                    if (currentTarget.checked) {
                                        isDeleted = 1;
                                    } else {
                                        isDeleted = 0;
                                    }
                                }}
                                checked={Boolean(isDeleted)}
                            />
                            {i18n.deleted}
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onchange={({ currentTarget }) => {
                                    if (currentTarget.checked) {
                                        isAsiaBanned = 1;
                                    } else {
                                        isAsiaBanned = 0;
                                    }
                                }}
                                checked={Boolean(isAsiaBanned)}
                            />
                            {i18n.asiaBanned}
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onchange={({ currentTarget }) => {
                                    if (currentTarget.checked) {
                                        isKrBanned = 1;
                                    } else {
                                        isKrBanned = 0;
                                    }
                                }}
                                checked={Boolean(isKrBanned)}
                            />
                            {i18n.krBanned}
                        </label>
                    </div>
                </td>
            </tr>
            <tr>
                <td> <div>{i18n.addedDate}</div> </td>
                <td>
                    <div>
                        <input
                            type="checkbox"
                            onchange={({ currentTarget }) => {
                                if (currentTarget.checked) {
                                    addedDate = 1;
                                } else {
                                    addedDate = null;
                                }
                            }}
                            checked={addedDate === null ? false : true}
                        />
                        <div style="margin-right: 10px; font-size:13px">
                            {i18n.use}
                        </div>
                        <input
                            type="date"
                            bind:value={addedDATE}
                            disabled={addedDate === null ? true : false}
                        />
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</TitledContainer>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    td {
        padding-top: 5px;
        padding-bottom: 5px;

        border: 1px solid gray;
    }
    td:nth-child(1) {
        width: 150px;
        font-weight: bold;

        padding-inline: 5px;
    }
    td:nth-child(2) > div {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    td:nth-child(2) > div {
        transform: translateY(-1px);
        width: fit-content;
    }

    .sub {
        font-size: 11px;
        color: gray;
    }

    input[type="number"] {
        width: 40px;
    }

    .genre {
        column-gap: 5px;
    }
    .version {
        flex-direction: column;
        align-items: flex-start !important;
        row-gap: 6px;
    }
    label {
        display: block;
    }
    label input {
        margin-right: 0;
    }
    .group {
        display: flex;
        flex-wrap: wrap;
        column-gap: 3px;
    }

    textarea {
        border: 1px solid black;
        width: calc(100% - 5px);
        resize: vertical;
    }
</style>
