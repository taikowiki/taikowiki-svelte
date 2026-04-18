<script lang="ts">
    let { data } = $props();

    const linkDatas = [
        {
            name: "서열표 관리",
            href: "/admin/diffchart",
            grade: 9,
        },
        {
            name: "곡 관리",
            href: "/admin/song",
            grade: 7,
        },
        {
            name: "공지 관리",
            href: "/admin/notice",
            grade: 9,
        },
        {
            name: "유저 관리",
            href: "/admin/user",
            grade: 9,
        },
        {
            name: "오락실 관리",
            href: "/admin/gamecenter",
            grade: 9,
        },
        {
            name: "단위도장 관리",
            href: "/admin/dani",
            grade: 9,
        },
        {
            name: "설문 관리",
            href: "/admin/poll",
            grade: 9,
        },
    ];
</script>

{#each linkDatas as linkData}
    {#if typeof(data.grade) === "number" && data.grade >= linkData.grade}
        <div>
            <a href={linkData.href}>{linkData.name}</a>
        </div>
    {/if}
{/each}

{#if data.grade === 10}
    <div>
        <a href="/admin/banner">배너 관리</a>
    </div>
{/if}
