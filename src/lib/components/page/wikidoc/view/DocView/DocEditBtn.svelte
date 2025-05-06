<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";

    interface Props {
        id: number;
        title: string;
        version?: number;
    }

    let { id, title, version }: Props = $props();

    const [theme] = getTheme();
</script>

<a
    class="icon-anchor"
    href={`/doc/e/${id}?title=${encodeURIComponent(title)}${version ? `&version=${version}` : ''}`}
    data-theme={$theme}
>
    <img class="icon" src="/assets/icon/doc-edit.svg" alt="edit" />
</a>

<style>
    .icon {
        width: 20px;
        height: 20px;

        filter: invert(100%);
    }
    .icon-anchor {
        width: 30px;
        height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #cf4844;

        border-radius: 5px;
    }
    .icon-anchor[data-theme="dark"] {
        background-color: #1c1c1c;
    }
</style>
