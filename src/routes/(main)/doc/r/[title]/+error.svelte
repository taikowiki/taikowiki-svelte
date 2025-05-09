<script lang="ts">
    import { page } from '$app/state';
    import ErrorPage from '../../../+error.svelte'

    const title = page.params.title;
</script>

{#if page.status === 404}
<a href={`/doc/e?title=${encodeURIComponent(title)}`}><b>{title}</b> 문서 만들기</a>
{/if}
<ErrorPage/>