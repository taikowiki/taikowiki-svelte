<script lang="ts">
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { Gamecenter } from "$lib/module/gamecenter";

    interface Props {
        gamecenterData: Gamecenter.GamecenterWithoutOrder;
        submit: (gamecenterData: Gamecenter.GamecenterWithoutOrder) => any;
    }

    let {gamecenterData, submit}: Props = $props();

    let gamecenterDataState = $state(gamecenterData);

    const lang = getLang();
    let i18n = $derived(getI18N("/gamecenter", $lang));
</script>

<h1>오락실 정보 수정</h1>

<div class="field">
    <h3>이름</h3>
    <input type="text" bind:value={gamecenterDataState.name} placeholder="이름" />
</div>

<div class="field">
    <h3>주소</h3>
    <input type="text" bind:value={gamecenterDataState.address} placeholder="주소" />
</div>

<div class="field">
    <h3>지역</h3>
    <select bind:value={gamecenterDataState.region}>
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
                bind:checked={gamecenterDataState.amenity[amenity]}
            />
            {i18n.amenity[amenity]}
        </label>
    {/each}
</div>

<div class="field">
    <h3>기체</h3>
    {#each gamecenterDataState.machines as machine, index}
        <div>
            가격 <input type="number" bind:value={machine.price} />
            튠 수 <input type="number" bind:value={machine.tunes} />
            대수 <input type="number" bind:value={machine.count} />
            <button
                onclick={() => {
                    gamecenterDataState.machines = gamecenterDataState.machines.filter(
                        (_, i) => i !== index,
                    );
                }}
            >
                삭제
            </button>
        </div>
    {/each}
    <button
        onclick={() => {
            gamecenterDataState.machines.push({ price: 0, tunes: 0, count: 0 });
        }}
    >
        기체 추가
    </button>
</div>

<div class="field">
    <h3>영업시간</h3>
    {#each ([0, 1, 2, 3, 4, 5, 6] as const) as day}
        <div>
            {i18n.date[day]}
            <input type="text" bind:value={gamecenterDataState.businessHours[day]} />
        </div>
    {/each}
</div>

<button
    onclick={() => {
        submit($state.snapshot(gamecenterDataState));
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
