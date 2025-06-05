<script lang="ts">
    import { Banner } from "$lib/module/banner";
    import "$lib/module/banner/banner.client";

    interface Props {
        banners: Banner.MainBanner[];
    }

    let { banners }: Props = $props();

    async function submit() {
        if (!confirm("저장하시겠습니까?")) {
            return;
        }

        const response = await Banner.Client.adminRequest.updateMainBanner({
            banners,
        });

        if (response.status === "success") {
            alert("저장 완료");
        } else {
            alert("저장 오류");
        }
    }
</script>

<h2>
    메인페이지 배너
    <button
        onclick={() => {
            banners.unshift({
                src: "",
                size: "narrow",
                href: "",
                target: "",
            });
        }}
    >
        앞에 추가
    </button>
    <button
        onclick={() => {
            banners.push({
                src: "",
                size: "narrow",
                href: "",
                target: "",
            });
        }}
    >
        뒤에 추가
    </button>
    <button onclick={submit}> 저장 </button>
</h2>
<div class="container">
    {#each banners as banner, index}
        <div class="banner-data-container">
            <table class="banner-data">
                <tbody>
                    <tr>
                        <td class="key"> 이미지 주소 </td>
                        <td class="value">
                            <div class="input-container">
                                <input type="text" bind:value={banner.src} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="key"> 크기 </td>
                        <td class="value">
                            <select bind:value={banner.size}>
                                <option value="narrow"> 좁음 </option>
                                <option value="wide"> 넓음 </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="key"> 링크 </td>
                        <td>
                            <div class="input-container">
                                <input type="text" bind:value={banner.href} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="key"> target </td>
                        <td>
                            <select bind:value={banner.target}>
                                <option value=""> none </option>
                                {#each ["blank", "parent", "self", "top"] as t}
                                    <option value={"_" + t}>
                                        {t}
                                    </option>
                                {/each}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="key"> 삭제 </td>
                        <td>
                            <button
                                onclick={() => {
                                    banners = banners.filter(
                                        (_, i) => i !== index,
                                    );
                                }}
                            >
                                삭제
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    {/each}
</div>

<style>
    .container {
        width: 100%;
    }

    .banner-data-container {
        width: 100%;
        border: 2px solid black;

        box-sizing: border-box;
    }
    .banner-data {
        width: 100%;
        border-collapse: collapse;
    }

    td {
        border: 1px solid black;
    }
    td.key {
        width: 100px;
        text-align: center;
    }

    .input-container {
        width: 100%;
        display: flex;
    }
    input[type="text"] {
        flex: 1 1 auto;
    }
</style>
