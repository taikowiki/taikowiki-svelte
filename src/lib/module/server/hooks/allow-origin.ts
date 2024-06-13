import type { Handle } from "@sveltejs/kit";

export default function allowOrigin(allowedOrigins: string[]) {
    const handle: Handle = async ({ event, resolve }) => {
        const origin = event.request.headers.get('Origin');
        if (!origin) return await resolve(event);

        if (allowedOrigins.includes(origin)) {
            event.setHeaders({
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
            });
        }

        return await resolve(event);
    }
    return handle;
}