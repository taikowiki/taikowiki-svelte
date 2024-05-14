<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";
    import DisplayContainer from "./DisplayContainer.svelte";

    export let title:string;
    export let titleKo: string | null;
    export let aliasKo: string | null;
    export let titleEn: string | null;
    export let aliasEn: string | null;

    const [theme] = getTheme();
</script>
<DisplayContainer>
    <div class="title" slot="title">
        번역명
    </div>
    <svelte:fragment slot="content">
        {#if titleKo && title !== titleKo}
        <div class="wrapper">
            <div class="language" data-theme={$theme}>한국어</div>
            <div class="title">{titleKo}</div>
        </div>
        {/if}
        {#if aliasKo}
        <div class="wrapper">
            <div class="language" data-theme={$theme}>한국어(비공식)</div>
            <div class="title">{aliasKo}</div>
        </div>
        {/if}
        {#if titleEn}
        <div class="wrapper">
            <div class="language" data-theme={$theme}>영어</div>
            <div class="title">{titleEn}</div>
        </div>
        {/if}
        {#if aliasEn}
        <div class="wrapper">
            <div class="language" data-theme={$theme}>영어(비공식)</div>
            <div class="title">{aliasEn}</div>
        </div>
        {/if}
    </svelte:fragment>
</DisplayContainer>

<style>
    .wrapper{
        display:flex;
        flex-direction: row;
    }

    .language{
        width: 87px;

        display: flex;
        align-items: center;

        color: #71717a;

        margin-right: 5px;

        font-size: 14px;
    }
    .language[data-theme="dark"]{
        color: #a7acb8;
    }

    .title{
        height: 100%;

        display:flex;
        align-items: center;
    }

    @media only screen and (max-width: 1000px){
        .title{
            flex: 1 0;
        }
    }
</style>