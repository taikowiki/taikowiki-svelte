<script lang="ts">
    import TitledContainer from "$lib/components/common/TitledContainer.svelte";

    export let title: string;
    export let titleKo: string | null;
    export let aliasKo: string | null;

    export let compare: any;

    let titleKoChecked = titleKo !== null;
    $: if (titleKoChecked) {
        titleKo = titleKo || "";
    } else {
        titleKo = null;
    }
    let aliasKoChecked = aliasKo !== null;
    $: if (aliasKoChecked) {
        aliasKo = aliasKo || "";
    } else {
        aliasKo = null;
    }
</script>

<TitledContainer title="제목" color="#cf4844">
    <table>
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
