<script lang="ts">
    import MeasureTable from "$lib/components/page/measures/MeasureTable.svelte";

    export let data;
</script>

<h2>상수표</h2>
<MeasureTable measures={data.measures} songDatas={data.songDatas} />
