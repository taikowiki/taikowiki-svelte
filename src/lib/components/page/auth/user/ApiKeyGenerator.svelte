<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";

    const [theme] = getTheme();

    let key = $state<string | undefined>();

    async function generate() {
        const response = await fetch("/api/user/apikey");

        if (response.status === 200) {
            key = await response.text();
        } else {
            alert("갱신에 실패했습니다.");
        }
    }

    function copy() {
        if (!key) {
            alert("복사 실패");
            return;
        }
        try {
            navigator.clipboard.writeText(key);
            alert("복사 완료");
        } catch {
            alert("복사 실패");
        }
    }
</script>

<div class="div-tr">
    <div class="div-td">Api Key 발급</div>
    <div class="div-td">
        <button class="standard" data-theme={$theme} onclick={generate}>
            갱신
        </button>
        {#if key}
            <div class="key-container">
                <div class="warning text-container">
                    Api Key는 다시 확인할 수 없습니다. 잃어버렸을 경우
                    갱신해야합니다.
                    <button class="standard" data-theme={$theme} onclick={copy}> 복사 </button>
                </div>
                <div class="text-container">
                    {key}
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .key-container {
        margin-top: 10px;
    }
    .warning {
        color: red;
    }
    .text-container {
        word-break: break-all;
    }
</style>
