<script lang="ts">
    import TitledContainer from "$lib/components/common/TitledContainer.svelte";

    export let title: string;
    export let titleKo: string | null;
    export let aliasKo: string | null;
    export let titleEn: string | null;
    export let aliasEn: string | null;

    let titleKoChecked = titleKo !== null;
    $:if(titleKoChecked){
        titleKo = titleKo || '';
    }
    else{
        titleKo = null;
    }
    let aliasKoChecked = aliasKo !== null;
    $:if(aliasKoChecked){
        aliasKo = aliasKo || '';
    }
    else{
        aliasKo = null;
    }
    let titleEnChecked = titleEn !== null;
    $:if(titleEnChecked){
        titleEn = titleEn || '';
    }
    else{
        titleEn = null;
    }
    let aliasEnChecked = aliasEn !== null;
    $:if(aliasEnChecked){
        aliasEn = aliasEn || '';
    }
    else{
        aliasEn = null;
    }
</script>

<TitledContainer title="제목" color="#cf4844">
    <table>
        <tr>
            <td> 곡 제목 </td>
            <td class="title">
                <input type="text" bind:value={title} />
            </td>
        </tr>
        <tr>
            <td> 한국어 </td>
            <td>
                <input
                    type="checkbox"
                    bind:checked={titleKoChecked}
                />
                <input type="text" bind:value={titleKo} disabled={titleKo === null} />
            </td>
        </tr>
        <tr>
            <td> 한국어 비공식 </td>
            <td>
                <input
                    type="checkbox"
                    bind:checked={aliasKoChecked}
                />
                <input type="text" bind:value={aliasKo} disabled={aliasKo === null} />
            </td>
        </tr>
        <tr>
            <td> 영어 </td>
            <td>
                <input
                    type="checkbox"
                    bind:checked={titleEnChecked}
                />
                <input type="text" bind:value={titleEn} disabled={titleEn === null} />
            </td>
        </tr>
        <tr>
            <td> 영어 비공식 </td>
            <td>
                <input
                    type="checkbox"
                    bind:checked={aliasEnChecked}
                />
                <input type="text" bind:value={aliasEn} disabled={aliasEn === null} />
            </td>
        </tr>
    </table>
</TitledContainer>

<style>
    table{
        width: 100%;
    }

    td:nth-child(1){
        width: 150px;
        font-weight: bold;
    }
    td:nth-child(2){
        display:flex;
        align-items: center;
    }

    .title{
        box-sizing: border-box;
        padding-left: 21px;
    }

    input[type="text"]{
        flex: 1 0 auto;

        height: 20px;
        font-size: 17px;
    }
</style>