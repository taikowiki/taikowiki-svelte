<script lang="ts">
    import dayjs from "dayjs";
    import utc from "dayjs/plugin/utc";
    import timezone from "dayjs/plugin/timezone";
    import { convertNoticeMd } from "$lib/module/common/notice/notice.client";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n.js";
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    export let data;

    const {notice} = data;

    //time
    dayjs.extend(utc);
    dayjs.extend(timezone);
    const timeZone = dayjs.tz.guess();
    function getTime(date: Date) {
        return dayjs(date).tz(timeZone).format("YYYY-MM-DD HH:mm:ss");
    }

    const lang = getLang();
    $: i18n = getI18N('/notice', $lang);
</script>

<PageTitle title={`[${i18n.type[notice.type]}]${notice.title}`}/>
<a class="tiny" href="/notice">
    공지
</a>
<h2>
    {`[${i18n.type[notice.type]}]`}{notice.title}
</h2>
<div class="tiny">
    {getTime(notice.officialDate ?? notice.writtenDate)}
</div>
<div class="notice-content">
    {@html convertNoticeMd(notice.content)}
</div>

<style>
    .tiny{
        font-size: 14px;
    }
    div.tiny{
        color: gray;
    }

    h2{
        margin-block: 2px;
    }
</style>