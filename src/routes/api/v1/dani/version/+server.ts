import { Dani } from "$lib/module/dani";
import '$lib/module/dani/dani.server'

export async function GET({ setHeaders, locals }) {
    const version = await Dani.Server.DBController.getVersions();

    setHeaders({
        ...locals.headers,
        'Content-Type': 'application/json'
    })

    return new Response(JSON.stringify(version))
}