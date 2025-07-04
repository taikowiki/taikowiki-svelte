<script lang="ts">
    import TitledContainer from "$lib/components/common/TitledContainer.svelte";
    import { Song } from "$lib/module/song";
    import { getI18N, getLang } from "$lib/module/i18n";
    
    const { GENRE, VERSION } = Song.CONST;

    interface Props {
        bpm: Song.SongData["bpm"];
        bpmShiver: 1 | 0;
        version: Song.Version[];
        genre: Song.Genre[];
        artists: string[];
        isAsiaBanned: 1 | 0;
        isKrBanned: 1 | 0;
        isDeleted: 1 | 0;
        addedDate: number | null;
        compare: any;
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
        compare,
    }: Props = $props();

    $effect.pre(() => {
        if (genre.length > 3) {
            genre = genre.slice(genre.length - 3, genre.length);
        }
    });

    let artistsString = $state(artists.join(", "));
    $effect.pre(() => {
        artists = artistsString
            .split(",")
            .map((e) => e.trim().replaceAll("\n", ""));
    });

    let addedDATE = $state(new Date(addedDate || Date.now()).toISOString().slice(0, 10));
    $effect.pre(() => {
        if (addedDate !== null) {
            addedDate = new Date(addedDATE).getTime();
        }
    });

    const lang = getLang();
    let i18n = $derived(getI18N("/song/add", $lang));
</script>

<TitledContainer title="기타" color="#cf4844">
    <table>
        <tbody>
            <tr class:different={compare?.genre === true}>
                <td> 장르 </td>
                <td>
                    <div class="genre">
                        {#each GENRE as gen}
                            <label>
                                <input
                                    type="checkbox"
                                    value={gen}
                                    bind:group={genre}
                                />
                                {i18n.genres[gen]}
                            </label>
                        {/each}
                    </div>
                </td>
            </tr>
            <tr
                class:different={compare?.bpm === true ||
                    compare?.bpmShiver === true}
            >
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
                            BPM 흔들림
                        </div>
                        <div>
                            <input type="number" bind:value={bpm.min} />
                            ~
                            <input type="number" bind:value={bpm.max} />
                        </div>
                    </div>
                </td>
            </tr>
            <tr class:different={compare?.version === true}>
                <td>
                    <div>수록 버전</div>
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
            <tr class:different={compare?.artists === true}>
                <td>
                    <div>아티스트</div>
                    <div class="sub">쉼표로 구분하여 작성해주세요.</div>
                </td>
                <td>
                    <textarea bind:value={artistsString}></textarea>
                </td>
            </tr>
            <tr
                class:different={compare?.isDeleted === true ||
                    compare?.isKrBanned === true ||
                    compare?.isAsiaBanned === true}
            >
                <td>
                    <div>수록 여부</div>
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
                            삭제
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
                            아시아판 밴
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
                            한국판 밴
                        </label>
                    </div>
                </td>
            </tr>
            <tr class:different={compare?.addedDate === true}>
                <td> <div>추가 날짜</div> </td>
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
                            사용
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

    .different {
        background-color: #ff9999;
    }
</style>
