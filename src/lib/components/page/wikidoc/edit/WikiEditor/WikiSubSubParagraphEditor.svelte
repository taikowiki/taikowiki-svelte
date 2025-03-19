<script lang="ts">
    import type {Doc} from '$lib/module/common/wikidoc/types';
    import WikiSubParagraphEditor from "./WikiSubParagraphEditor.svelte";

    interface Props {
        paragraph: Doc.Data.WikiDocParagraph;
        deleteParagraph: () => void;
        index: number[];
    }

    let { paragraph = $bindable(), deleteParagraph, index }: Props = $props();
</script>

<WikiSubParagraphEditor {paragraph} {deleteParagraph} {index} />
