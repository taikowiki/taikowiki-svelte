import { Diffchart } from '$lib/module/diffchart';
import '$lib/module/diffchart/diffchart.server.js';
import { Util } from '$lib/module/util/index.js';
import { error } from '@sveltejs/kit';

export async function GET({ url, setHeaders, locals }) {
    const type = url.searchParams.get('type');
    let level = Util.pipe(url.searchParams.get('level'), [
        (level: string | undefined) => Number(level),
        (level: number) => Number.isNaN(level) ? undefined : level
    ]);

    if (!(type && ['clear', 'fc', 'dfc'].includes(type) && level)) {
        throw error(400);
    }

    if (type === 'clear') {
        var diffchartData_ = await Diffchart.Server.DBController.getClearByLevel(level);
    }
    else if (type === 'fc') {
        var diffchartData_ = await Diffchart.Server.DBController.getFullcomboByLevel(level);
    }
    else {
        var diffchartData_ = await Diffchart.Server.DBController.getDonderfullcomboByLevel(level);
    }

    if (!diffchartData_) {
        throw error(400);
    }

    let { order, ...diffchartData } = diffchartData_;

    diffchartData.data.sections.forEach((section) => {
        section.songs.forEach((song: any) => {
            if (song.option) {
                delete song.option;
            }
        })
    })

    setHeaders({
        ...locals.headers,
        'Content-Type': 'application/json'
    })

    return new Response(JSON.stringify(diffchartData))
}