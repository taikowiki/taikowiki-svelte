<script lang="ts">
    import type {Doc} from '$lib/module/common/wikidoc/types';
    import DocParagraphView from "../DocParagraphView.svelte";

    interface Props {
        paragraph: Doc.Data.DocParagraph;
        index: string;
        depth?: number;
        onLoad: () => void
    }

    let { paragraph, index, depth, onLoad }: Props = $props();
</script>

<DocParagraphView {paragraph} {index} {depth} {onLoad}/>
