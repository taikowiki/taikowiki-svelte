<script lang="ts">
    import { browser } from "$app/environment";
    import Aside from "$lib/components/layout/main/Aside.svelte";
    import AsideItem from "$lib/components/layout/main/AsideItem.svelte";
    import Header from "$lib/components/layout/main/Header.svelte";
    import Main from "$lib/components/layout/main/Main.svelte";
    import ThemeToggler from "$lib/components/layout/main/ThemeToggler.svelte";
    import useTheme from "$lib/module/layout/theme";

    let [theme, _] = useTheme();

    $:if(browser){
        document.body.setAttribute('data-theme', $theme);
    }
</script>

{#if $theme}
    <Header>
        <svelte:fragment slot="right">
            <ThemeToggler/>
        </svelte:fragment>
    </Header>
    <Main>
        <slot slot="main"/>
        <Aside slot="aside">
            <AsideItem title="ㅎㅇ" titleHref="asd">
                ㅎㅇ
            </AsideItem>
        </Aside>
    </Main>
{/if}

<style>
    :global(body[data-theme="light"]){
        background-color: #e8e8e8;
        color:black;
    }
    :global(body[data-theme="dark"]){
        background-color: black;
        color:white;
    }
</style>