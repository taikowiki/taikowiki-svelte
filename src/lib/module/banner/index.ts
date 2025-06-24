import type { defineDBHandler } from '@yowza/db-handler';
import type { RRequestHandler } from '@yowza/rrequestor/types';
import { z } from 'zod';

export namespace Banner{
    export declare namespace Client{
        const adminRequest: {
            updateMainBanner: RRequestHandler<{banners: Banner.MainBanner[]}, void>;
            updateAsideBanner: RRequestHandler<{banners: Banner.AsideBanner[]}, void>;
        }
    }
    export declare namespace Server{
        const DBController: {
            getMainBanner: ReturnType<typeof defineDBHandler<[], Banner.MainBanner[] | null>>;
            updateMainBanner: ReturnType<typeof defineDBHandler<[Banner.MainBanner[]], void>>;
            getAsideBanner: ReturnType<typeof defineDBHandler<[], Banner.AsideBanner[] | null>>;
            updateAsideBanner: ReturnType<typeof defineDBHandler<[Banner.AsideBanner[]], void>>;
        }
    }
}

export namespace Banner{
    export namespace Schema{
        export const MainBanner = z.object({
            src: z.string(),
            size: z.union([z.literal('narrow'), z.literal('wide')]),
            href: z.string(),
            target: z.string()
        });
        export const AsideBanner = z.object({
            src: z.string(),
            href: z.string(),
            target: z.string()
        })
    }
    export type MainBanner = z.infer<typeof Schema.MainBanner>;
    export type AsideBanner = z.infer<typeof Schema.AsideBanner>;
}