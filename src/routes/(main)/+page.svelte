<script lang="ts">
    import MainNotice from "$lib/components/page/(index)/MainNotice.svelte";
    import MainSearch from "$lib/components/page/(index)/MainSearch.svelte";
    import MainShortcut from "$lib/components/page/(index)/MainShortcut.svelte";
    import { Center } from "$lib/module/common/styled";

    export let data;
</script>

<Center>
    <MainSearch />
    <MainShortcut />
    <MainNotice notices={data.recentNotices} />
</Center>
