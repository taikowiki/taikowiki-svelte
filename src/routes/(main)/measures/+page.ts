import { browser } from "$app/environment";
import { fetchMeasures } from "@taiko-wiki/taiko-rating";
import type { Measure } from "@taiko-wiki/taiko-rating/src/types";

export async function load({data}){
    let measures: Measure[] | undefined;
    if(browser){
        measures = await fetchMeasures()
    }

    return {
        measures,
        ...data
    }
}