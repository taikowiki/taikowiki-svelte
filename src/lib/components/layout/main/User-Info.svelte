<script lang="ts">
    import { type Writable } from "svelte/store";
    import { getContext } from "svelte";
    import UserItem from "./User-Item.svelte";
    import UserBorder from "./User-Border.svelte";
    import { getI18N, getLang } from "$lib/module/i18n";

    interface Props {
        close: () => void;
    }

    let { close }: Props = $props();

    const user = getContext("user") as Writable<{
        logined: boolean;
        nickname: string;
    }>;

    const lang = getLang();
    let i18n = $derived(getI18N($lang).layout.main.user);
</script>

{#if $user.logined}
    <UserItem href="/auth/user" isButton>
        <div class="container" onclick={close} role="presentation">
            <div class="s">{i18n.user}</div>
            <div class="n">{$user.nickname}</div>
        </div>
    </UserItem>
    <UserItem href="/auth/logout" isButton height="30px" reload>
        <div class="container" role="presentation">
            {i18n.logout}
        </div>
    </UserItem>
    <UserItem href="/rating" isButton height="30px">
        <div class="container" onclick={close} role="presentation">
            {i18n.donderData}
        </div>
    </UserItem>
    <UserItem href="/poll" isButton height="30px">
        <div class="container" onclick={close} role="presentation">
            설문
        </div>
    </UserItem>
{:else}
    <UserItem>
        <div class="container" onclick={close} role="presentation">
            <div class="s">{i18n.notLogined}</div>
            <div class="n">{$user.nickname}</div>
        </div>
    </UserItem>
    <UserItem href="/auth/login" isButton height="30px">
        <div class="container" onclick={close} role="presentation">
            {i18n.login}
        </div>
    </UserItem>
{/if}
<UserBorder />

<style>
    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        box-sizing: border-box;
        padding-inline: 20px;
    }

    .s {
        font-size: 12px;
    }
    .n {
        font-size: 15px;
    }
</style>
