<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { wikiDocRequestor } from "$lib/module/common/wikidoc/requestor.client";
    import { getTheme } from "$lib/module/layout/theme";
    import type {Doc} from '$lib/module/common/wikidoc/types';

    interface Props {
        wikiDoc: Doc.Data.WikiDocData;
        type?: "create" | "update";
    }

    let { wikiDoc, type = "create" }: Props = $props();

    const [theme] = getTheme();

    let submitAgree = $state(false);
    let submit = $derived(type === "create" ? create : update);
    let disabled = $state(false);

    async function create() {
        if (!submitAgree || disabled) {
            return;
        }
        disabled = true;

        const response = await wikiDocRequestor.uploadNew({ docData: wikiDoc });
        if (response.status === "success") {
            await goto(`/doc/r/${encodeURIComponent(wikiDoc.title)}`);
        } else {
            console.log(response);
            alert(getErrorMsg(response.reason));
            disabled = false;
        }
    }

    async function update() {
        if (!submitAgree) {
            return;
        }
        disabled = true;
        const id = Number(page.params.id);
        if (Number.isNaN(id)) {
            alert("오류가 발생했습니다.");
            return;
        }

        const response = await wikiDocRequestor.update({
            id,
            docData: wikiDoc,
        });
        if (response.status === "success") {
            await goto(`/doc/r/${encodeURIComponent(wikiDoc.title)}`);
        } else {
            console.log(response);
            alert(getErrorMsg(response.reason));
            disabled = false;
        }
    }

    function getErrorMsg(reason: string | undefined) {
        let errorMsg = "오류가 발생했습니다.";
        switch (reason) {
            case "DUPLICATED_TITLE": {
                errorMsg = "해당 제목의 문서가 이미 존재합니다.";
                break;
            }
            case "DUPLICATED_SONG_NO": {
                errorMsg = "해당 곡 번호에 연결된 문서가 이미 존재합니다.";
                break;
            }
            case "EMPTY_TITLE": {
                errorMsg = "제목이 비어있습니다.";
                break;
            }
            case "INVALID_DOC_DATA_TYPE": {
                errorMsg = "문서 형식이 올바르지 않습니다.";
                break;
            }
            case "DOC_DATA_ERR": {
                errorMsg = "문서 데이터가 잘못되었습니다.";
                break;
            }
            case "REDIRECT_DOC_NOT_EXISTS": {
                errorMsg = "리다이렉트할 문서가 없습니다.";
                break;
            }
            case "SONG_NOT_EXISTS": {
                errorMsg = "연결할 곡 번호를 가진 곡이 존재하지 않습니다.";
                break;
            }
            case "ID_NOT_EXISTS": {
                errorMsg = "수정할 문서의 ID가 잘못되었습니다.";
                break;
            }
            case "NOT_LOGINED": {
                errorMsg = "로그인 되어있지 않습니다.";
                break;
            }
            case "LOW_GRADE": {
                errorMsg = "권한이 낮습니다.";
                break;
            }
        }
        return errorMsg;
    }
</script>

<div class="submit-container">
    <label class="submit-agree">
        <input type="checkbox" bind:checked={submitAgree} />
        제출 시 당신은 기여한 내용을 CC-BY-NC-SA 라이센스로 배포하고, 기여한 내용에
        대한 모든 책임은 본인에게 있음에 동의합니다. 기여한 내용과 당신의 IP주소,
        UUID가 영구히 기록됩니다.이 동의는 철회할 수 없습니다.
    </label>
    <button
        class="submit-btn"
        onclick={submit}
        data-theme={$theme}
        disabled={disabled || !submitAgree}
    >
        제출
    </button>
</div>

<style>
    .submit-btn {
        border-radius: 5px;
        background-color: #cf4844;
        color: white;
        border: 0;
        cursor: pointer;
        height: 22px;
    }
    .submit-btn[data-theme="dark"] {
        background-color: #1c1c1c;
    }
    .submit-btn:disabled {
        cursor: default;
        opacity: 0.7;
    }

    .submit-container {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        row-gap: 5px;
    }
    .submit-btn {
        width: 100px;
        height: 26px;
        font-size: 16px;
    }
</style>
