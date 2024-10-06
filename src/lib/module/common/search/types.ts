export type SearchResult = SearchResultSong | SearchResultDocs;

export interface SearchResultSong{
    title: string;
    type: 'song';
    songNo: string;
}

export interface SearchResultDocs{
    title: string;
    type: 'docs'
}