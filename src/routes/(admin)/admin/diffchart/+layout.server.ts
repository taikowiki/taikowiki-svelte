import { Diffchart } from '$lib/module/diffchart/index.js';
import '$lib/module/diffchart/diffchart.server.js';

export async function load() {
    return {
        diffchartDatas: await Diffchart.Server.DBController.getAll()
    }
}