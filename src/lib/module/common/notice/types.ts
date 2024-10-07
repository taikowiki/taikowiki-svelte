import typer, { type Infer } from "typer-ts";

export const WikiNoticeTyper = new typer.Object({
    order: new typer.Number(null),
    title: new typer.String(null),
    content: new typer.String(null),
    writtenDate: new typer.Instance([Date] as const),
    type: new typer.String(['wiki'] as const),
    officialDate: new typer.Null()
})
export type WikiNotice = Infer<typeof WikiNoticeTyper>

export const OfficialNoticeTyper = new typer.Object({
    order: new typer.Number(null),
    title: new typer.String(null),
    content: new typer.String(null),
    writtenDate: new typer.Instance([Date] as const),
    type: new typer.String(['official'] as const),
    officialDate: new typer.Instance([Date] as const)
})
export type OfficialNotice = Infer<typeof OfficialNoticeTyper>

export const NoticeTyper = new typer.Union([WikiNoticeTyper, OfficialNoticeTyper] as const);
export type Notice = Infer<typeof NoticeTyper>;

export const nnotice: Notice = {
    order: 0,
    title: '',
    content: '',
    writtenDate: new Date(),
    type: 'official',
    officialDate: new Date()
}