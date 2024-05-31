<script lang="ts" context="module">
    function deleteUser(form: HTMLFormElement) {
        if(confirm("정말 탈퇴하시겠습니까?\n탈퇴하신 이후에는 정보를 복구할 수 없습니다!")){
            form.submit();
        }
    }
</script>

<script lang="ts">
    import Nickname from "$lib/components/page/auth/user/nickname.svelte";

    export let data;

    let withdrawForm: HTMLFormElement;
</script>

<table>
    <tr>
        <td width="150px"> 로그인 제공자 </td>
        <td>
            {data.user.provider}
        </td>
    </tr>
    <Nickname UUID={data.user.UUID} />
    <tr>
        <form method="post" action="/api/user/delete" bind:this={withdrawForm}>
            <input
                type="text"
                name="UUID"
                value={data.user.UUID}
                style="display:none;"
            />
        </form>
        <button
            on:click={() => {
                deleteUser(withdrawForm);
            }}
            class="withdraw">회원 탈퇴</button
        >
    </tr>
</table>

<style>
    table {
        width: 100%;
    }

    .withdraw {
        background-color: red;

        outline: 0;
        border: 0;

        color: white;

        border-radius: 5px;

        cursor: pointer;
    }
</style>
