<script lang="ts">
    import { getLang, getI18N } from "$lib/module/common/i18n/i18n";
    import { DANIVERSION } from "$lib/module/common/song/const";
    import { DaniClient } from "$lib/module/dani/dani.client";

    let {data} = $props();

    const { versions } = data;

    versions.sort((a, b) => {
        return DANIVERSION.indexOf(b) - DANIVERSION.indexOf(a);
    });

    const lang = getLang();
    let versionI18n = $derived(getI18N("other", $lang).dani.version);

    let newVersion: string = $state("");

    async function addVersion(version: string){
        const response = await DaniClient.adminRequest.addVersion(version);
        if(response.status === 'success'){
            versions.push(version as any);
            alert('버전 추가 완료');
        }
        else{
            alert('버전 추가 에러');
        }
    }
</script>

<div class="container">
    <div class="add">
        <input type="text" placeholder="버전" bind:value={newVersion} />
        <button onclick={() => {addVersion(newVersion)}}> 추가 </button>
    </div>
    {#each versions as version}
        <div>
            <a href={`/admin/dani/${version}`}>
                {versionI18n[version] == '' ? version : versionI18n[version]}
            </a>
        </div>
    {/each}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
    }
</style>
