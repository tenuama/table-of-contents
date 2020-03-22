import { TocData } from './interfaces';

export const SET_DATA = 'SET_DATA';
export const SET_ACTIVE_ID = 'SET_ACTIVE_ID';
export const TOGGLE_PAGE = 'TOGGLE_PAGE';

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

export type Action = SetData | SetActiveId | TogglePage;

export function appReducer(state: TocData | null, action: Action): TocData | null {
	switch (action.type) {
		case SET_DATA:
			return {
				...action.payload,
			};
		case SET_ACTIVE_ID:
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

			state.openedIds.add(page.id);
			while (page.parentId) {
				page = state.entities.pages[page.parentId];
				if (!page) {
					return state;
				}
				state.openedIds.add(page.id);
			}

			return {
				...state,
				activeId: action.payload.activeId,
				openedIds: state.openedIds,
			};
		case TOGGLE_PAGE:
			if (state === null) {
				return null;
			}

			if (state.openedIds.has(action.payload.pageId)) {
				state.openedIds.delete(action.payload.pageId);
			} else {
				state.openedIds.add(action.payload.pageId);
			}

			return {
				...state,
				openedIds: state.openedIds,
			};
		default:
			return state;
	}
}
