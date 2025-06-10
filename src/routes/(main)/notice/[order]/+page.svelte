<script lang="ts">
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n.js";
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import { DateTime } from "luxon";
    import { Notice } from "$lib/module/notice/index.js";
    import "$lib/module/notice/notice.client";
   
    let {data} = $props();
    const {notice} = data;

    //time
    function getTime(date: Date) {
        return DateTime.fromJSDate(date).toFormat("yyyy-MM-dd HH:mm:ss");
    }

    const lang = getLang();
    let i18n = $derived(getI18N('/notice', $lang));
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
    {@html Notice.Client.convertNoticeMd(notice.content)}
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