import { defineDBHandler, Insert, queryBuilder, Select, Where } from "@yowza/db-handler";
import { Poll } from "."
import { WikiError } from "../doc/util";
import type { QueryFunction } from "@yowza/db-handler/types";
import { User } from "../user";
import '../user/user.server';
import { DateTime } from "luxon";

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

                const dataResponse = await run(
                    queryBuilder
                        .insert('poll/data')
                        .set({
                            until: until.toJSDate()
                        })
                        .build()
                );

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
                            .set({
                                dataId,
                                question: section.question,
                                sectionIndex: i,
                                useFree: Number("options" in section ? section.useFree ?? false : false)
                            })
                            .build()
                    );

                    if ("options" in section) {
                        for (const ii in section.options) {
                            const option = section.options[ii];
                            await run(
                                queryBuilder.insert('poll/option')
                                    .set({
                                        dataId,
                                        sectionIndex: i,
                                        optionIndex: ii,
                                        type: 1,
                                        value: option
                                    }).build()
                            )
                        }
                    }
                    else {
                        await run(
                            queryBuilder.insert('poll/option')
                                .set({
                                    dataId,
                                    sectionIndex: i,
                                    optionIndex: null,
                                    type: 0,
                                    value: null
                                }).build()
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
                const dataRows = await run(
                    queryBuilder.select('poll/data')
                        .where(
                            Where.Compare('id', '=', id)
                        ).build()
                );

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
        }),
        /**
         * 열려있는 설문을 가져옴
         */
        getOpenedPolls: defineDBHandler<[], Poll.Data[]>(() => {
            return async (run) => {
                const dataRows: Poll.DBDataRow[] = await run(
                    queryBuilder.select('poll/data')
                        .where(
                            Where.Compare('until', '>', Where.Raw('CURRENT_TIMESTAMP()'))
                        )
                        .orderby('id', 'desc').build()
                );

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
        getClosedPolls: defineDBHandler<[page: number], {datas: Poll.Data[], length: number}>((page) => {
            return async (run) => {
                const dataRows: Poll.DBDataRow[] = await run(
                    queryBuilder.select('poll/data')
                        .where(
                            Where.Compare('until', '<=', Where.Raw('CURRENT_TIMESTAMP()'))
                        )
                        .orderby('id', 'desc')
                        .limit(page - 1, 20).build()
                );

                if (dataRows.length === 0) return {datas: [], length: 0};

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

                const length: number = await run(
                    queryBuilder.select('poll/data', [Select.As(Select.Count(), 'count')])
                        .where(
                            Where.Compare('until', '<=', Where.Raw('CURRENT_TIMESTAMP()'))
                        ).build()
                ).then((v) => v[0].count);

                return { datas, length };
            }
        }),
        /**
         * 설문을 삭제
         */
        deletePoll: defineDBHandler<[id: number], boolean>((id) => {
            return async (run) => {
                const result = await run(
                    queryBuilder
                        .delete('poll/data')
                        .where(Where.Compare('id', '=', id)).build()
                );

                if (!result.affectedRows) return false;

                await run(
                    queryBuilder
                        .delete('poll/section')
                        .where(Where.Compare('dataId', '=', 'id')).build()
                );
                await run(
                    queryBuilder
                        .delete('poll/option')
                        .where(Where.Compare('dataId', '=', 'id')).build()
                );
                await run(
                    queryBuilder
                        .delete('poll/answer')
                        .where(Where.Compare('dataId', '=', 'id')).build()
                );
                return true;
            }
        }),
        doesPollExists: defineDBHandler<[id: number], boolean>((id) => {
            return async (run) => {
                const rows = await run(
                    queryBuilder.select('poll/data', [Select.As(Select.Count(), 'count')])
                        .where(
                            Where.Compare('id', '=', id)
                        ).build()
                );

                if (!rows?.[0]?.count) return false;
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
                            .set({
                                dataId: answerData.dataId,
                                responserUUID: UUID,
                                sectionIndex: i,
                                value: answerData.answers[i]
                            }).build()
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
                    await run(
                        queryBuilder.update('poll/answer')
                            .set({
                                dataId: answerData.dataId,
                                responserUUID: UUID,
                                sectionIndex: i,
                                value: answerData.answers[i]
                            })
                            .where(
                                Where.Compare('dataId', '=', answerData.dataId),
                                Where.Compare('sectionIndex', '=', i)
                            )
                            .build()
                    )
                };
            }
        }),
        /**
         * 특정 유저가 특정 설문에 응답했는지 여부
         */
        didAnswer: defineDBHandler<[UUID: string, id: number], boolean>((UUID, id) => {
            return async (run) => {
                const rows = await run(
                    queryBuilder.select('poll/answer', [Select.As(Select.Count(), 'count')])
                        .where(
                            Where.Compare('dataId', '=', id),
                            Where.Compare('responserUUID', '=', UUID)
                        ).build()
                );

                if (!rows?.[0]?.count) return false;
                return true;
            }
        }),
        /**
         * 특정 유저의 특정 설문 응답을 가져옴
         */
        getAnswer: defineDBHandler<[UUID: string, id: number], Poll.Answer | null>((UUID, id) => {
            return async (run) => {
                const rows: Poll.DBAnswerRow[] = await run(
                    queryBuilder.select('poll/answer')
                        .where(
                            Where.Compare('dataId', '=', id),
                            Where.Compare('responserUUID', '=', UUID)
                        ).build()
                );

                if (rows.length === 0) return null;

                const answer: Poll.Answer = {
                    dataId: id,
                    responderUUID: UUID,
                    answers: rows.toSorted((a, b) => a.sectionIndex - b.sectionIndex).map((row) => row.value)
                };

                return answer;
            }
        })
    }

    async function completeData(data: Poll.Data, run: QueryFunction) {
        const sectionRows: Poll.DBSectionRow[] = await run(
            queryBuilder.select('poll/section')
                .where(
                    Where.Compare('dataId', '=', data.id)
                ).build()
        );
        const optionRows: Poll.DBOptionRow[] = await run(
            queryBuilder.select('poll/option').
                where(
                    Where.Compare('dataId', '=', data.id)
                ).build()
        );

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

export type { PollServer }
export { Poll };