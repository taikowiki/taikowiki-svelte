<script>
    import ProviderLogin from "$lib/components/page/auth/login/ProviderLogin.svelte";
    import { page } from "$app/stores";
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";

    const redirectUri = $page.url.searchParams.toString();

    const lang = getLang();
    $: i18n = getI18N('other', $lang).title['/auth/login']
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
</div>

<style>
    .container {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;

        row-gap: 20px;
    }
</style>
