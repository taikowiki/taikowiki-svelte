<script lang="ts">
    import { goto } from "$app/navigation";
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import DocMainSearch from "$lib/components/page/wikidoc/main/DocMainSearch.svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";
    import { writable } from "svelte/store";

    const [theme] = getTheme();
    const isMobile = getIsMobile();
</script>

{#snippet docGuideView()}
    {#snippet guide(title: string, description: string, link: string)}
        <a class="guide" href={link} data-theme={$theme} data-isMobile={$isMobile}>
            <div class="guide-title">
                {title}
            </div>
            <div class="guide-desc">
                {description}
            </div>
        </a>
    {/snippet}
    <div class="guide-container section">
        <div class="heading">가이드</div>
        {@render guide(
            "문법",
            "문서를 작성할 때 사용하는 문법을 알아보세요.",
            "/doc/r/태고위키문서: 문법",
        )}
        {@render guide(
            "규정",
            "문서 기능을 이용할 때 지켜야 할 규정입니다.",
            "/doc/r/태고위키문서: 규정",
        )}
    </div>
{/snippet}

<PageTitle title={'문서'}/>
<DocMainSearch />
<div class="section-container">
    {@render docGuideView()}
</div>

<style>
    .section-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;

        & .section {
            max-width: 810px;
        }
        & .heading {
            width: 100%;

            font-weight: bold;
            font-size: 25px;

        }
    }

    .guide-container {
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        row-gap: 10px;
        column-gap: 10px;

        & .guide {
            display: flex;
            flex-direction: column;
            row-gap: 5px;

            width: 400px;

            box-shadow: 0px 0px 2px #d4d4d4;
            color: black;

            box-sizing: border-box;
            padding-block: 10px;
            padding-inline: 20px;

            border-radius: 10px;

            &:hover .guide-title {
                text-decoration: underline;
            }
            &[data-theme="dark"]{
                color: white;
                box-shadow: 0px 0px 3px black;
            }
            &[data-isMobile="true"]{
                width: 100%;
            }
        }

        & .guide-title {
            font-weight: bold;
            font-size: 22px;
        }
    }
</style>
