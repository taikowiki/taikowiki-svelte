<script lang="ts">
    import { songAdminRequestor } from "$lib/module/common/song/song.client";
    import axios from "axios";

    export let data;

    let { fileLog } = data;

    let fileInput: HTMLInputElement;
    let url: string = "";

    async function uploadFile() {
        const file = (fileInput.files as FileList)[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            let originalFileName = file.name;

            try {
                const response = await axios({
                    method: "post",
                    url: "https://file.taiko.wiki/upload/img",
                    data: formData,
                    withCredentials: true,
                });

                fileLog = [
                    { originalFileName, fileName: response.data.fileName },
                    ...fileLog,
                ];
            } catch {
                alert("업로드 실패");
            }

            fileInput.value = "";
        } else {
            if (!url) {
                alert("업로드 실패");
                return;
            }

            try {
                const response = await axios({
                    method: "post",
                    url: "https://file.taiko.wiki/upload/link",
                    data: JSON.stringify({ url }),
                    withCredentials: true,
                });

                fileLog = [
                    { originalFileName: url, fileName: response.data.fileName },
                    ...fileLog,
                ];
            } catch {
                alert("업로드 실패");
            }

            url = "";
        }
    }
</script>

<input type="file" bind:this={fileInput} />
또는
<input type="text" bind:value={url} placeholder="링크" />
<button on:click={uploadFile}>업로드</button>
<table>
    <thead>
        <tr>
            <th> 원본 파일명 </th>
            <th> 새 파일명 </th>
            <th> 주소 </th>
            <th> 복사 </th>
        </tr>
    </thead>
    <tbody>
        {#each fileLog as log}
            <tr>
                <td class="original">
                    {log.originalFileName}
                </td>
                <td>
                    {log.fileName}
                </td>
                <td>
                    {`https://file.taiko.wiki/img/${log.fileName}`}
                </td>
                <td>
                    <button
                        on:click={() => {
                            try {
                                navigator.clipboard.writeText(
                                    `https://file.taiko.wiki/img/${log.fileName}`,
                                );
                                alert("복사 완료");
                            } catch {
                                alert("복사 실패");
                            }
                        }}
                    >
                        복사
                    </button>
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        border-collapse: collapse;
    }
    td {
        border: 1px solid black;
    }

    button {
        word-break: keep-all;
    }

    .original {
        word-break: break-all;
    }
</style>
