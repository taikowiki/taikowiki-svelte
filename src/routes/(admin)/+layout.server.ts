export const ssr = false;

export async function load({fetch}){
    const user = JSON.parse(await (await fetch('/api/user')).text());
    return {
        user
    }
}