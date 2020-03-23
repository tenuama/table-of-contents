import { Anchor, Page, TocData } from './interfaces';

export const SET_DATA = 'SET_DATA';
export const SET_ACTIVE_ID = 'SET_ACTIVE_ID';
export const TOGGLE_PAGE = 'TOGGLE_PAGE';
export const FIND_SUB_STRING = 'FIND_SUB_STRING';

export interface SetData {
	type: typeof SET_DATA;
	payload: TocData;
}

export interface SetActiveId {
	type: typeof SET_ACTIVE_ID;
	payload: { activeId: string | null };
}

export interface TogglePage {
	type: typeof TOGGLE_PAGE;
	payload: { pageId: string };
}

export interface FindSubString {
	type: typeof FIND_SUB_STRING;
	payload: { subString: string | null };
}

export type Action = SetData | SetActiveId | TogglePage | FindSubString;

export function appReducer(state: TocData | null, action: Action): TocData | null {
	switch (action.type) {
		case SET_DATA: {
			return {
				...action.payload,
			};
		}
		case SET_ACTIVE_ID: {
			if (state === null) {
				return null;
			}

			if (action.payload.activeId === state.activeId) {
				return state;
			}

			if (action.payload.activeId === null) {
				return {
					...state,
					activeId: null,
					openedIds: new Set(),
				};
			}

			let page = state.entities.pages[action.payload.activeId];
			if (!page) {
				return state;
			}

			const openedIds = new Set(state.openedIds);

			openedIds.add(page.id);
			while (page.parentId) {
				page = state.entities.pages[page.parentId];
				if (!page) {
					return state;
				}
				openedIds.add(page.id);
			}

			return {
				...state,
				activeId: action.payload.activeId,
				openedIds: openedIds,
			};
		}
		case TOGGLE_PAGE: {
			if (state === null) {
				return null;
			}

			const newOpenedIds = new Set(state.openedIds);

			if (newOpenedIds.has(action.payload.pageId)) {
				newOpenedIds.delete(action.payload.pageId);
			} else {
				newOpenedIds.add(action.payload.pageId);
			}

			return {
				...state,
				openedIds: newOpenedIds,
			};
		}
		case FIND_SUB_STRING: {
			if (state === null) {
				return null;
			}

			const subString = action.payload.subString;

			if (subString === null) {
				return {
					...state,
					filteredIds: undefined,
				};
			}

			const filteredAnchors = Object.values(state.entities.anchors)
				.filter((anchor: Anchor) => anchor.title.includes(subString));

			const anchorParents = filteredAnchors.map((item: Anchor) => {
				const id = state.anchorToParentPage[item.id];
				return state.entities.pages[id];
			});

			const filteredPages = anchorParents.concat(
				Object.values(state.entities.pages).filter((page: Page) => page.title.includes(subString))
			);

			const filteredIds = new Set<string>([
				...filteredPages.map((page: Page) => page.id),
				...filteredAnchors.map((anchor: Anchor) => anchor.id),
			]);

			for (let page of filteredPages) {
				while (page.parentId) {
					filteredIds.add(page.parentId);
					page = state.entities.pages[page.parentId];
				}
			}

			return {
				...state,
				filteredIds,
			};
		}
		default:
			return state;
	}
}
