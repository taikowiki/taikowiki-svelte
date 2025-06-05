<script lang="ts">
    import { goto } from "$app/navigation";
    import AdminNoticeEditor from "$lib/components/page/admin/notice/AdminNoticeEditor.svelte";
    import { NoticeClient } from "$lib/module/notice/notice.client";
    import type { Notice } from "$lib/module/notice";

    let notice: Omit<Notice.Notice, "order" | "writtenDate"> = $state({
        title: "",
        content: "",
        type: "wiki",
        officialDate: null,
    });

    async function submit() {
        if (!confirm("작성하시겠습니까?")) {
            return;
        }
        if (!notice.title) {
            alert("제목이 비어있습니다.");
            return;
        }
        if (!notice.content) {
            alert("내용이 비어있습니다.");
            return;
        }
        if (notice.type === "official" && !notice.officialDate) {
            alert("공식 공지 날짜가 비어있습니다.");
            return;
        }
        const result = await NoticeClient.adminRequest.writeNotice({ notice });
        if (result.status === "success") {
            alert("작성 성공");
            await goto("/admin/notice");
        } else {
            if (result.reason === "Empty Title or Content") {
                alert("제목 또는 내용이 비어있습니다.");
                return;
            }
            alert("오류가 발생했습니다.");
            return;
        }
    }
</script>

<AdminNoticeEditor bind:notice />
<button onclick={submit}> 제출 </button>

<style>
    button {
        margin-top: 2px;
    }
</style>
