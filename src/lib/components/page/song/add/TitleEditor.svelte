<script lang="ts">
    import TitledContainer from "$lib/components/common/TitledContainer.svelte";

    export let title: string;
    export let titleKo: string | null;
    export let aliasKo: string | null;
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
            <td> 한국어 제목 </td>
            <td>
                <input
                    type="checkbox"
                    on:change={(event) => {
                        if (!event.target) return;
                        if (event.currentTarget.checked) {
                            titleKo = "";
                        } else {
                            titleKo = null;
                        }
                    }}
                />
                <input type="text" bind:value={titleKo} disabled={titleKo === null} />
            </td>
        </tr>
        <tr>
            <td> 한국어 비공식 </td>
            <td>
                <input
                    type="checkbox"
                    on:change={(event) => {
                        if (!event.target) return;
                        if (event.currentTarget.checked) {
                            aliasKo = "";
                        } else {
                            aliasKo = null;
                        }
                    }}
                />
                <input type="text" bind:value={aliasKo} disabled={aliasKo === null} />
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