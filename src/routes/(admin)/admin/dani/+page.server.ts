import { DaniServer } from "$lib/module/common/dani/dani.server";

export async function load(){
    return {
        versions: await DaniServer.DBController.getVersions()
    }
}