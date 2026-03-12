<script>
    import StyledCommon from "$lib/components/layout/StyledCommon.svelte";
    import "$lib/assets/css/standard.scss";
    import { Layout } from "$lib/module/layout";

    let { data, children } = $props();

    //experimental flag
    Layout.useExperimentalFlag();
    //timezone
    Layout.useTimezone(data.timezone);
</script>

<StyledCommon />
{@render children?.()}