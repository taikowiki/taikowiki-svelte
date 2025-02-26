import type { Writable } from "svelte/store";

declare global{
	interface Window {
		__wiki__window__context__: WikiWindowContext;
	}
}

export type WikiWindowContext = 
	Map<'theme', Writable<'light' | 'dark'>> &
	Map<'isMobile', Writable<boolean>> &
	Map<'wikiDocAnnotations', Map<string, string>> &
	Map<'wikiDocFrames', Map<string, string>> &
	Map<'wikiDocURLBase', string> & 
	Map<string & {}, any>;

export {};