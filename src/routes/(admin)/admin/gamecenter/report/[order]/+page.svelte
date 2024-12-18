<script lang="ts">
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import {
        GAMECENTERREGION,
        AMENITY,
    } from "$lib/module/common/gamecenter/const.js";
    import { gamecenterAdminRequestor } from "$lib/module/common/gamecenter/gamecenter.client";
    import { goto } from "$app/navigation";

    let { data } = $props();
    const { report, nickname } = data;
    const { data: gamecenterData } = report;

    const lang = getLang();
    let i18n = $derived(getI18N("/gamecenter", $lang));

    async function approve(order: number) {
        if (!confirm("수락하시겠습니까?")) {
            return;
        }

        const response = await gamecenterAdminRequestor.approve({ order });

        if (response.status === "success") {
            alert("완료되었습니다.");
            await goto("/admin/gamecenter/report");
            return;
        } else {
            alert("에러 발생.");
            return;
        }
    }
    async function disapprove(order: number) {
        if (!confirm("거부하시겠습니까?")) {
            return;
        }

        const response = await gamecenterAdminRequestor.disapprove({ order });

        if (response.status === "success") {
            alert("완료되었습니다.");
            await goto("/admin/gamecenter/report");
            return;
        } else {
            alert("에러 발생.");
            return;
        }
    }
</script>

<div class="container">
    <h1>오락실 정보 수정</h1>

    <div class="field">
        <h3>닉네임, UUID</h3>
        {nickname}, {report.UUID}
    </div>

    <div class="field">
        <h3>이름</h3>
        <input
            readonly
            type="text"
            bind:value={gamecenterData.name}
            placeholder="이름"
        />
    </div>

    <div class="field">
        <h3>주소</h3>
        <input
            readonly
            type="text"
            bind:value={gamecenterData.address}
            placeholder="주소"
        />
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
                    readonly
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
                가격 <input readonly type="number" bind:value={machine.price} />
                튠 수
                <input readonly type="number" bind:value={machine.tunes} />
                대수 <input readonly type="number" bind:value={machine.count} />
                <button
                    onclick={() => {
                        gamecenterData.machines =
                            gamecenterData.machines.filter(
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
                <input
                    readonly
                    type="text"
                    bind:value={gamecenterData.businessHours[day]}
                />
            </div>
        {/each}
    </div>

    <button
        onclick={() => {
            approve(report.order);
        }}
    >
        수락
    </button>
    <button
        onclick={() => {
            disapprove(report.order);
        }}
    >
        거부
    </button>
</div>

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

    .container {
        padding-inline: 10px;
    }
</style>
