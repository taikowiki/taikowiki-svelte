<script lang="ts">
    import BannerGrid from "$lib/components/page/BannerGrid.svelte";

    import { goto } from "$app/navigation";
    goto('/song', {replaceState:true});
</script>

<BannerGrid>
</BannerGrid>