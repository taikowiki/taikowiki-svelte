<script lang="ts">
    import { GamecenterClient } from "$lib/module/gamecenter/gamecenter.client";

    let {data} = $props();
    let gamecenterDatas = $state(data.gamecenterDatas);

    async function deleteGamecenter(order: number) {
        if (!confirm("정말 삭제하시겠습니까?")) {
            return;
        }

        const response = await GamecenterClient.adminRequest.delete({ order });

        if (response.status === "success") {
            alert("삭제가 완료되었습니다.");
            return response;
        } else {
            alert("에러 발생.");
            return response;
        }
    }
</script>

<a href={`/admin/gamecenter/add`}> 추가하기 </a>
<a href={`/admin/gamecenter/report`}> 제보확인 </a>
<table>
    <thead>
        <tr>
            <th> order </th>
            <th> 이름 </th>
            <th> 수정 </th>
            <th> 삭제 </th>
        </tr>
    </thead>
    <tbody>
        {#each gamecenterDatas as gamecenterData}
            <tr>
                <td>
                    {gamecenterData.order}
                </td>
                <td>
                    {gamecenterData.name}
                </td>
                <td>
                    <a href={`/admin/gamecenter/edit/${gamecenterData.order}`}>
                        수정하기
                    </a>
                </td>
                <td>
                    <button
                        onclick={() => {
                            deleteGamecenter(gamecenterData.order).then(
                                (response) => {
                                    if (response?.status === "success") {
                                        gamecenterDatas =
                                            gamecenterDatas.filter(
                                                (data) =>
                                                    data.order !==
                                                    gamecenterData.order,
                                            );
                                    }
                                },
                            );
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

    td {
        text-align: center;
        border: 1px solid black;
    }

    tr:hover {
        background-color: rgb(255, 199, 199);
    }
</style>
