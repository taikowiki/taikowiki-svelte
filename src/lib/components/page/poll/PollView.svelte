<script lang="ts">
    import { Layout } from "$lib/module/layout";
    import { getTheme } from "$lib/module/layout/theme";
    import { Poll } from "$lib/module/poll/poll.client";
    import { DateTime } from "luxon";

    interface Props {
        poll: Poll.Data;
        answer?: Poll.Answer;
        closed?: boolean;
    }

    let { poll, answer, closed }: Props = $props();

    let answers = $state(createNewAnswers());
    let radioValue = $state<(string | null)[]>(createRadioValue());
    let freeAnswers = $state<string[]>(createfreeAnswers());
    $effect(() => {
        for (const i in radioValue) {
            if (radioValue[i] === null) {
                answers[i] = freeAnswers[i];
            } else {
                answers[i] = radioValue[i];
            }
        }
    });
    let submitted = $state(Boolean(answer));

    const timezone = Layout.getTimezone();
    const untilString = DateTime.fromJSDate(poll.until, {
        zone: timezone,
    }).toFormat("yyyy-MM-dd");
    const [theme] = getTheme();

    // 제출
    async function submit() {
        const response = await Poll.Client.request.submit(
            {
                dataId: poll.id,
                answers: $state.snapshot(answers),
            },
            Boolean(answer),
        );

        if (response.status === "success") {
            submitted = true;
            alert("제출 완료");
        } else {
            switch (response.reason) {
                case "NOT_LOGINED": {
                    alert("로그인이 필요합니다.");
                    return;
                }
                default: {
                    alert("제출 실패");
                }
            }
        }
    }

    function createNewAnswers() {
        if (answer) {
            return answer.answers;
        }
        const arr: string[] = [];
        for (let i = 0; i < poll.sections.length; i++) {
            arr[i] = "";
        }
        return arr;
    }

    function createRadioValue(){
        const arr: (string | null)[] = [];
        if (answer) {
            for (let index in answer.answers) {
                const section = poll.sections[index];
                if (
                    section &&
                    "options" in section &&
                    !section.options.includes(answer.answers[index])
                ) {
                    arr.push(null);
                } else {
                    arr.push(answer.answers[index]);
                }
            }
        } else {
            for (let i = 0; i < poll.sections.length; i++) {
                arr.push("");
            }
        }
        return arr;
    }

    function createfreeAnswers() {
        const arr: string[] = [];
        if (answer) {
            for (let index in answer.answers) {
                const section = poll.sections[index];
                if (
                    section &&
                    "options" in section &&
                    !section.options.includes(answer.answers[index])
                ) {
                    arr.push(answer.answers[index]);
                } else {
                    arr.push("");
                }
            }
        } else {
            for (let i = 0; i < poll.sections.length; i++) {
                arr[i] = "";
            }
        }
        return arr;
    }
</script>

<div class="container" data-theme={$theme}>
    {#each poll.sections as section, index}
        {@render sectionView(section, index)}
    {/each}
    <div class="footer">
        {#if closed}
            <div style="height: 27px;">마감</div>
        {:else if submitted}
            <div style="height: 27px;">제출 완료</div>
            <button
                class="standard"
                onclick={() => {
                    submitted = false;
                }}
                data-theme={$theme}>수정하기</button
            >
        {:else}
            <button class="standard" onclick={submit} data-theme={$theme}
                >제출</button
            >
        {/if}
        <div class="until">
            {untilString} 까지
        </div>
    </div>
</div>

{#snippet sectionView(section: Poll.Section, index: number)}
    <div class="section">
        <div class="question" data-theme={$theme}>
            {section.question}
        </div>
        {#if "options" in section && section.options.length}
            {#each section.options as option}
                <label>
                    <input
                        type="radio"
                        bind:group={radioValue[index]}
                        value={option}
                        onclick={(event) => submitted && event.preventDefault()}
                    />
                    <span>{option}</span>
                </label>
            {/each}
            {#if section.useFree}
                <label>
                    <input
                        type="radio"
                        bind:group={radioValue[index]}
                        value={null}
                        onclick={(event) => submitted && event.preventDefault()}
                    />
                    <span>기타</span>
                </label>
                <textarea
                    data-theme={$theme}
                    onchange={(event) => {
                        if (!(event.target instanceof HTMLTextAreaElement))
                            return;
                        if (radioValue[index] !== null) return;
                        answers[index] = event.target.value;
                    }}
                    disabled={submitted || radioValue[index] !== null}
                    bind:value={freeAnswers[index]}
                ></textarea>
            {/if}
        {:else}
            <textarea
                data-theme={$theme}
                bind:value={answers[index]}
                disabled={submitted}>{answer?.answers?.[index] ?? ""}</textarea
            >
        {/if}
    </div>
{/snippet}

<style>
    .container {
        width: 100%;
        max-width: 500px;
        display: flex;
        flex-direction: column;
        row-gap: 20px;

        background-color: oklch(0.99 0.03 21.57);
        border-radius: 10px;

        box-sizing: border-box;
        padding: 15px;

        &[data-theme="dark"] {
            background-color: rgb(10, 10, 10);
        }
    }

    .footer {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-end;
        column-gap: 10px;
    }

    .until {
        color: rgb(127, 127, 127);
        font-size: 12px;
    }

    .section {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }

    .question {
        background-color: oklch(0.95 0.08 21.57);
        box-sizing: border-box;
        padding: 5px 9px;
        border-radius: 5px;
        &[data-theme="dark"] {
            background-color: rgb(50, 50, 50);
        }
    }

    textarea {
        resize: vertical;
        min-height: 50px;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 5px;
        font-size: 14px;
        font-family: inherit;
        &[data-theme="dark"] {
            background-color: rgb(20, 20, 20);
            color: white;
        }
    }

    label {
        font-size: 14px;
    }
</style>
