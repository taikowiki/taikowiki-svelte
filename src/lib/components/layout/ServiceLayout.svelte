<script>
    import GoogleTag from "./google-tag.svelte";
    import VercelInject from "./vercel-inject.svelte";
</script>

<svelte:head>
    <meta name="google-adsense-account" content="ca-pub-1629193017650416" />
    <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1629193017650416"
        crossorigin="anonymous"
    ></script>
</svelte:head>

<GoogleTag />
<VercelInject />
