<script lang="ts" module>
    import { goto } from "$app/navigation";

    async function submit(gamecenterData: Omit<Gamecenter.Gamecenter, 'order' | 'favoriteCount' | 'coor'>){
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

        if(!confirm('제출 시 제출한 사용자를 구분하기 위해 IP주소가 수집됩니다.\n동의하십니까?')){
            alert('동의하지 않아 제출이 실패되었습니다.');
            return;
        }

        const response = await Gamecenter.Client.request.report({gamecenterData});

        if(response.status === "error"){
            alert('오류가 발생했습니다.');
            return;
        }
        else{
            alert('제보가 완료되었습니다.');
            await goto('/gamecenter');
            return;
        }
    }
</script>

<script lang="ts">
    import { getI18N, getLang } from "$lib/module/i18n";
    import { Gamecenter } from "$lib/module/gamecenter";
    import "$lib/module/gamecenter/gamecenter.client";

    let gamecenterData: Omit<Gamecenter.Gamecenter, 'order' | 'favoriteCount' | 'coor'> = $state({
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
    });

    const lang = getLang();
    let i18n = $derived(getI18N('/gamecenter', $lang));
</script>

<h1>오락실 제보</h1>

<div class="field">
    <h3>이름</h3>
    <input type="text" bind:value={gamecenterData.name} placeholder="이름" />
</div>

<div class="field">
    <h3>주소</h3>
    <input type="text" bind:value={gamecenterData.address} placeholder="주소" />
</div>

<div class="field">
    <h3>지역</h3>
    <select bind:value={gamecenterData.region}>
        {#each Gamecenter.CONST.GAMECENTERREGION as region}
            <option value={region}>
                {region}
            </option>
        {/each}
    </select>
</div>

<div class="field">
    <h3>편의시설</h3>
    {#each Gamecenter.CONST.AMENITY as amenity}
        <label>
            <input
                type="checkbox"
                bind:checked={gamecenterData.amenity[amenity]}
            />
            {i18n.amenity[amenity]}
        </label>
    {/each}
</div>

<div class="field">
    <h3>기체</h3>
    {#each gamecenterData.machines as machine, index}
        <div>
            가격 <input type="number" bind:value={machine.price}>
            튠 수 <input type="number" bind:value={machine.tunes}>
            대수 <input type="number" bind:value={machine.count}>
            <button onclick={() => {gamecenterData.machines = gamecenterData.machines.filter((_,i) => i !== index)}}>
                삭제
            </button>
        </div>
    {/each}
    <button onclick={() => {gamecenterData.machines = [...gamecenterData.machines, {price: 0, tunes: 0, count: 0}]}}>
        기체 추가
    </button>
</div>

<div class="field">
    <h3>영업시간</h3>
    {#each ([0,1,2,3,4,5,6] as const) as day}
        <div>
            {i18n.date[day]} <input type="text" bind:value={gamecenterData.businessHours[day]}>
        </div>
    {/each}
</div>

<button onclick={() => {submit(gamecenterData)}}>
    제출하기
</button>

<style>
    h3 {
        margin-top: 0;
        margin-bottom: 5px;
    }

    .field {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    select{
        height: 24px;
        font-size: 15px;
    }
</style>
