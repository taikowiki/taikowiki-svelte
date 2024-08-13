<script lang="ts" context="module">
    function deleteUser(form: HTMLFormElement) {
        if (
            confirm(
                "정말 탈퇴하시겠습니까?\n탈퇴하신 이후에는 정보를 복구할 수 없습니다!",
            )
        ) {
            form.submit();
        }
    }
</script>

<script lang="ts">
    import PageTitle from "$lib/components/common/PageTitle.svelte";

    import Nickname from "$lib/components/page/auth/user/nickname.svelte";
    import { getLang, getI18N } from "$lib/module/common/i18n/i18n.js";

    export let data;

    let withdrawForm: HTMLFormElement;

    const lang = getLang();
    $: i18n = getI18N('/auth/user', $lang);
    $: titleI18n = getI18N('other', $lang).title['/auth/user'];
</script>

<PageTitle title={titleI18n}/>

<table>
    <tr>
        <td width="150px"> {i18n.provider} </td>
        <td>
            {data.user.provider}
        </td>
    </tr>
    <tr>
        <td>UUID</td>
        <td>{data.user.UUID}</td>
    </tr>
    <Nickname />
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
            class="withdraw">{i18n.delete}</button
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
