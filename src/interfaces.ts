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
	url: number;
	anchor: string;
	level: number;
}

export interface TocData {
	entities: {
		pages: Record<string, Page>;
		anchors: Record<string, Anchor>;
	};
	topLevelIds: string[];
	activeId: string | null;
}

export interface Action {
	type: string;
	payload: TocData | null;
}
