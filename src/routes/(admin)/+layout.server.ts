export const ssr = false;

export async function load({fetch, locals}){
    const user = JSON.parse(await (await fetch('/api/user')).text());
    return {
        user,
        grade: locals.userData?.grade
    }
}