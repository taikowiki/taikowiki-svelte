<script lang="ts">
    import { Song } from "$lib/module/song/index.js";
    import SongLanguageSelector from "$lib/components/page/song/SongLanguageSelector.svelte";
    import SongList from "$lib/components/page/song/SongList.svelte";
    import AddSongButton from "$lib/components/page/song/AddSongButton.svelte";
    import SearchBox from "$lib/components/page/song/SearchBox.svelte";
    import { navigating } from "$app/stores";
    import Loading from "$lib/components/common/Loading.svelte";
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import { getI18N, getLang } from "$lib/module/i18n";
    import PageSelector from "$lib/components/common/PageSelector.svelte";
    import { goto } from "$app/navigation";

    let {data} = $props();

    let songLang: Song.SongLang = $state("ja");

    let pageNum = $derived(data.pageNum);
    let option = $derived(data.option);
    let songs = $derived(data.songs);
    let length = $derived(data.count);

    const lang = getLang();
    let titleI18n = $derived(getI18N($lang).title["/song"]);

    function movePage(p: number) {
        const searchParam = new URLSearchParams(location.search);

        searchParam.set("page", p.toString());

        goto(`/song?${searchParam}`);

        window.scrollTo({
            top: 0,
        });
    }
</script>

<PageTitle title={titleI18n} />

<SearchBox option={$state.snapshot(option)} />
{#if $navigating}
    <Loading />
{:else}
    {#if length !== 0}
        <SongLanguageSelector bind:songLang />
    {/if}
    <SongList {songLang} {songs} />
    <PageSelector {pageNum} {length} {movePage}/>
    <AddSongButton />
{/if}
