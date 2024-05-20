<script lang="ts">
    import { type Writable } from "svelte/store";
    import { getContext } from "svelte";
    import UserItem from "./User-Item.svelte";
    import UserBorder from "./User-Border.svelte";

    export let close: () => void;

    const user = getContext("user") as Writable<{
        logined: boolean;
        nickname: string;
    }>;
</script>

{#if $user.logined}
    <UserItem href="/auth/user" isButton>
        <div class="container" on:click={close} role="presentation">
            <div class="s">사용자</div>
            <div class="n">{$user.nickname}</div>
        </div>
    </UserItem>
    <UserItem href="/auth/logout" isButton height="30px">
        <div class="container" role="presentation">
            로그아웃
        </div>
    </UserItem>
{:else}
    <UserItem>
        <div class="container" on:click={close} role="presentation">
            <div class="s">비로그인</div>
            <div class="n">{$user.nickname}</div>
        </div>
    </UserItem>
    <UserItem href="/auth/login" isButton height="30px">
        <div class="container" on:click={close} role="presentation">
            로그인
        </div>
    </UserItem>
{/if}
<UserBorder/>

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
    .n{
        font-size: 15px;
    }
</style>
