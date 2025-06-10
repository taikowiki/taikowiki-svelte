<script lang="ts" module>
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
    import ShowRating from "$lib/components/page/auth/user/ShowRating.svelte";
    import { getLang, getI18N } from "$lib/module/i18n.js";

    let {data} = $props();

    let withdrawForm: HTMLFormElement;

    const lang = getLang();
    let i18n = $derived(getI18N('/auth/user', $lang));
    let titleI18n = $derived(getI18N('other', $lang).title['/auth/user']);
</script>

<PageTitle title={titleI18n}/>

<div class="div-table">
    <div class="div-tr">
        <div class="div-td" style="width:150px;"> {i18n.provider} </div>
        <div class="div-td">
            {data.user.provider}
        </div>
    </div>
    <div class="div-tr">
        <div class="div-td">UUID</div>
        <div class="div-td">{data.user.UUID}</div>
    </div>
    <Nickname />
    <ShowRating bind:showRating={data.user.showRating}/>
    <div class="div-tr">
        <form method="post" action="/api/user/delete" bind:this={withdrawForm}>
            <input
                type="text"
                name="UUID"
                value={data.user.UUID}
                style="display:none;"
            />
        </form>
        <button
            onclick={() => {
                deleteUser(withdrawForm);
            }}
            class="withdraw">{i18n.delete}</button
        >
    </div>
</div>

<style>
    .div-table {
        width: 100%;
        border-spacing: 0px 20px;
    }

    .withdraw {
        background-color: red;

        outline: 0;
        border: 0;

        color: white;

        border-radius: 5px;

        cursor: pointer;
    }

    .div-table :global(td){
        display:flex;
        flex-direction: column;
        row-gap: 10px;
    }
    .div-table :global(td:nth-child(1)){
        font-weight: bold;
        font-size: 17px;
    }
</style>
