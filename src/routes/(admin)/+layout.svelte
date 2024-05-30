<script lang="ts">
    import useTheme from "$lib/module/layout/theme";
    import { browser } from "$app/environment";
    import Header from "$lib/components/layout/main/Header.svelte";
    import HeaderItem from "$lib/components/layout/main/HeaderItem.svelte";
    import User from "$lib/components/layout/main/User.svelte";
    import { writable } from "svelte/store";
    import axios from 'axios';
    import { navigating, page } from "$app/stores";
    import { setContext } from "svelte";
    import { useLang } from "$lib/module/common/i18n/i18n.js";

    export let data;

    //theme
    let [theme, _] = useTheme();
    $: if($theme === "dark") $theme = "light"
    $: if (browser) {
        document.body.setAttribute("data-theme", $theme);
    }

    //lang
    useLang();

    //user
    const user = writable<{ logined: boolean; nickname: string }>(data.user);
    setContext("user", user);
    $: if (($navigating || $page.state) && browser) {
        axios({
            method: "get",
            url: "/api/user",
        }).then(({ data }) => {
            user.set(data);
        });
    }
</script>

<Header>
    <svelte:fragment slot="left">
        <HeaderItem href="/" useHover={false}>
            <img class="logo" src="/assets/img/logo.png" alt="logo" />
        </HeaderItem>
    </svelte:fragment>
    <svelte:fragment slot="right">
        <User/>
    </svelte:fragment>
</Header>

<main style="background-color:white;">
    <slot />
</main>

<style>
    .logo {
        height: 30px;
    }
</style>