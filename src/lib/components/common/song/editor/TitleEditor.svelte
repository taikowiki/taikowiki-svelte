<script lang="ts">
    import TitledContainer from "$lib/components/common/TitledContainer.svelte";
    import { getI18N, getLang } from "$lib/module/i18n";

    interface Props {
        titleRecord: {
            title: string;
            titleKo: string | null;
            aliasKo: string | null;
            titleEn: string | null;
            aliasEn: string | null;
            titleZhCN: string | null;
            romaji: string | null;
        };
        compare?: any;
    }

    let { titleRecord = $bindable(), compare }: Props = $props();

    let checked = $state(checkedInit());
    $effect.pre(() => {
        for (const k in checked) {
            const key = k as keyof Props["titleRecord"];
            if (key === "title") continue;
            if (checked[key]) {
                titleRecord[key] = titleRecord[key] || "";
            } else {
                titleRecord[key] = null;
            }
        }
    });

    const lang = getLang();
    let i18n = $derived(getI18N($lang).component.SongEditor.TitleEditor);

    function checkedInit() {
        const record: Record<string, boolean> = {};
        for (const key in $state.snapshot(titleRecord)) {
            record[key] =
                titleRecord[key as keyof Props["titleRecord"]] !== null;
        }
        return record as Record<keyof Props["titleRecord"], boolean>;
    }
</script>

<TitledContainer title={i18n.title} color="#cf4844">
    <table>
        <tbody>
            <tr class:different={compare?.title === true}>
                <td> {i18n.songTitle} </td>
                <td class="title">
                    <input type="text" bind:value={titleRecord.title} />
                </td>
            </tr>
            <tr class:different={compare?.titleKo === true}>
                <td> {i18n.titleKo} </td>
                <td>
                    <input type="checkbox" bind:checked={checked.titleKo} />
                    <input
                        type="text"
                        bind:value={titleRecord.titleKo}
                        disabled={titleRecord.titleKo === null}
                    />
                </td>
            </tr>
            <tr class:different={compare?.aliasKo === true}>
                <td> {i18n.aliasKo} </td>
                <td>
                    <input type="checkbox" bind:checked={checked.aliasKo} />
                    <input
                        type="text"
                        bind:value={titleRecord.aliasKo}
                        disabled={titleRecord.aliasKo === null}
                    />
                </td>
            </tr>
            <tr class:different={compare?.titleEn === true}>
                <td> {i18n.titleEn} </td>
                <td>
                    <input type="checkbox" bind:checked={checked.titleEn} />
                    <input
                        type="text"
                        bind:value={titleRecord.titleEn}
                        disabled={titleRecord.titleEn === null}
                    />
                </td>
            </tr>
            <tr class:different={compare?.aliasEn === true}>
                <td> {i18n.aliasEn} </td>
                <td>
                    <input type="checkbox" bind:checked={checked.aliasEn} />
                    <input
                        type="text"
                        bind:value={titleRecord.aliasEn}
                        disabled={titleRecord.aliasEn === null}
                    />
                </td>
            </tr>
            <tr class:different={compare?.titleZhCN === true}>
                <td> {i18n.titleZhCN}</td>
                <td>
                    <input type="checkbox" bind:checked={checked.titleZhCN} />
                    <input
                        type="text"
                        bind:value={titleRecord.titleZhCN}
                        disabled={titleRecord.titleZhCN === null}
                    />
                </td>
            </tr>
            <tr class:different={compare?.romaji === true}>
                <td> {i18n.romaji} </td>
                <td>
                    <input type="checkbox" bind:checked={checked.romaji} />
                    <input
                        type="text"
                        bind:value={titleRecord.romaji}
                        disabled={titleRecord.romaji === null}
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
        padding-left: 21px;
    }

    input[type="text"] {
        flex: 1 0 auto;

        height: 20px;
        font-size: 17px;
    }

    .different {
        background-color: #ff9999;
    }
</style>
