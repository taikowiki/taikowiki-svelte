export async function GET({params, setHeaders, fetch}){setHeaders({
        'content-type': 'image/png',
        'cache-control': "max-age=31536000"
    });

    const blob = await (await fetch(`https://img.taiko-p.jp/imgsrc.php?v=&kind=mydon&fn=mydon_${params.taikoNumber}`)).blob();

    return new Response(blob);
}