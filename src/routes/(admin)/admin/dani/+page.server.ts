import { Dani } from "$lib/module/dani"
import '$lib/module/dani/dani.server'

export async function load(){
    return {
        versions: await Dani.Server.DBController.getVersions()
    }
}