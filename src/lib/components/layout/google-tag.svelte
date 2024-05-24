<script>
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    $: if (browser && ($page.url || $page.state)) {
        (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != "dataLayer" ? "&l=" + l : "";
            j.async = true;
            j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, "script", "dataLayer", "GTM-PPRX86P3");
    }
    $: {
        if (browser && typeof gtag !== "undefined") {
            gtag("config", "G-S8TRY8QPYG", {
                page_title: document.title,
                page_path: $page.url.pathname,
            });
        }
    }
</script>

<svelte:head>
    <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-S8TRY8QPYG"
    ></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());

        gtag("config", "G-S8TRY8QPYG");
    </script>
    <title>
        태고의 달인 위키
    </title>
</svelte:head>
