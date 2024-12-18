<script lang="ts">
    let {data} = $props();

    const linkDatas = [
        {
            name: "서열표 관리",
            href: "/admin/diffchart",
        },

        {
            name: "곡 관리",
            href: "/admin/song",
        },

        {
            name: "공지 관리",
            href: "/admin/notice",
        },

        {
            name: "유저 관리",
            href: "/admin/user",
        },

        {
            name: "오락실 관리",
            href: "/admin/gamecenter",
        },

        {
            name: "단위도장 관리",
            href: "/admin/dani",
        },
    ];
</script>

{#each linkDatas as linkData}
    <div>
        <a href={linkData.href}>{linkData.name}</a>
    </div>
{/each}

{#if data.grade === 10}
    <div>
        <a href="/admin/banner">배너 관리</a>
    </div>
{/if}

<div data-type="upload">
    <a href="/admin/upload">이미지 업로드</a>
</div>