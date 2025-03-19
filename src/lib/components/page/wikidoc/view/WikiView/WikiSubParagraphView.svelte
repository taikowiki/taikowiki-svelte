<script lang="ts">
    import type {Doc} from '$lib/module/common/wikidoc/types';
    import WikiParagraphView from "../WikiParagraphView.svelte";

    interface Props {
        paragraph: Doc.Data.WikiDocParagraph;
        index: string;
        depth?: number;
    }

    let { paragraph, index, depth }: Props = $props();
</script>

<WikiParagraphView {paragraph} {index} {depth} />
