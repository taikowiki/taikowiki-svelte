import { redirect } from "@sveltejs/kit";

export async function load({parent}){
    const parentData = await parent();

    throw redirect(302, `/dani/${parentData.versions[0]}`)
}