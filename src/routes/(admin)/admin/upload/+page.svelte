<script lang="ts">
    import axios from "axios";

    let fileInput: HTMLInputElement;

    let fileLog: { originalFileName: string; fileName: string }[] = [];

    async function uploadFile() {
        const file = (fileInput.files as FileList)[0];

        const formData = new FormData();
        formData.append("file", file);

        let originalFileName = file.name;

        try {
            const response = await axios({
                method: "post",
                url: "https://file.taiko.wiki/upload/img",
                data: formData,
                withCredentials: true
            });

            fileLog.push({originalFileName, fileName: response.data.fileName});
            fileLog = fileLog;
        } catch {
            alert("업로드 실패");
        }

        fileInput.value = '';
    }
</script>

<input type="file" bind:this={fileInput} />
<button on:click={uploadFile}>업로드</button>
<table>
    <tr>
        <th> 원본 파일명 </th>
        <th> 새 파일명 </th>
        <th> 주소 </th>
    </tr>
    {#each fileLog as log}
        <tr>
            <td>
                {log.originalFileName}
            </td>
            <td>
                {log.fileName}
            </td>
            <td>
                {`https://file.taiko.wiki/img/${log.fileName}`}
            </td>
        </tr>
    {/each}
</table>

<style>
    table{
        border-collapse: collapse;
    }
    td{
        border: 1px solid black;
    }
</style>
