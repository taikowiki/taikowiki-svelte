<script>
    import ProviderLogin from "$lib/components/page/auth/login/ProviderLogin.svelte";
    import { page } from "$app/stores";
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import { getI18N, getLang } from "$lib/module/i18n";

    const redirectUri = $page.url.searchParams.toString();

    const lang = getLang();
    let i18n = $derived(getI18N('other', $lang).title['/auth/login']);
</script>

<PageTitle title={i18n}/>

<div class="container">
    <ProviderLogin
        icon="/assets/icon/providers/github.svg"
        name="Github"
        backgroundColor="#2b3137"
        color="white"
        href={`/auth/login/github?${redirectUri}`}
        invert={true}
    />
    <ProviderLogin
        icon="/assets/icon/providers/kakao.svg"
        name="Kakao"
        backgroundColor="#FFEB00"
        color="#3C1E1E"
        href={`/auth/login/kakao?${redirectUri}`}
    />
    <div>
        위 로그인 제공자를 통해 로그인 시 <a href="/auth/login/policy">개인정보 취급방침</a>에 동의한 것으로 간주합니다.
    </div>
</div>

<style>
    .container {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;

        row-gap: 20px;
    }

    div{
        margin-top: 20px;
        font-size: 13px;
    }
</style>
