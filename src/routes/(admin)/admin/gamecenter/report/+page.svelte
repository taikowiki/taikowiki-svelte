<script lang="ts">
    let {data} = $props();
    const { reports } = data;
</script>

<a href="/admin/gamecenter"> 돌아가기 </a>
<table>
    <thead>
        <tr>
            <th> order </th>
            <th> 이름 </th>
            <th> UUID </th>
            <th> ip </th>
            <th> 검토 </th>
        </tr>
    </thead>
    <tbody>
        {#each reports as report}
            <tr>
                <td>
                    {report.order}
                </td>
                <td>
                    {report.data.name}
                </td>
                <td>
                    {report.UUID}
                </td>
                <td>
                    {report.ip}
                </td>
                <td>
                    <a href={`/admin/gamecenter/report/${report.order}`}>
                        검토하기
                    </a>
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
        border: 1px solid black;
        text-align: center;
    }
</style>
