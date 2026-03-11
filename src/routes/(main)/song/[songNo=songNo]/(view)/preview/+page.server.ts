import { error } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import type { RResponse } from "@yowza/rrequestor/types";
import path from 'path-browserify';

export async function load({ params }: RequestEvent) {
    const songNo = params.songNo;
    if (!songNo) {
        throw error(404);
    }

    const tja = await fetchTja({ songNo });
    if (tja.status === "error") {
        throw error(404);
    }

    return {
        tja: tja.data
    }
}

async function fetchTja({ songNo }: { songNo: string }): Promise<RResponse<string>> {
    const url = new URL(process.env.TJA_FETCH_URL);
    url.pathname = path.join(url.pathname, `${songNo}.tja`)
    const response = await fetch(url);

    if (200 <= response.status && response.status < 300) {
        return {
            status: "success",
            data: await response.text()
        }
    }
    else {
        return {
            status: 'error',
            statusCode: response.status
        }
    }
}