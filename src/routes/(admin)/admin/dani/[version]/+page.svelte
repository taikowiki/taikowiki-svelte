<script lang="ts">
    import AdminDaniEditor from "$lib/components/page/admin/dani/AdminDaniEditor.svelte";
    import { DaniClient } from "$lib/module/dani/dani.client.js";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n.js";

    let { data } = $props();
    let versionDaniData = $state(data.versionDaniData);

    function deleteDani(index: number) {
        if (confirm("정말 삭제하시겠습니까?")) {
            versionDaniData.data = versionDaniData.data.filter(
                (_, i) => i !== index,
            );
        }
    }

    function addTop() {
        versionDaniData.data.unshift({
            dan: "gaiden",
            name: {
                ko: "",
                ja: "",
            },
            version: versionDaniData.version,
            songs: [
                {
                    songNo: "",
                    difficulty: "oni",
                },
                {
                    songNo: "",
                    difficulty: "oni",
                },
                {
                    songNo: "",
                    difficulty: "oni",
                },
            ],
            conditions: [],
        });
    }

    function addBottom() {
        versionDaniData.data.push({
            dan: "gaiden",
            name: {
                ko: "",
                ja: "",
            },
            version: versionDaniData.version,
            songs: [
                {
                    songNo: "",
                    difficulty: "oni",
                },
                {
                    songNo: "",
                    difficulty: "oni",
                },
                {
                    songNo: "",
                    difficulty: "oni",
                },
            ],
            conditions: [],
        });
    }

    async function updateVersion() {
        if (!confirm("저장하시겠습니까?")) return;

        const response =
            await DaniClient.adminRequestor.updateVersion(versionDaniData);

        if (response.status === "success") {
            alert("저장 성공");
        } else {
            alert("저장 에러");
        }
    }

    const lang = getLang();
    let daniI18n = $derived(getI18N("other", $lang).dani);
</script>

<h1>
    {daniI18n.version[versionDaniData.version]}
</h1>

<button onclick={addTop}> 맨 위에 추가 </button>
<button onclick={updateVersion}> 저장 </button>

<div class="container">
    {#each versionDaniData.data as daniData, index (daniData)}
        <AdminDaniEditor
            bind:daniData={versionDaniData.data[index]}
            deleteDani={() => {
                deleteDani(index);
            }}
        />
    {/each}
</div>

<button onclick={addBottom}> 맨 아래에 추가 </button>

<style>
    .container {
        display: flex;
        flex-direction: column;
        row-gap: 10px;

        margin-block: 10px;
    }

    h1 {
        margin-block: 10px;
    }
</style>
