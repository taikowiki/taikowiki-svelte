import type { WikiDocDBData } from "./wikidoc.db.types"
import type { WikiContentTree } from "./wikidoc.types"

// db에서 넘어오는 데이터
export type WikiDocDBViewDataKey = 'id' | 'title' | 'type' | 'editorUUID' | 'renderedContentTree' | 'songNo' | 'redirectTo' | 'editedTime' | 'isDeleted' | 'version'
export type WikiDocDBViewData = Pick<WikiDocDBData, WikiDocDBViewDataKey>

// +page.server.ts에서 가공한 데이터
export type WikiDocPageViewData = WikiDocDBViewData & { preparedContent: WikiContentTree } & { editor: string };