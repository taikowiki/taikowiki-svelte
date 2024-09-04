<script lang="ts">
    import useTheme from "$lib/module/layout/theme";
    import { browser } from "$app/environment";
    import Header from "$lib/components/layout/main/Header.svelte";
    import HeaderItem from "$lib/components/layout/main/HeaderItem.svelte";
    import User from "$lib/components/layout/main/User.svelte";
    import { writable } from "svelte/store";
    import { navigating, page } from "$app/stores";
    import { setContext } from "svelte";
    import { useLang } from "$lib/module/common/i18n/i18n.js";
    import { userRequestor } from "$lib/module/common/user/user.client.js";

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
        userRequestor.getUserData(null).then((response) => {
            if(response.status === 'success'){
                user.set(response.data);
            }
        })
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

<div class="container">
    <main style="background-color:white;">
        <slot />
    </main>
</div>

<style>
    .logo {
        height: 30px;
    }

    .container{
        display:flex;
        justify-content: center;
    }

    main{
        width: 100%;
        max-width: 1400px;
    }
</style>