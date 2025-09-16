<script>
    import GoogleTag from "./google-tag.svelte";
    import VercelInject from "./vercel-inject.svelte";
    import { Ad } from "$lib/module/ad/ad.client";
    import { onMount } from "svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { browser } from "$app/environment";

    onMount(() => {
        (async () => {
            let triedCount = 0;
            while (true) {
                if (triedCount > 20) {
                    break;
                }
                if (window.adsbygoogle) {
                    Ad.adScriptLoaded.res();
                    break;
                } else {
                    await new Promise((res) => setTimeout(res, 1000));
                    triedCount++;
                }
            }
        })();
    });
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
