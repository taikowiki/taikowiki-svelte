<script lang="ts">
    import { Layout } from "$lib/module/layout";
    import type { Poll } from "$lib/module/poll";
    import { DateTime } from "luxon";

    interface Props {
        poll: Poll.DataWithoutId;
    }

    let { poll = $bindable() }: Props = $props();
    let untilString = $state(
        DateTime.fromJSDate(poll.until, {
            zone: Layout.getTimezone(),
        }).toFormat("yyyy-MM-dd"),
    );
    $effect(() => {
        poll.until = DateTime.fromFormat(untilString, "yyyy-MM-dd", {
            zone: Layout.getTimezone(),
        })
            .set({
                hour: 23,
                minute: 59,
                second: 59,
            })
            .toJSDate();
    });

    $effect(() => {
        poll.sections.forEach((section) => {
            if ("options" in section && section.options.length === 0) {
                delete (section as Partial<Poll.OptionedSection>).options;
                delete (section as Partial<Poll.OptionedSection>).useFree;
            }
        });
    });

    function addSection() {
        poll.sections.push({ question: "" });
    }
    function deleteSection(index: number) {
        poll.sections = poll.sections.filter((_, i) => i !== index);
    }
</script>

<div class="container">
    {@render Sections()}
    {@render Until()}
    {@render Memo()}
</div>

{#snippet Sections()}
    <h2>
        <span>섹션</span>
        <button class="standard" onclick={addSection}>추가</button>
    </h2>
    <div class="sections-container">
        {#each poll.sections as _, i}
            {@render Section(i)}
        {/each}
    </div>
{/snippet}

{#snippet Section(index: number)}
    {@const section = poll.sections[index]}
    {@const addOption = () => {
        if (!("options" in section)) {
            (section as Poll.OptionedSection).options = [];
        }
        (section as Poll.OptionedSection).options.push("");
    }}
    <div class="section-container">
        <div class="question-container">
            <div class="question">
                <input
                    type="text"
                    bind:value={section.question}
                    placeholder="질문"
                />
                <button
                    class="standard delete-btn"
                    onclick={() => deleteSection(index)}
                >
                    삭제
                </button>
            </div>
            <h3>
                <span>옵션</span>
                <button class="standard" onclick={addOption}>추가</button>
            </h3>
            <div class="options-container">
                {#if "options" in section}
                    {#each section.options as _, i}
                        {@render Option(i, section)}
                    {/each}
                    <label>
                        <input type="checkbox" bind:checked={section.useFree}>
                        자유 응답 사용
                    </label>
                {/if}
            </div>
        </div>
    </div>
{/snippet}

{#snippet Option(index: number, section: Poll.OptionedSection)}
    {@const deleteOption = () => {
        section.options = section.options.filter((_, i) => i !== index);
    }}
    <div class="option-container">
        <input
            bind:value={section.options[index]}
            placeholder={`옵션 ${index + 1}`}
            type="text"
        />
        <button class="standard delete-btn" onclick={deleteOption}>
            삭제
        </button>
    </div>
{/snippet}

{#snippet Until()}
    <div class="until-container">
        <h2>마감</h2>
        <input type="date" bind:value={untilString} />
    </div>
{/snippet}

{#snippet Memo()}
    <div class="memo-container">
        <h2>메모</h2>
        <textarea bind:value={poll.memo}></textarea>
    </div>
{/snippet}

<style>
    .container {
        width: 100%;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
    }

    .sections-container {
        display: flex;
        flex-direction: column;
        row-gap: 50px;
    }

    .options-container {
        display: flex;
        flex-direction: column;
        row-gap: 5px;
    }

    h2,
    h3 {
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 15px;
        margin-block: 10px;

        & span {
            transform: translateY(-2px);
        }
    }

    .question {
        display: flex;
        flex-direction: row;
        column-gap: 5px;
    }

    input[type="text"] {
        flex: 1 0 auto;
        font-size: 14px;
        height: 30px;
        box-sizing: border-box;
    }

    .delete-btn {
        height: 30px;
    }
</style>
