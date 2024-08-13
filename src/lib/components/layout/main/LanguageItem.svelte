<script>
    import { getLang } from "$lib/module/common/i18n/i18n";
    import UserItem from "./User-Item.svelte";

    const lang = getLang();
    let currentLang = $lang;
</script>

<UserItem separated height="30px">
    <span slot="left"> 언어 </span>
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
