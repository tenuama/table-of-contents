export interface Page {
	id: string;
	title: string;
	url: string;
	level: number;
	parentId?: string;
	pages?: string[];
	anchors?: string[];
}

export interface Anchor {
	id: string;
	title: string;
	url: string;
	anchor: string;
	level: number;
}

export interface JSONData {
	entities: {
		pages: Record<string, Page>;
		anchors: Record<string, Anchor>;
	};
	topLevelIds: string[];
}

export interface TocData extends JSONData {
	activeId: string | null;
	openedIds: Set<string>;
	filteredIds?: Set<string>;
	anchorToParentPage: Record<string, string>;
}

export interface Action {
	type: string;
	payload: TocData | null;
}
