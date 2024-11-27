<script lang="ts">
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { userRequestor } from "$lib/module/common/user/user.client";
    import { getTheme } from "$lib/module/layout/theme";

    export let showRating: {
        nickname: boolean;
        taikoNumber: boolean;
        songs: boolean;
    };

    $: if(!showRating.nickname){
        showRating.taikoNumber = false;
    }

    const [theme] = getTheme();
    const lang = getLang();
    $: i18n = getI18N($lang).page.user.showRating;

    async function submit(){
        await userRequestor.changeShowRating(showRating);
    }
</script>

<tr>
    <td>
        {i18n.name}
    </td>
    <td>
        <div class="container">
            <div>
                <label>
                    {i18n.showRatingNick}
                    <input bind:checked={showRating.nickname} type="checkbox"/>
                </label>
                <label>
                    {i18n.showRatingTaikoNo}
                    <input bind:checked={showRating.taikoNumber} type="checkbox"/>
                </label>
                <label>
                    {i18n.showRatingSongs}
                    <input bind:checked={showRating.songs} type="checkbox"/>
                </label>
            </div>
            <button on:click={submit} data-theme={$theme}>
                {i18n.submit}
            </button>
        </div>
    </td>
</tr>

<style>
    .container{
        display:flex;
        flex-direction: row;
        align-items: center;
        column-gap: 10px;
    }

    label{
        display:block;
        cursor: pointer;
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