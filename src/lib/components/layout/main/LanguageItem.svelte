<script>
    import { getI18N, getLang } from "$lib/module/i18n";
    import UserItem from "./User-Item.svelte";

    const lang = getLang();
    let currentLang = $state($lang);

    let i18n = $derived(getI18N($lang).layout.main.user);
</script>

<UserItem separated height="30px">
    {#snippet left()}
        <span> {i18n.lang} </span>
    {/snippet}
    {#snippet right()}
        <select
            bind:value={currentLang}
            onchange={() => {
                $lang = currentLang;
            }}
        >
            <option value="ko"> 한국어 </option>
            <option value="ja"> 日本語 </option>
            <option value="en"> English </option>
            <option value="zh-tw"> 中文(繁体) </option>
        </select>
    {/snippet}
</UserItem>

<style>
    select {
        height: 25px;
    }
</style>
