<script lang="ts">
    import type { WikiDocParagraph } from "$lib/module/common/wikidoc/types/wikidoc.types";
    import WikiSubParagraphEditor from "./WikiSubParagraphEditor.svelte";

    interface Props {
        paragraph: WikiDocParagraph;
        deleteParagraph: () => void;
        index: number[];
    }

    let { paragraph = $bindable(), deleteParagraph, index }: Props = $props();
</script>

<WikiSubParagraphEditor {paragraph} {deleteParagraph} {index} />
