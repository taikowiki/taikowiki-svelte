function sleep(ms: number){
    return new Promise((res) => {
        setTimeout(res, ms)
    })
}

export async function handle({event, resolve}){
    return await resolve(event);
}