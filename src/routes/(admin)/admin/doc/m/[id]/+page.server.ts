import { error } from '@sveltejs/kit';
import { runQuery } from '@yowza/db-handler';
import { Doc } from '$lib/module/doc/index.js';
import type { RequestEvent } from './$types';
import { Util } from '$lib/module/util/util.server';

const { parseDBData } = Doc;
const { queryBuilder } = Util.Server;

export async function load({ params }: RequestEvent) {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
        throw error(404);
    }

    const docData = await runQuery(async (run) => {
        const rows = await queryBuilder
            .select('docs', () => ({
                'id': 'id',
                'title': 'title',
                'type': 'type',
                'songNo': 'songNo',
                'redirectTo': 'redirectTo',
                'editableGrade': 'editableGrade',
                'createdTime': 'createdTime',
                'editedTime': 'editedTime',
                'isDeleted': 'isDeleted',
                'version': 'version'
            }))
            .where(({ compare, column, value }) => [compare(column('id'), '=', value(id))])
            .execute(run);
        if (rows.length === 0) {
            return null;
        }
        return parseDBData<'id' | 'title' | 'type' | 'songNo' | 'redirectTo' | 'editableGrade' | 'createdTime' | 'editedTime' | 'isDeleted' | 'version'>(rows[0]);
    })

    if (!docData) {
        throw error(404);
    }

    return {
        docData
    }
}