<script lang="ts">
    import { goto } from "$app/navigation";
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import DocMainSearch from "$lib/components/page/wikidoc/main/DocMainSearch.svelte";
    import type { Doc } from "$lib/module/common/wikidoc/types.js";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";
    import { DateTime } from "luxon";
    import { writable } from "svelte/store";

    let { data } = $props();

    const [theme] = getTheme();
    const isMobile = getIsMobile();
</script>

{#snippet docGuideView()}
    {#snippet guide(title: string, description: string, link: string)}
        <a
            class="guide"
            href={link}
            data-theme={$theme}
            data-isMobile={$isMobile}
        >
            <div class="guide-title">
                {title}
            </div>
            <div class="guide-desc">
                {description}
            </div>
        </a>
    {/snippet}
    <div class="guide-container section">
        <div class="heading">주요 문서</div>
        {@render guide(
            "가이드",
            "문서를 작성을 위한 가이드입니다.",
            "/doc/r/태고위키문서: 가이드",
        )}
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
{#snippet recentDoc(
    doc: Pick<
        Doc.DB.DocDBData,
        | "id"
        | "title"
        | "editorUUID"
        | "editorIp"
        | "createdTime"
        | "editedTime"
    >,
)}
    {@const getTimeDiff = () => {
        const min = 60 * 1000;
        const hour = 60 * min;
        const day = 24 * hour;
        const diff = Date.now() - doc.editedTime.getTime();
        if (diff < hour) {
            return `${Math.floor(diff / min)}분 전`;
        } else if (diff < day) {
            return `${Math.floor(diff / hour)}분 전`;
        } else if (diff < 2 * day) {
            return `어제`;
        } else {
            return `${Math.floor(diff / day)}일 전`;
        }
    }}
    <a class="recent-doc" href={`/doc/r/${doc.title}`} data-theme={$theme}>
        <div class="left">
            <div class="title">{doc.title}</div>
            <div class="editor">
                {doc.editorUUID ?? doc.editorIp}에 의해 수정됨
            </div>
        </div>
        <div class="right">
            <div class="date">
                {getTimeDiff()}
            </div>
        </div>
    </a>
{/snippet}
{#snippet recentlyEditedDocs()}
    <div class="recent-doc-container section">
        <div class="heading">최근 수정된 문서</div>
        {#each data.recentlyEditedDocs as doc}
            {@render recentDoc(doc)}
        {/each}
    </div>
{/snippet}
{#snippet recentlyCreatedDocs()}
    <div class="recent-doc-container section">
        <div class="heading">최근 생성된 문서</div>
        {#each data.recentlyCreatedDocs as doc}
            {@render recentDoc(doc)}
        {/each}
    </div>
{/snippet}

<PageTitle title={"문서"} />
<DocMainSearch />
<div class="section-container">
    {@render docGuideView()}
    {@render recentlyEditedDocs()}
    {@render recentlyCreatedDocs()}
</div>

<style>
    .section-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
        row-gap: 30px;

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

            width: calc((100% - 20px) / 3);

            box-shadow: 0px 0px 2px rgb(167, 167, 167);
            color: black;

            box-sizing: border-box;
            padding-block: 10px;
            padding-inline: 20px;

            border-radius: 10px;

            &:hover .guide-title {
                text-decoration: underline;
            }
            &[data-theme="dark"] {
                color: white;
                box-shadow: 0px 0px 3px rgb(151, 151, 151);
                /*background-color: #1c1c1c;*/
            }
            &[data-isMobile="true"] {
                width: 100%;
            }
        }

        & .guide-title {
            font-weight: bold;
            font-size: 22px;
        }
    }

    .recent-doc-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        row-gap: 8px;
    }

    .recent-doc {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        box-sizing: border-box;
        padding-inline: 8px;
        padding-block: 4px;

        box-shadow: 0px 0px 2px rgb(167, 167, 167);
        border-radius: 5px;

        color: inherit;

        & .title,
        & .editor,
        & .date {
            transform: translateY(-1px);
        }

        & .title {
            font-weight: 500;
        }

        & .editor,
        & .date {
            font-size: 13px;
            color: gray;
        }

        &:hover .title {
            text-decoration: underline;
        }

        &[data-theme="dark"] {
            box-shadow: 0px 0px 3px rgb(151, 151, 151);
            /*background-color: #1c1c1c;*/
        }
    }
</style>
