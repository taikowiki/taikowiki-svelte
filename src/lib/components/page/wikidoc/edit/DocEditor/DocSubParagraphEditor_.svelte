<script lang="ts">
    import type {Doc} from '$lib/module/common/wikidoc/types';
    import DocParagraphEditor from "./DocParagraphEditor.svelte";

    interface Props {
        paragraph: Doc.Data.DocParagraph;
        deleteParagraph: () => void;
        index: number[];
    }

    let { paragraph = $bindable(), deleteParagraph, index }: Props = $props();
</script>

<DocParagraphEditor {paragraph} {deleteParagraph} {index} />
