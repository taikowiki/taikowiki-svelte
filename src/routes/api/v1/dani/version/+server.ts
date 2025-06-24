import { Dani } from "$lib/module/dani";
import '$lib/module/dani/dani.server'

export async function GET({ setHeaders }) {
    const version = await Dani.Server.DBController.getVersions();

    setHeaders({
        'Content-Type': 'application/json'
    })

    return new Response(JSON.stringify(version))
}