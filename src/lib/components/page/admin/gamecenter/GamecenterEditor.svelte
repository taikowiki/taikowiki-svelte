<script lang="ts">
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import {
        AMENITY,
        GAMECENTERREGION,
    } from "$lib/module/common/gamecenter/const";
    import type { GameCenterData, GameCenterDataWithoutOrder } from "$lib/module/common/gamecenter/types";

    export let gamecenterData: GameCenterDataWithoutOrder;
    export let submit: (gamecenterData: GameCenterDataWithoutOrder) => any;

    const lang = getLang();
    $: i18n = getI18N("/gamecenter", $lang);
</script>

<h1>오락실 정보 수정</h1>

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
        {#each GAMECENTERREGION as region}
            <option value={region}>
                {region}
            </option>
        {/each}
    </select>
</div>

<div class="field">
    <h3>편의시설</h3>
    {#each AMENITY as amenity}
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
            가격 <input type="number" bind:value={machine.price} />
            튠 수 <input type="number" bind:value={machine.tunes} />
            대수 <input type="number" bind:value={machine.count} />
            <button
                on:click={() => {
                    gamecenterData.machines = gamecenterData.machines.filter(
                        (_, i) => i !== index,
                    );
                }}
            >
                삭제
            </button>
        </div>
    {/each}
    <button
        on:click={() => {
            gamecenterData.machines = [
                ...gamecenterData.machines,
                { price: 0, tunes: 0, count: 0 },
            ];
        }}
    >
        기체 추가
    </button>
</div>

<div class="field">
    <h3>영업시간</h3>
    {#each [0, 1, 2, 3, 4, 5, 6] as day}
        <div>
            {i18n.date[day]}
            <input type="text" bind:value={gamecenterData.businessHours[day]} />
        </div>
    {/each}
</div>

<button
    on:click={() => {
        submit(gamecenterData);
    }}
>
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

    select {
        height: 24px;
        font-size: 15px;
    }
</style>
