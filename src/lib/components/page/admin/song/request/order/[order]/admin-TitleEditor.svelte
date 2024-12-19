<script lang="ts">
    import TitledContainer from "$lib/components/common/TitledContainer.svelte";

    interface Props {
        title: string;
        titleKo: string | null;
        aliasKo: string | null;
        titleEn: string | null;
        aliasEn: string | null;
        romaji: string | null;
        compare: any;
    }

    let {
        title = $bindable(),
        titleKo = $bindable(),
        aliasKo = $bindable(),
        titleEn = $bindable(),
        aliasEn = $bindable(),
        romaji = $bindable(),
        compare,
    }: Props = $props();

    let titleKoChecked = $state(titleKo !== null);
    $effect.pre(() => {
        if (titleKoChecked) {
            titleKo = titleKo || "";
        } else {
            titleKo = null;
        }
    });
    let aliasKoChecked = $state(aliasKo !== null);
    $effect.pre(() => {
        if (aliasKoChecked) {
            aliasKo = aliasKo || "";
        } else {
            aliasKo = null;
        }
    });
    let titleEnChecked = $state(titleEn !== null);
    $effect.pre(() => {
        if (titleEnChecked) {
            titleEn = titleEn || "";
        } else {
            titleEn = null;
        }
    });
    let aliasEnChecked = $state(aliasEn !== null);
    $effect.pre(() => {
        if (aliasEnChecked) {
            aliasEn = aliasEn || "";
        } else {
            aliasEn = null;
        }
    });
    let romajiChecked = $state(romaji !== null);
    $effect.pre(() => {
        if (romajiChecked) {
            romaji = romaji || "";
        } else {
            romaji = null;
        }
    });
</script>

<TitledContainer title="제목" color="#cf4844">
    <table>
        <tbody>
            <tr class:different={compare?.title === true}>
                <td> 곡 제목 </td>
                <td class="title">
                    <input type="text" bind:value={title} />
                </td>
            </tr>
            <tr class:different={compare?.titleKo === true}>
                <td> 한국어 제목 </td>
                <td>
                    <input type="checkbox" bind:checked={titleKoChecked} />
                    <input
                        type="text"
                        bind:value={titleKo}
                        disabled={titleKo === null}
                    />
                </td>
            </tr>
            <tr class:different={compare?.aliasKo === true}>
                <td> 한국어 비공식 </td>
                <td>
                    <input type="checkbox" bind:checked={aliasKoChecked} />
                    <input
                        type="text"
                        bind:value={aliasKo}
                        disabled={aliasKo === null}
                    />
                </td>
            </tr>
            <tr class:different={compare?.titleEn === true}>
                <td> 영어 제목 </td>
                <td>
                    <input type="checkbox" bind:checked={titleEnChecked} />
                    <input
                        type="text"
                        bind:value={titleEn}
                        disabled={titleEn === null}
                    />
                </td>
            </tr>
            <tr class:different={compare?.aliasEn === true}>
                <td> 영어 비공식 </td>
                <td>
                    <input type="checkbox" bind:checked={aliasEnChecked} />
                    <input
                        type="text"
                        bind:value={aliasEn}
                        disabled={aliasEn === null}
                    />
                </td>
            </tr>
            <tr class:different={compare?.romaji === true}>
                <td> 로마자 </td>
                <td>
                    <input type="checkbox" bind:checked={romajiChecked} />
                    <input
                        type="text"
                        bind:value={romaji}
                        disabled={romaji === null}
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

        background-color: inherit;
    }

    .different {
        background-color: #ff9999;
    }
</style>
