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

    export let UUID:string;
    
    const user = getContext('user') as Writable<{provider: string;nickname:string}>

    let nickname = $user.nickname;

    let nicknameFormatError = false;
    $: nicknameFormatError = !/^([a-zA-Z가-힣0-9\-]*)$/.test(nickname);

    let error = '';
</script>

<tr>
    <td> 닉네임 </td>
    <td>
        <input bind:value={nickname} class:error={nicknameFormatError} />
        <button
            on:click={() => {
                if(nicknameFormatError) return;
                error = '';
                changeNickname(UUID, nickname)
                .then(result => {
                    if(result.status === "success"){
                        alert('변경 완료');
                    }
                    else{
                        error = result.reason;
                    }
                });
            }}
        >
            변경
        </button>
        {#if error}
        <span style="color:red;">{error}</span>
        {/if}
    </td>
</tr>

<style>
    .error {
        border: 1px solid red;
        outline: 1px solid red;
    }
</style>
