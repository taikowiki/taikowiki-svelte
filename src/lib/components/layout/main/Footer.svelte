<script lang="ts">
    interface Props {
        version?: string;
    }

    let { version }: Props = $props();
</script>

<div class="container">
    <div>
        <a href="https://github.com/taikowiki/taikowiki-svelte" target="_blank">
            Taikowiki-Svelte{version ? `@${version}` : ""}
        </a>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;

        color: gray;
        font-size: 12px;
    }

    a {
        text-decoration: none;
        color: inherit !important;
    }
</style>
