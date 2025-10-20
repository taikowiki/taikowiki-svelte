<script lang="ts">
    import { goto } from "$app/navigation";
    import PollEditor from "$lib/components/page/admin/poll/PollEditor.svelte";
    import { Layout } from "$lib/module/layout";
    import { Poll } from "$lib/module/poll/poll.client";
    import { DateTime } from "luxon";

    const untilInit = DateTime.now().setZone(Layout.getTimezone()).set({
        hour: 23,
        minute: 59,
        second: 59
    });
    let poll: Poll.DataWithoutId = $state({
        sections: [],
        until: untilInit.toJSDate()
    });

    async function submit(){
        const response = await Poll.Client.adminRequest.addPoll(poll);

        if(response.status === "success"){
            alert('추가 완료');
            await goto('/admin/poll');
        }
        else{
            alert(`에러 발생: ${response.reason}`)
        }
    }
</script>

<PollEditor bind:poll />
<div class="container">
    <button onclick={submit} class="standard">제출</button>
</div>

<style>
    .container {
        width: 100%;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 30px;
        margin-bottom: 10px;
    }
</style>