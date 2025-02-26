export interface ImagePluginFunctionOption {
    url: string;
    description: string;
    size: {
        x: number | null;
        y: number | null;
    }
}

export interface AnnotPluginFunctionOption{
    key: string | null;
    content: string | null;
}

export interface WikiLinkPluginFunctionOption{
    docTitle: string | null;
    content: string | null;
}