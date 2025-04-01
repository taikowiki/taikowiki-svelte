<script lang="ts">
    import { browser } from "$app/environment";
    import { getTheme } from "$lib/module/layout/theme";

    let [theme] = getTheme();
</script>

{#if $theme === "light"}
    <style>
        body {
            background-color: #e8e8e8;
            color: black;
        }
        a {
            color: #cf4844;
        }
    </style>
{:else}
    <style>
        body {
            background-color: black;
            color: white;
        }
        a {
            color: #e1a743;
        }
    </style>
{/if}
