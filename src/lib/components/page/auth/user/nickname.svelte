<script lang="ts" context="module">
    import axios from "axios";
    import { goto, replaceState } from "$app/navigation";

    async function changeNickname(UUID: string, newNickname: string) {
        const result = await axios({
            method: "post",
            data: {
                UUID,
                newNickname,
            },
            url: "/api/user/change_nickname",
        });
        replaceState(get(page).url.href, get(page).state);
        return result.data;
    }
</script>

<script lang="ts">
    import { getContext } from "svelte";
    import { get, type Writable } from "svelte/store";
    import { page } from "$app/stores";
    import { getI18N } from "$lib/module/common/i18n/i18n";
    import { getTheme } from "$lib/module/layout/theme";

    export let UUID: string;

    const user = getContext("user") as Writable<{
        provider: string;
        nickname: string;
    }>;

    let nickname = $user.nickname;

    let nicknameFormatError = false;
    $: nicknameFormatError = !/^([a-zA-Z가-힣0-9\-]*)$/.test(nickname);

    let error = "";

    const i18n = getI18N();
    const [theme] = getTheme();
</script>

<tr>
    <td> 닉네임 </td>
    <td>
        <div class="explanation">
            닉네임에는 알파벳, 한글, 숫자, '-'만 사용할 수 있으며 공백은 사용하실 수 없습니다.
        </div>
        <div class="container">
            <div>
                <input
                    bind:value={nickname}
                    class:error={nicknameFormatError}
                />
                <button
                    on:click={() => {
                        if (nicknameFormatError) {
                            error =
                                $i18n.error[
                                    "New nickname is not in the correct format"
                                ];
                        }
                        error = "";
                        changeNickname(UUID, nickname).then((result) => {
                            if (result.status === "success") {
                                alert("변경 완료");
                            } else {
                                error =
                                    $i18n.error[result.reason] || result.reason;
                            }
                        });
                    }}
                    data-theme={$theme}
                >
                    변경
                </button>
            </div>
            {#if error}
                <div style="color:red;">{error}</div>
            {/if}
        </div>
    </td>
</tr>

<style>
    .error {
        border: 1px solid red;
        outline: 1px solid red;

        box-sizing: border-box;
    }

    .explanation{
        font-size: 12px;
        color:gray;
    }

    .container{
        width: 100%;
        display:flex;
        flex-direction: row;
        column-gap: 10px;
    }

    @media only screen and (max-width: 1000px) {
        .container {
            flex-direction: column;
        }
    }

    button{
        border: 1px solid #cf4844;
        outline: 0;
        color:black;

        border-radius: 5px;

        height: 22px;

        cursor: pointer;
    }
    button[data-theme="dark"]{
        background-color: black;
        color:white;

        box-sizing: border-box;
        border-color: rgb(145, 145, 145);
    }
</style>
