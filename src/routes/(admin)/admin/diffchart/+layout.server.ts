import { diffchartDBController } from "$lib/module/diffchart/diffchart.server";

export async function load() {
    return {
        diffchartDatas: await diffchartDBController.getAll()
    }
}