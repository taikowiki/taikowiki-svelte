<script>
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import UserItem from "./User-Item.svelte";

    const lang = getLang();
    let currentLang = $lang;

    $: i18n = getI18N($lang).layout.main.user;
</script>

<UserItem separated height="30px">
    <span slot="left"> {i18n.lang} </span>
    <select
        bind:value={currentLang}
        on:change={() => {
            $lang = currentLang;
        }}
        slot="right"
    >
        <option value="ko"> 한국어 </option>
        <option value="ja"> 日本語 </option>
        <option value="en"> English </option>
    </select>
</UserItem>

<style>
    select{
        height: 25px;
    }
</style>
