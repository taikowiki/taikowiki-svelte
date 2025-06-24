<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { Notice } from "$lib/module/notice";
    import "$lib/module/notice/notice.client";
    import { getI18N, getLang } from "$lib/module/i18n";
    import { DateTime } from "luxon";

    //props
    interface Props {
        notices: Omit<Notice.Notice, "content">[];
    }

    let { notices }: Props = $props();

    //time
    function getTime(date: Date) {
        if (date.getDate() === new Date().getDate()) {
            return DateTime.fromJSDate(date).toFormat("HH:mm:ss");
        } else {
            return DateTime.fromJSDate(date).toFormat("yyyy-MM-dd");
        }
    }

    //delete
    async function deleteNotice(order: number) {
        if (!confirm("삭제하시겠습니까?")) {
            return;
        }
        const response = await Notice.Client.adminRequest.deleteNotice({ order });
        if (response.status === "success") {
            alert("삭제 완료.");
            notices = notices.filter((e) => e.order !== order);
        } else {
            alert("삭제 오류.");
        }
    }

    const [theme] = getTheme();
    const isMobile = getIsMobile();
    const lang = getLang();
    let i18n = $derived(getI18N("/notice", $lang));
</script>

<table data-theme={$theme} data-isMobile={$isMobile}>
    <thead>
        <tr>
            <th> 번호 </th>
            <th> 제목 </th>
            <th> 작성일 </th>
            <th> 삭제 </th>
        </tr>
    </thead>
    <tbody>
        {#each notices.toSorted((a, b) => b.order - a.order) as notice}
            <tr>
                <td class="td-order" width="40px">
                    {notice.order}
                </td>
                <td class="td-title">
                    <a href={`/admin/notice/edit/${notice.order}`}>
                        {`[${i18n.type[notice.type]}]`}{notice.title}
                    </a>
                </td>
                <td class="td-date">
                    {getTime(notice.officialDate ?? notice.writtenDate)}
                </td>
                <td class="td-delete" width="50px">
                    <button
                        onclick={() => {
                            deleteNotice(notice.order);
                        }}
                    >
                        삭제
                    </button>
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    tr {
        border-bottom: 1px solid black;
    }
    table[data-theme="dark"] tr {
        border-color: gray;
    }

    td:not(:nth-last-child(1)) {
        border-right: 1px solid black;
    }
    table[data-theme="dark"] td {
        border-color: gray;
    }
    .td-date {
        width: 100px;
    }
    .td-title {
        padding-inline: 2px;
    }
    .td-order,
    .td-date,
    .td-delete {
        text-align: center;
    }

    tbody tr {
        height: 30px;
    }
    table[data-isMobile="true"] tbody tr {
        height: 35px;
    }
</style>
