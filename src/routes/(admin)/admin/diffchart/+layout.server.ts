import DiffchartDB from "$lib/module/common/diffchart/diffchart.server";

export async function load(){
    return {
        diffchartDatas: await DiffchartDB.getAll()
    }
}