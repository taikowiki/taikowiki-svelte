<script lang="ts">
    import { getLang, getI18N } from "$lib/module/i18n";
    import { Song } from "$lib/module/song/index.js";
    import { Dani } from "$lib/module/dani/index.js";
    import "$lib/module/dani/dani.client";

    const { DANIVERSION } = Song.CONST;

    let {data} = $props();

    const { versions } = data;

    versions.sort((a, b) => {
        return DANIVERSION.indexOf(b) - DANIVERSION.indexOf(a);
    });

    const lang = getLang();
    let versionI18n = $derived(getI18N("other", $lang).dani.version);

    let newVersion: string = $state("");

    async function addVersion(version: string){
        const response = await Dani.Client.adminRequest.addVersion(version);
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
