<script lang="ts">
    //CSelect means 'Custom Option'
    import { type Option } from "./CSelect.svelte";

    interface Props {
        value: Option;
        select: (value: Option) => void
    }

    let { value, select }: Props = $props();
</script>

<div
    class="container"
    role="presentation"
    onclick={() => {
        select(value);
    }}
>
    {value.display}
</div>
