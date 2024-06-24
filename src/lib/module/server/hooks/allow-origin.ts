import type { Handle } from "@sveltejs/kit";

export interface AllowOriginOption {
    credentials?: boolean
}

export default function allowOrigin(allowedOrigins: string[], option?: AllowOriginOption) {
    const handle: Handle = async ({ event, resolve }) => {
        const origin = event.request.headers.get('Origin');
        if (!origin) return await resolve(event);

        if (allowedOrigins.includes(origin)) {
            event.setHeaders({
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
            });
            if (option) {
                if (option?.credentials === true) {
                    event.setHeaders({
                        "Access-Control-Allow-Credentials": "true"
                    })
                }
            }
        }

        return await resolve(event);
    }
    return handle;
}