<script lang="ts">
    export let version: string|undefined;
</script>

<div class="container">
    <div>
        © 2024 <a href="https://github.com/hotsixman">Hotsixman</a>
    </div>
    <div>
        <a href="https://github.com/taikowiki/taikowiki-svelte">Taikowiki-Svelte{version ? `@${version}` : ""}</a>
    </div>
    <div>
        <a href="https://github.com/taikowiki">Github</a>
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
