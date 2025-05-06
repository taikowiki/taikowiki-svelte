<script lang="ts">
    import { goto } from "$app/navigation";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";
    import { writable, type Writable } from "svelte/store";

    interface Props {
        query?: Writable<string>;
    }

    let { query }: Props = $props();
    const query_ = query ?? writable('');

    const [theme] = getTheme();
    const isMobile = getIsMobile();

    function search(query: string) {
        goto(`/doc/search?query=${encodeURIComponent(query)}`);
    }
</script>

<div class="search-container" data-isMobile={$isMobile} data-theme={$theme}>
    <input
        type="text"
        bind:value={$query_}
        enterkeyhint="search"
        data-isMobile={$isMobile}
        onkeypress={(event) => {
            if (event.key === "Enter") {
                search($query_);
            }
        }}
    />
    <button
        class="standardbtn"
        data-theme={$theme}
        onclick={() => {
            search($query_);
        }}
    >
        검색
    </button>
</div>

<style>
    .search-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        &[data-isMobile="true"] {
            column-gap: 5px;
            margin-top: -15px;

            width: calc(100% + 30px);
            margin-left: -15px;

            margin-bottom: 10px;
            padding-top: 1px;
            padding-left: 10px;
            padding-right: 10px;
            padding-bottom: 5px;
            box-sizing: border-box;

            background-color: #cf4844;

            &[data-theme="dark"]{
                background-color: #332e2e;
            }

            input{
                height: 25px;
                box-sizing: border-box;
            }
            button{
                height: 25px;
            }
        }
        & input {
            width: 170px;
        }
        & input[data-isMobile="true"] {
            flex: 1 0 auto;
        }
    }
</style>
