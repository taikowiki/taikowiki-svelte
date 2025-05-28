import { z } from 'zod';

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