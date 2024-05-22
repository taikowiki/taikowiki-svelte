import UserController from '$lib/module/common/user/user-controller.server.js';

export async function POST({request, locals}){
    const data = await request.json();
    if(locals.user && locals.userData && data && "UUID" in data && "newNickname" in data){
        if(locals.userData?.UUID !== data.UUID) return new Response(JSON.stringify({status: 'fail', reason:'UUID not matched'}));
        
        try{
            await UserController.changeNickname(locals.userData.provider, locals.userData.providerId, data.newNickname);
            return new Response(JSON.stringify({status: 'success'}))
        }
        catch(err:any){
            return new Response(JSON.stringify({status: 'fail', reason: err.message}));
        }
    }
    
    return new Response(JSON.stringify({status: 'fail', reason: 'Post data error'}));
}