<script lang="ts">
    interface Props {
        allCrownCount: {
            clearCount: number;
            fcCount: number;
            dfcCount: number;
        } | null;
        theme: "light" | "dark";
    }

    let { allCrownCount, theme }: Props = $props();

    function getCrownImage(type: string) {
        switch (type) {
            case "clearCount": {
                return "/assets/icon/crown/clear.png";
            }
            case "fcCount": {
                return "/assets/icon/crown/fc.png";
            }
            case "dfcCount": {
                return "/assets/icon/crown/dfc.png";
            }
            default: {
                return "";
            }
        }
    }

    const types = ["clearCount", "fcCount", "dfcCount"] as const;
</script>

{#if allCrownCount}
    <div class="container" data-theme={theme}>
        {#each types as type}
            <div class="count">
                <img src={getCrownImage(type)} alt={type} />
                <span>
                    {allCrownCount[type]}
                </span>
            </div>
        {/each}
    </div>
{/if}

<style>
    .container {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        column-gap: 5px;
        flex-wrap: wrap;

        margin-bottom: 3px;
    }

    .container[data-theme="light"]{
        color: black;
    }
    .container[data-theme="dark"]{
        color: white;
    }

    .count {
        display: flex;
        align-items: center;
    }

    img {
        width: 40px;
        font-size: 15px;
    }
</style>
