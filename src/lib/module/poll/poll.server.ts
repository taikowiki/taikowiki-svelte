import { defineDBHandler } from "@yowza/db-handler";
import { Poll } from "."
import { WikiError } from "../doc/util";
import type { InferDBSchema, QueryFunction } from "@yowza/db-handler/types";
import { User } from "../user";
import '../user/user.server';
import { DateTime } from "luxon";
import { Util } from "../util";
import '../util/util.server';
import groupBy from "object.groupby";
const { queryBuilder } = Util.Server;

namespace PollServer {
    export const DBController = {
        /**
         * 새 설문을 생성
         */
        createPoll: defineDBHandler<[dataWithoutId: Poll.DataWithoutId], number>((dataWithoutId: Poll.DataWithoutId) => {
            return async (run) => {
                const until = DateTime.fromJSDate(dataWithoutId.until, { zone: process.env.TIMEZONE }).set({
                    hour: 23,
                    minute: 59,
                    second: 59
                });

                const dataResponse = await queryBuilder
                    .insert('poll/data')
                    .set(() => ({
                        until: until.toJSDate(),
                        memo: dataWithoutId?.memo ?? null
                    })).execute(run);

                const dataId: number = dataResponse.insertId;
                if (!dataId) {
                    console.error(dataResponse);
                    throw new WikiError("POLL_CREATE_ERROR");
                }

                for (const i in dataWithoutId.sections) {
                    const section = dataWithoutId.sections[i];
                    await run(
                        queryBuilder
                            .insert('poll/section')
                            .set(() => ({
                                dataId,
                                question: section.question,
                                sectionIndex: Number(i),
                                useFree: Number("options" in section ? section.useFree ?? false : false)
                            }))
                            .build()
                    );

                    if ("options" in section) {
                        for (const ii in section.options) {
                            const option = section.options[ii];
                            await run(
                                queryBuilder.insert('poll/option')
                                    .set(() => ({
                                        dataId,
                                        sectionIndex: Number(i),
                                        optionIndex: Number(ii),
                                        type: 1,
                                        value: option
                                    })).build()
                            )
                        }
                    }
                    else {
                        await run(
                            queryBuilder.insert('poll/option')
                                .set(() => ({
                                    dataId,
                                    sectionIndex: Number(i),
                                    optionIndex: null,
                                    type: 0,
                                    value: null
                                })).build()
                        )
                    }
                }

                return dataId;
            }
        }),
        /**
         * 설문을 가져옴
         */
        getPoll: defineDBHandler<[id: number], Poll.Data | null>((id) => {
            return async (run) => {
                const dataRows = await queryBuilder
                    .select('poll/data', '*')
                    .where(({ column, compare, value }) => [compare(column('id'), '=', value(id))])
                    .execute(run);

                if (dataRows.length === 0) {
                    return null;
                }
                const dataRow = dataRows[0];

                const data: Poll.Data = {
                    id: dataRow.id,
                    sections: [],
                    until: dataRow.until
                }

                await completeData(data, run);

                return data;
            }
        }),/**
         * 설문들을 가져옴
         */
        getPolls: defineDBHandler<[page: number], { polls: (Poll.Data & { memo: string | null })[], length: number }>((page) => {
            return async (run) => {
                const dataRows: Poll.DBDataRow[] = await queryBuilder
                    .select('poll/data', '*')
                    .orderBy('poll/data.id', 'desc')
                    .limit(20, page - 1)
                    .execute(run);

                if (dataRows.length === 0) return { polls: [], length: 0 };

                const datas: (Poll.Data & { memo: string | null })[] = [];
                for (const dataRow of dataRows) {
                    const data: (Poll.Data & { memo: string | null }) = {
                        id: dataRow.id,
                        sections: [],
                        until: dataRow.until,
                        memo: dataRow.memo ?? ''
                    };
                    await completeData(data, run);
                    datas.push(data);
                }

                const length = await queryBuilder
                    .select('poll/data', ({ count }) => ({ length: count() }))
                    .execute(run)
                    .then(r => r[0].length);

                return {
                    polls: datas,
                    length
                };
            }
        }),
        /**
         * 열려있는 설문을 가져옴
         */
        getOpenedPolls: defineDBHandler<[], Poll.Data[]>(() => {
            return async (run) => {
                const dataRows: Poll.DBDataRow[] = await queryBuilder
                    .select('poll/data', '*')
                    .where(({ compare, column, now }) => [compare(column('until'), '>', now())])
                    .orderBy('poll/data.id', 'desc')
                    .execute(run);

                if (dataRows.length === 0) return [];

                const datas: Poll.Data[] = [];
                for (const dataRow of dataRows) {
                    const data: Poll.Data = {
                        id: dataRow.id,
                        sections: [],
                        until: dataRow.until
                    };
                    await completeData(data, run);
                    datas.push(data);
                }

                return datas;
            }
        }),
        /**
         * 닫힌 설문을 가져옴
         */
        getClosedPolls: defineDBHandler<[page: number], { datas: Poll.Data[], length: number }>((page) => {
            return async (run) => {
                const dataRows: Poll.DBDataRow[] = await queryBuilder
                    .select('poll/data', '*')
                    .where(({ column, compare, now }) => [compare(column('until'), '<=', now())])
                    .limit(20, page - 1)
                    .execute(run);

                if (dataRows.length === 0) return { datas: [], length: 0 };

                const datas: Poll.Data[] = [];
                for (const dataRow of dataRows) {
                    const data: Poll.Data = {
                        id: dataRow.id,
                        sections: [],
                        until: dataRow.until
                    };
                    await completeData(data, run);
                    datas.push(data);
                }

                const length: number = await queryBuilder
                    .select('poll/data', ({ count }) => ({
                        count: count()
                    }))
                    .where(({ column, compare, now }) => [compare(column('until'), '<=', now())])
                    .execute(run)
                    .then((v) => v[0].count)

                return { datas, length };
            }
        }),
        /**
         * 설문을 삭제
         */
        deletePoll: defineDBHandler<[id: number], boolean>((id) => {
            return async (run) => {
                const result = await queryBuilder
                    .delete('poll/data')
                    .where(({ compare, column, value }) => [compare(column('id'), '=', value(id))])
                    .execute(run)

                if (!result.affectedRows) return false;

                await queryBuilder
                    .delete('poll/section')
                    .where(({ compare, column, value }) => [compare(column('dataId'), '=', value(id))])
                    .execute(run);
                await queryBuilder
                    .delete('poll/option')
                    .where(({ compare, column, value }) => [compare(column('dataId'), '=', value(id))])
                    .execute(run);
                await queryBuilder
                    .delete('poll/answer')
                    .where(({ compare, column, value }) => [compare(column('dataId'), '=', value(id))])
                    .execute(run);
                return true;
            }
        }),
        doesPollExists: defineDBHandler<[id: number], boolean>((id) => {
            return async (run) => {
                const count = await queryBuilder
                    .select('poll/data', ({ count }) => ({
                        count: count()
                    }))
                    .where(({ compare, column, value }) => [compare(column('id'), '=', value(id))])
                    .execute(run)
                    .then(r => r[0].count)

                if (!count) return false;
                return true;
            }
        }),
        /**
         * 응답 추가
         */
        addAnswer: defineDBHandler<[UUID: string, answerData: Poll.AnswerReqData]>((UUID, answerData) => {
            return async (run) => {
                const userExists = await User.Server.DBController.doesUUIDExists.getCallback(UUID)(run);
                if (!userExists) {
                    throw new WikiError("UUID_NOT_EXISTS");
                }
                const pollExists = await PollServer.DBController.doesPollExists.getCallback(answerData.dataId)(run);
                if (!pollExists) {
                    throw new WikiError("POLL_NOT_EXISTS");
                }
                const answered = await PollServer.DBController.didAnswer.getCallback(UUID, answerData.dataId)(run);
                if (answered) {
                    throw new WikiError("ALREADY_ANSWERED");
                }

                for (const i in answerData.answers) {
                    await run(
                        queryBuilder.insert('poll/answer')
                            .set(() => ({
                                dataId: answerData.dataId,
                                responserUUID: UUID,
                                sectionIndex: Number(i),
                                value: answerData.answers[i]
                            })).build()
                    )
                };
            }
        }),
        updateAnswer: defineDBHandler<[UUID: string, answerData: Poll.AnswerReqData]>((UUID, answerData) => {
            return async (run) => {
                const userExists = await User.Server.DBController.doesUUIDExists.getCallback(UUID)(run);
                if (!userExists) {
                    throw new WikiError("UUID_NOT_EXISTS");
                }
                const pollExists = await PollServer.DBController.doesPollExists.getCallback(answerData.dataId)(run);
                if (!pollExists) {
                    throw new WikiError("POLL_NOT_EXISTS");
                }
                const answered = await PollServer.DBController.didAnswer.getCallback(UUID, answerData.dataId)(run);
                if (!answered) {
                    throw new WikiError("NOT_ANSWERED");
                }

                for (const i in answerData.answers) {
                    await queryBuilder
                        .update('poll/answer', () => ({
                            dataId: answerData.dataId,
                            responserUUID: UUID,
                            sectionIndex: Number(i),
                            value: answerData.answers[i]
                        }))
                        .where(({ compare, column, value }) => [
                            compare(column(''), '=', value(answerData.dataId)),
                            compare(column('sectionIndex'), '=', value(Number(i)))
                        ])
                        .execute(run);
                };
            }
        }),
        /**
         * 특정 유저가 특정 설문에 응답했는지 여부
         */
        didAnswer: defineDBHandler<[UUID: string, id: number], boolean>((UUID, id) => {
            return async (run) => {
                const rows = await queryBuilder
                    .select('poll/answer', ({ count }) => ({
                        count: count()
                    }))
                    .where(({ column, compare, value }) => [
                        compare(column('dataId'), '=', value(id)),
                        compare(column('responserUUID'), '=', value(UUID))
                    ])
                    .execute(run)

                if (!rows?.[0]?.count) return false;
                return true;
            }
        }),
        /**
         * 특정 유저의 특정 설문 응답을 가져옴
         */
        getAnswer: defineDBHandler<[UUID: string, id: number], Poll.Answer | null>((UUID, id) => {
            return async (run) => {
                const rows: Poll.DBAnswerRow[] = await queryBuilder
                    .select('poll/answer', '*')
                    .where(({ compare, column, value }) => [
                        compare(column('dataId'), '=', value(id)),
                        compare(column('responserUUID'), '=', value(UUID))
                    ])
                    .execute(run)

                if (rows.length === 0) return null;

                const answer: Poll.Answer = {
                    dataId: id,
                    responderUUID: UUID,
                    answers: rows.toSorted((a, b) => a.sectionIndex - b.sectionIndex).map((row) => row.value)
                };

                return answer;
            }
        }),
        getAllAnswer: defineDBHandler<[id: number], { [UUID: string]: Poll.Answer }>((id) => {
            return async (run) => {
                const rows = await queryBuilder
                    .select('poll/answer', '*')
                    .where(({ compare, column, value }) => [
                        compare(column('dataId'), '=', value(id))
                    ])
                    .execute(run);

                const answerRowMap = groupBy(rows, (r) => r.responserUUID) as { [UUID: string]: Poll.DBAnswerRow[] };
                const answerMap: { [UUID: string]: Poll.Answer } = {};

                for (const [UUID, rows] of Object.entries(answerRowMap)) {
                    answerMap[UUID] = {
                        dataId: id,
                        responderUUID: UUID,
                        answers: rows.toSorted((a, b) => a.sectionIndex - b.sectionIndex).map((row) => row.value)
                    }
                }

                return answerMap;
            }
        })
    }

    async function completeData(data: Poll.Data, run: QueryFunction) {
        const sectionRows: Poll.DBSectionRow[] = await queryBuilder
            .select('poll/section', '*')
            .where(({ compare, column, value }) => [compare(column('dataId'), '=', value(data.id))])
            .execute(run);

        const optionRows: Poll.DBOptionRow[] = await queryBuilder
            .select('poll/option', '*')
            .where(({ compare, column, value }) => [compare(column('dataId'), '=', value(data.id))])
            .execute(run) as Poll.DBOptionRow[];

        sectionRows.forEach((sectionRow) => {
            const useFree = Boolean(sectionRow.useFree)
            data.sections[sectionRow.sectionIndex] = {
                question: sectionRow.question
            }
            if (useFree) {
                const section = data.sections[sectionRow.sectionIndex] as Poll.OptionedSection;
                section.options = [];
                section.useFree = useFree;
            }
        });
        optionRows.forEach((optionRow) => {
            const section = data.sections[optionRow.sectionIndex];
            if (!section) return;
            if (optionRow.type) {
                let options = (section as Poll.OptionedSection).options;
                if (!options) {
                    options = [];
                    (section as Poll.OptionedSection).options = options;
                }
                options[optionRow.optionIndex] = optionRow.value;

            }
        });
    }
}

Poll.Server = PollServer;

type P = typeof PollServer;
export type { P  as PollServer };
export { Poll };