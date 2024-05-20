export async function GET({locals, getClientAddress}){
    if(locals.user){
        return new Response(JSON.stringify({
            logined: true,
            nickname: locals.userData?.nickname
        }))
    }
    else{
        return new Response(JSON.stringify({
            logined: false,
            nickname: getClientAddress()
        }))
    }
}