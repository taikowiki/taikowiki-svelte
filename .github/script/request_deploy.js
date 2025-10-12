const requestURL = new URL(process.env.REQUEST_DEPLOY_URL);

requestURL.pathname = `/deploy/${process.env.RELEASE_TAG}`;

const controller = new AbortController();
const id = setTimeout(() => controller.abort(), 600000);

try{
    await fetch(requestURL, {
        headers: {
            'AUTH-KEY': process.env.REQUEST_DEPLOY_KEY
        },
        method: 'POST',
        signal: controller.signal
    })
    clearTimeout(id);
}
catch(err){
    console.log('Error occured.');
    console.log(err);
}

export {};