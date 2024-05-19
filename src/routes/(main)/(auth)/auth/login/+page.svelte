<script>
    import ProviderLogin from "$lib/components/page/auth/login/ProviderLogin.svelte";
</script>

<div class="container">
    <ProviderLogin
        icon="/assets/icon/providers/github.svg"
        name="Github"
        backgroundColor="	#2b3137"
        color="white"
        href="/auth/login/github"
        invert={true}
    />
    <ProviderLogin
        icon="/assets/icon/providers/kakao.svg"
        name="Kakao"
        backgroundColor="#FFEB00"
        color="#3C1E1E"
        href="/auth/login/kakao"
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
