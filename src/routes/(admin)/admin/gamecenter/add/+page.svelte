<script lang="ts">
    import GamecenterEditor from "$lib/components/page/admin/gamecenter/GamecenterEditor.svelte";
    import { Gamecenter } from "$lib/module/gamecenter";
    import "$lib/module/gamecenter/gamecenter.client";
    import { goto } from "$app/navigation";

    const gamecenterData: Gamecenter.GamecenterWithoutOrder = {
        name: "",
        address: "",
        amenity: {
            water: false,
            toilet: false,
            park: false,
            capture: false,
            rental: false,
            night: false,
            atm: false,
            fan: false,
            mybachi: false,
        },
        machines: [],
        region: "서울",
        businessHours: {
            0: "",
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: "",
        },
        favoriteCount: 0,
        coor: {
            x: null,
            y: null
        }
    };

    async function submit(gamecenterData: Gamecenter.GamecenterWithoutOrder){
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

        const response = await Gamecenter.Client.adminRequest.add({gamecenterData});

        if(response.status === "error"){
            alert('오류가 발생했습니다.');
            return;
        }
        else{
            alert('추가가 완료되었습니다.');
            await goto('/admin/gamecenter');
            return;
        }
    }
</script>

<GamecenterEditor {gamecenterData} {submit}/>