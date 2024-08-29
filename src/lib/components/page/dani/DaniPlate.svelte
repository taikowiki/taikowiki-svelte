<script lang="ts">
    import type { Dan } from "$lib/module/common/dani/types";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";

    export let dan:Dan;

    const lang = getLang();
    $: i18n = getI18N('other', $lang);

    $: danPlate = dan === 'gaiden' ? 'gaiden'
                : dan === 'tatsujin' ? 'tatsujin'
                : dan === 'chojin' || dan === 'meijin' || dan === 'kuroto' ? 'jin'
                : dan === 'fukusho' ? 'fukusho'
                : dan === 'chiuken' ? 'chiuken'
                : dan === 'jiho' ? 'jiho'
                : dan.endsWith('kyu') || dan === 'beginner' ? 'kyu'
                : dan === '10dan' || dan === '9dan' || dan === '8dan' || dan === '7dan' || dan === '6dan' || dan === 'taisho' ? 'red-dan' : 'blue-dan'
</script>

<div style={`background-image: url('/assets/icon/dani/plate/${danPlate}.webp');`}>
    <span>
        {i18n.dani.dan[dan]}
    </span>
</div>

<style>
    div{
        min-width: 56px;
        height: 34px;

        padding-inline: 3px;

        display:flex;
        justify-content: center;
        align-items: center;

        background-size: calc(100% + 2px) 34px;
        background-position: center center;
        background-repeat: no-repeat;

        font-size: 19px;
        font-weight: bold;
        font-family: 'Han';
        color:white;

        text-shadow: 1px 1px black;

        transform: translateY(0px);
    }

    span{
        transform: translateY(-1px);
    }
</style>