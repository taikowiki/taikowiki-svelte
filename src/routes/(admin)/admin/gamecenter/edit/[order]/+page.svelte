<script lang="ts">
    import GamecenterEditor from "$lib/components/page/admin/gamecenter/GamecenterEditor.svelte";
    import { type GameCenterData } from "$lib/module/page/gamecenter/types.js";
    import { gamecenterAdminRequestor } from "$lib/module/page/gamecenter/gamecenter.client.js";
    import { goto } from "$app/navigation";

    export let data;
    const { gamecenterData } = data;

    async function submit(gamecenterData: GameCenterData){
        if(!gamecenterData.name){
            alert('이름을 입력해주세요.');
            return;
        }
        if(!gamecenterData.address){
            alert('주소를 입력해주세요.');
            return;
        }
        if(gamecenterData.machines.length === 0){
            alert('기체 정보를 입력해주세요.');
            return;
        }

        const response = await gamecenterAdminRequestor.edit({gamecenterData});

        if(response.status === "error"){
            alert('오류가 발생했습니다.');
            return;
        }
        else{
            alert('수정이 완료되었습니다.');
            await goto('/admin/gamecenter');
            return;
        }
    }
</script>

<div class="container">
    <GamecenterEditor {gamecenterData} {submit}/>
</div>

<style>
    .container{
        padding-inline: 10px;
    }
</style>