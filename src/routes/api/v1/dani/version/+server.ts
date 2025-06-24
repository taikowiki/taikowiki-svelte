import { Dani } from "$lib/module/dani";
import '$lib/module/dani/dani.server'

export async function GET(){
    const version = await Dani.Server.DBController.getVersions();

    return new Response(JSON.stringify(version), {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}