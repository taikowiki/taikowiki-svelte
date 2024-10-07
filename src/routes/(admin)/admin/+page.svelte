<script lang="ts">
    export let data;
</script>

<div>
    <a href="/admin/diffchart">서열표 관리</a>
</div>

<div>
    <a href="/admin/song">곡 관리</a>
</div>

<div>
    <a href="/admin/notice">공지 관리</a>
</div>

{#if data.grade === 10}
    <div>
        <a href="/admin/banner">배너 관리</a>
    </div>
{/if}

<div>
    <a href="/admin/user">유저 관리</a>
</div>

<div>
    <a href="/admin/gamecenter">오락실 정보 관리</a>
</div>

<div>
    <a href="/admin/dani">단위도장 관리</a>
</div>

<div data-type="upload">
    <a href="/admin/upload">이미지 업로드</a>
</div>