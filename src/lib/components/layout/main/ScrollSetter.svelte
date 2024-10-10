<script lang="ts">
    import { afterUpdate, getContext } from "svelte";
    import type { Writable } from "svelte/store";

    const currentScrollY: Writable<number | null> = getContext("currentScrollY");

    afterUpdate(() => {
        if ($currentScrollY) {
            window.scrollTo({
                top: $currentScrollY
            });
        }
    });
</script>
