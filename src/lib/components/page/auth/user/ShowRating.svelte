<script lang="ts">
    import { getI18N, getLang } from "$lib/module/i18n";
    import { User } from "$lib/module/user";
    import '$lib/module/user/user.client';
    import { getTheme } from "$lib/module/layout/theme";

    interface Props {
        showRating: {
            nickname: boolean;
            taikoNumber: boolean;
            songs: boolean;
        };
    }

    let { showRating = $bindable() }: Props = $props();

    $effect.pre(() => {
        if (!showRating.nickname) {
            showRating.taikoNumber = false;
        }
    });

    const [theme] = getTheme();
    const lang = getLang();
    let i18n = $derived(getI18N($lang).page.user.showRating);

    async function submit() {
        const response = await User.Client.request.changeShowRating(showRating);
        if (response.status === "success") {
            alert("적용이 완료되었습니다.");
        } else {
            alert("에러가 발생했습니다.");
        }
    }
</script>

{#snippet showRatingNick()}
    <label>
        {i18n.showRatingNick}
        <input bind:checked={showRating.nickname} type="checkbox" />
    </label>
{/snippet}
{#snippet showRatingTaikoNo()}
    <label>
        {i18n.showRatingTaikoNo}
        <input bind:checked={showRating.taikoNumber} type="checkbox" />
    </label>{/snippet}
{#snippet showRatingSongs()}
    <label>
        {i18n.showRatingSongs}
        <input bind:checked={showRating.songs} type="checkbox" />
    </label>
{/snippet}

<div class="div-tr">
    <div class="div-td">
        {i18n.name}
    </div>
    <div class="div-td">
        <div class="container">
            <div>
                {@render showRatingNick()}
                {@render showRatingTaikoNo()}
                {@render showRatingSongs()}
            </div>
            <button onclick={submit} data-theme={$theme}>
                {i18n.submit}
            </button>
        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 10px;
    }

    label {
        display: block;
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
