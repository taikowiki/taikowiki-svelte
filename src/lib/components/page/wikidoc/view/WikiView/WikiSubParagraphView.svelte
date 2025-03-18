<script lang="ts">
    import type { WikiDocParagraph } from "$lib/module/common/wikidoc/types/wikidoc.types";
    import WikiParagraphView from "../WikiParagraphView.svelte";

    interface Props {
        paragraph: WikiDocParagraph;
        index: string;
        depth?: number;
    }

    let { paragraph, index, depth }: Props = $props();
</script>

<WikiParagraphView {paragraph} {index} {depth} />
