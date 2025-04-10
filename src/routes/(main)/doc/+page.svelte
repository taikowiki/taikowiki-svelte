<script lang="ts">
    import { goto } from "$app/navigation";
    import DocMainSearch from "$lib/components/page/wikidoc/main/DocMainSearch.svelte";
    import { getTheme } from "$lib/module/layout/theme";
    import { writable } from "svelte/store";

</script>

<DocMainSearch />