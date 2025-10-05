<script lang="ts">
    import { Layout } from "$lib/module/layout";
    import { getTheme } from "$lib/module/layout/theme";
    import { Poll } from "$lib/module/poll/poll.client";
    import { DateTime } from "luxon";

    interface Props {
        poll: Poll.Data;
        answer?: Poll.Answer;
    }

    let { poll, answer }: Props = $props();

    let newAnswers = $state<string[]>(
        answer
            ? structuredClone(answer.answers)
            : new Array(poll.sections.length).fill(""),
    );
    let answerCandidates = $state(createAnswerCandidates());
    $effect(() => {
        for (const index in answerCandidates) {
            if (answerCandidates[index] !== null) {
                newAnswers[Number(index)] = answerCandidates[index];
            }
        }
    });
    let freeTextarea = $state<Record<number, HTMLTextAreaElement>>({});
    $effect(() => {
        for (const index in answerCandidates) {
            if (answerCandidates[index] === null) {
                setNewAnswerFromFreeTextarea(Number(index));
            }
        }
    });
    /** `기타` 선택지의 textarea의 값을 newAnswers에 설정 */
    function setNewAnswerFromFreeTextarea(index: number) {
        const textarea = freeTextarea[index];
        if (!textarea) return;
        newAnswers[index] = textarea.value;
    }
    let submitted = $state(Boolean(answer));

    const timezone = Layout.getTimezone();
    const untilString = DateTime.fromJSDate(poll.until, {
        zone: timezone,
    }).toFormat("yyyy-MM-dd");
    const [theme] = getTheme();

    async function submit() {
        const response = await Poll.Client.request.submit(
            {
                dataId: poll.id,
                answers: newAnswers,
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

    function createAnswerCandidates() {
        const arr: (string | null)[] = structuredClone(answer?.answers ?? []);
        for (const index in poll.sections) {
            if (!arr[index]) continue;
            const section = poll.sections[index];
            if ("options" in section) {
                let radioSelected = false;
                for (const option of section.options) {
                    if (arr[index] === option) {
                        radioSelected = true;
                        break;
                    }
                }
                if (!radioSelected) {
                    arr[index] = null;
                }
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
        {#if submitted}
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
                        bind:group={answerCandidates[index]}
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
                        bind:group={answerCandidates[index]}
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
                        if (answerCandidates[index] !== null) return;
                        setNewAnswerFromFreeTextarea(index);
                    }}
                    disabled={submitted || answerCandidates[index] !== null}
                    bind:this={freeTextarea[index]}
                    >{answer?.answers?.[index] ?? ""}</textarea
                >
            {/if}
        {:else}
            <textarea
                data-theme={$theme}
                onchange={(event) => {
                    if (!(event.target instanceof HTMLTextAreaElement)) return;
                    newAnswers[index] = event.target.value;
                }}
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
