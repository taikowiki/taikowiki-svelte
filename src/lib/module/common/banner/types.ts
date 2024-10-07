import typer, { type Infer } from "typer-ts";

export const MainBannerTyper = new typer.Object({
    src: new typer.String(null),
    size: new typer.String(['narrow', 'wide'] as const),
    href: new typer.String(null),
    target: new typer.String(null)
})
export type MainBanner = Infer<typeof MainBannerTyper>;

export const AsideBannerTyper = new typer.Object({
    src: new typer.String(null),
    href: new typer.String(null),
    target: new typer.String(null)
})
export type AsideBanner = Infer<typeof AsideBannerTyper>;