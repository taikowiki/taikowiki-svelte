<script>
    import ProviderLogin from "$lib/components/page/auth/login/ProviderLogin.svelte";
    import { page } from "$app/stores";

    const redirectUri = $page.url.searchParams.toString();
</script>

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
