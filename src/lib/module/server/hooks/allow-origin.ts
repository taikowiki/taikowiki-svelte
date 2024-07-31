import type { Handle } from "@sveltejs/kit";

export interface AllowOriginOption {
    credentials?: boolean
}

/**
 * Allows CORS from a specific origin. Cookie sharing can also be configured through `option.credentials`.
 */
export default function allowOrigin(allowedOrigins: string[], option?: AllowOriginOption) {
    const handle: Handle = async ({ event, resolve }) => {
        const origin = event.request.headers.get('Origin');
        if (!origin) return await resolve(event);

        if (allowedOrigins.includes(origin)) {
            event.setHeaders({
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization"
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