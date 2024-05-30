<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";
    import UserItem from "./User-Item.svelte";
    import ThemeToggler from "./ThemeToggler.svelte";
    import LanguageItem from "./LanguageItem.svelte";
    import UserInfo from "./User-Info.svelte";
    import { page } from "$app/stores";

    let opened = false;
    function close(){
        opened = false;
    }

    const [theme] = getTheme();

    $:if($page.url || $page.state){
        close();
    }
</script>

<div class="container">
    <div
        class="opener"
        on:click={() => {
            opened = !opened;
        }}
        role="presentation"
    >
        <img src="/assets/icon/user.svg" alt="" />
    </div>
    {#if opened}
        <div class="item-container" data-theme={$theme}>
            <UserInfo {close}/>
            <UserItem separated height="30px">
                <span slot="left">테마</span><ThemeToggler slot="right" />
            </UserItem>
            <LanguageItem />
        </div>
    {/if}
</div>

<style>
    .container{
        position:relative;
    }
    .opener {
        width: 20px;
        height: 20px;

        cursor: pointer;
    }
    img {
        filter: invert(100%);
    }

    .item-container {
        width: 220px;

        position: absolute;

        right: -9px;
        top: 35px;

        background-color: white;

        box-sizing: border-box;

        box-shadow: 0px 0px 3px rgb(255, 50, 50);

        z-index: 100;

        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 5px;

        padding-block: 10px;
    }
    .item-container[data-theme="dark"] {
        box-shadow: 0px 0px 3px black;

        background-color: #1c1c1c;
    }
    .item-container:focus {
        outline: 0;
    }
</style>
