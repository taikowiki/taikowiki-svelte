<script lang="ts" module>
    async function changeNickname(
        newNickname: string,
        user: Writable<Record<string, any>>,
    ) {
        const result = await userRequestor.changeNickname({ newNickname });
        user.update((v) => {
            v.nickname = newNickname;
            return v;
        });
        return result;
    }
</script>

<script lang="ts">
    import { getContext } from "svelte";
    import { type Writable } from "svelte/store";
    import { getTheme } from "$lib/module/layout/theme";
    import { userRequestor } from "$lib/module/common/user/user.client";
    import { getI18N, getLang } from "$lib/module/i18n";

    const user = getContext("user") as Writable<{
        provider: string;
        nickname: string;
    }>;

    let nickname = $state($user.nickname);

    let nicknameFormatError = $state(false);
    $effect(() => {
        nicknameFormatError = !/^([a-zA-Z가-힣0-9\-]*)$/.test(nickname);
    });

    let error = $state("");

    const [theme] = getTheme();
    const lang = getLang();
    let i18n = $derived(getI18N("/auth/user", $lang));
</script>

{#snippet nickRule()}
    <div class="explanation">
        {i18n.nickRule}
    </div>
{/snippet}
{#snippet nickChange()}
    <div>
        <input bind:value={nickname} class:error={nicknameFormatError} />
        <button
            onclick={() => {
                error = "";
                if (nicknameFormatError) {
                    error =
                        i18n.error["New nickname is not in the correct format"];
                } else {
                    changeNickname(nickname, user).then((result) => {
                        if (result.status === "success") {
                            alert(i18n.nickChangeSuccess);
                        } else {
                            error =
                                i18n.error[result.reason ?? ""] ||
                                result.reason;
                        }
                    });
                }
            }}
            data-theme={$theme}
        >
            {i18n.change}
        </button>
    </div>
{/snippet}
{#snippet errorView()}
    {#if error}
        <div style="color:red;">{error}</div>
    {/if}
{/snippet}

<div class="div-tr">
    <div class="div-td">{i18n.nickname}</div>
    <div class="div-td">
        {@render nickRule()}
        <div class="container">
            {@render nickChange()}
            {@render errorView()}
        </div>
    </div>
</div>

<style>
    .error {
        border: 1px solid red;
        outline: 1px solid red;

        box-sizing: border-box;
    }

    .explanation {
        font-size: 12px;
        color: gray;
    }

    .container {
        width: 100%;
        display: flex;
        flex-direction: row;
        column-gap: 10px;
    }

    @media only screen and (max-width: 1000px) {
        .container {
            flex-direction: column;
        }
    }

    button {
        border: 1px solid #cf4844;
        outline: 0;
        color: black;

        border-radius: 5px;

        height: 22px;

        cursor: pointer;
    }
    button[data-theme="dark"] {
        background-color: black;
        color: white;

        box-sizing: border-box;
        border-color: rgb(145, 145, 145);
    }
</style>
