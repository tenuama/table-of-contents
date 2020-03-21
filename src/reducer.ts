import { TocData } from './interfaces';

export const SET_DATA = 'SET_DATA';
export const SET_ACTIVE_ID = 'SET_ACTIVE_ID';

export interface SetData {
	type: typeof SET_DATA;
	payload: TocData;
}

export interface SetActiveIdMessage {
	type: typeof SET_ACTIVE_ID;
	payload: { activeId: string };
}

export function appReducer(state: TocData | null, action: SetData | SetActiveIdMessage): TocData | null {
	switch (action.type) {
		case 'SET_DATA':
			return {
				...action.payload,
			};
		case 'SET_ACTIVE_ID':
			if (state === null) {
				return null;
			}
			return {
				...state,
				activeId: action.payload.activeId,
			}
		default:
			return state;
	}
}
