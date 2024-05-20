<script lang="ts" context="module">
    import axios from "axios";

    async function deleteUser(UUID: string) {
        await axios({
            method: "POST",
            url: "/api/user/delete",
            data: {
                UUID,
            },
        });
    }
</script>

<script lang="ts">
    import Nickname from "$lib/components/page/auth/user/nickname.svelte";

    export let data;

    let form:HTMLFormElement
</script>

<table>
    <tr>
        <td> 로그인 제공자 </td>
        <td>
            {data.user.provider}
        </td>
    </tr>
    <Nickname UUID={data.user.UUID} />
    <tr>
        <form method="post" action="/api/user/delete" bind:this={form}>
            <input type="text" name="UUID" value={data.user.UUID} style="display:none;">
        </form>
        <button on:click={() => {form.submit()}}>회원 탈퇴</button>
    </tr>
</table>
