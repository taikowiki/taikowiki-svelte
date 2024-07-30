import { diffchartDBController } from "$lib/module/common/diffchart/diffchart.server";

export async function load() {
    return {
        diffchartDatas: await diffchartDBController.getAll()
    }
}