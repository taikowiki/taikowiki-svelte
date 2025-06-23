<script lang="ts">
    import { goto } from "$app/navigation";
    import { DateTime } from "luxon";
    import { Doc } from "$lib/module/doc/doc.client";

    const {adminRequest} = Doc.Client;

    let { data } = $props();
    let docData = $derived(data.docData);
    let id = $derived(docData.id);

    let isDeleted = $state(data.docData.isDeleted);
    $effect(() => {
        isDeleted = docData.isDeleted;
    })

    let grade = $state(data.docData.editableGrade);
    $effect(() => {
        grade = docData.editableGrade;
    });

    function dateToFormat(date: Date) {
        return DateTime.fromJSDate(date, { zone: "asia/seoul" }).toFormat(
            "yyyy-MM-dd HH:mm:ss",
        );
    }

    async function changeGrade(grade: number) {
        if (!confirm("문서 수정 권한을 변경하시겠습니까?")) {
            return;
        }

        const response = await adminRequest.changeEditableGrade(id, grade);
        if (response.status === "success") {
            alert("변경되었습니다.");
        } else if (response.statusCode === 403) {
            alert("권한이 없습니다.");
        } else {
            alert("오류가 발생했습니다.");
        }
    }

    async function deleteDoc() {
        if (!confirm("문서를 삭제하시겠습니까?")) {
            return;
        }

        const response = await adminRequest.delete(id);
        if (response.status === "success") {
            alert("삭제되었습니다.");
            isDeleted = true;
        } else if (response.statusCode === 403) {
            alert("권한이 없습니다.");
        } else {
            alert("오류가 발생했습니다.");
        }
    }

    async function hardDeleteDoc() {
        if (!confirm("문서를 완전히 삭제하시겠습니까?")) {
            return;
        }

        const response = await adminRequest.hardDelete(id);
        if (response.status === "success") {
            alert("삭제되었습니다.");
            await goto(`/doc`);
        } else if (response.statusCode === 403) {
            alert("권한이 없습니다.");
        } else {
            alert("오류가 발생했습니다.");
        }
    }

    async function restoreDoc(){
        if (!confirm("문서를 복구하시겠습니까?")) {
            return;
        }

        const response = await adminRequest.restore(id);
        if (response.status === "success") {
            alert("복구되었습니다.");
            isDeleted = false;
        } else if (response.statusCode === 403) {
            alert("권한이 없습니다.");
        } else {
            alert("오류가 발생했습니다.");
        }
    }
</script>

<table>
    <thead>
        <tr>
            <th> ID </th>
            <th> 제목 </th>
            <th> 타입 </th>
            <th> 버전 </th>
            <th> 문서 생성 시각 </th>
            <th> 최근 수정 시각 </th>
            <th> 삭제 </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                {docData.id}
            </td>
            <td>
                {docData.title}
            </td>
            <td>
                {#if docData.type === "normal"}
                    일반
                {:else if docData.type === "song"}
                    곡: {docData.songNo}
                {:else}
                    리다이렉트: <a href={`/admin/doc/m/${docData.redirectTo}`}
                        >{docData.redirectTo}</a
                    >
                {/if}
            </td>
            <td>
                {docData.version}
            </td>
            <td>
                {dateToFormat(docData.createdTime)}
            </td>
            <td>
                {dateToFormat(docData.editedTime)}
            </td>
            <td>
                {isDeleted}
            </td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr>
            <th> 수정 권한 변경 </th>
            <th>
                {isDeleted ? "문서 복구" : "문서 삭제"}
            </th>
            <th>
                완전 삭제
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>
                <select bind:value={grade}>
                    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as num}
                        <option value={num}>{num}</option>
                    {/each}
                </select>
                <button
                    onclick={() => {
                        changeGrade(grade);
                    }}
                >
                    적용
                </button>
            </th>
            <th>
                {#if isDeleted}
                    <button
                        onclick={() => {
                            restoreDoc();
                        }}
                    >
                        복구하기
                    </button>
                {:else}
                    <button
                        onclick={() => {
                            deleteDoc();
                        }}
                    >
                        삭제하기
                    </button>
                {/if}
            </th>
            <th>
                <button
                        onclick={() => {
                            hardDeleteDoc();
                        }}
                    >
                        완전 삭제하기
                    </button>
            </th>
        </tr>
    </tbody>
</table>

<style>
    table {
        border-collapse: collapse;
        margin-bottom: 5px;
    }
    th,
    td {
        border: 1px solid black;
    }
</style>
