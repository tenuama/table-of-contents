import { appReducer, SET_ACTIVE_ID, SET_DATA, TOGGLE_PAGE } from '../reducer';
import { TocData } from '../interfaces';

function createState(): TocData {
	return ({
		entities: {
			pages: {
				Root_page: {
					id: 'Root_page',
					title: 'Root page',
					url: 'installation-guide.html',
					level: 0,
					pages: [
						'List_page_1',
						'List_page_2',
					],
				},
				List_page_1: {
					id: 'List_page_1',
					title: 'List page 1',
					url: 'run-for-the-first-time.html',
					parentId: 'Root_page',
					level: 1,
					pages: [
						'List_page_1_1',
						'List_page_1_2',
					],
				},
				List_page_2: {
					id: 'List_page_2',
					title: 'List page 2',
					url: 'register.html',
					parentId: 'Root_page',
					level: 1,
				},
				List_page_1_1: {
					id: 'List_page_1_1',
					title: 'Update IntelliJ IDEA',
					url: 'update.html',
					parentId: 'List_page_1',
					level: 1,
				},
				List_page_1_2: {
					id: 'List_page_1_2',
					title: 'Uninstall IntelliJ IDEA',
					url: 'uninstall.html',
					parentId: 'List_page_1',
					level: 1,
				},
			},
			anchors: {},
		},
		topLevelIds: ['Root_page'],
		activeId: null,
		openedIds: new Set<string>(),
	});
}

describe('Reduser ', () => {
	test('sets data', () => {
		const state = appReducer(null, { type: SET_DATA, payload: createState() });
		expect(state).toEqual(state);
	});

	test('sets active id', () => {
		const activeId = 'Root_page';
		const state = appReducer(createState(), { type: SET_ACTIVE_ID, payload: { activeId: activeId } });
		expect(state && state.activeId).toEqual(activeId);
	});

	test('clears active id', () => {
		const activeId = null;
		const state = appReducer(createState(), { type: SET_ACTIVE_ID, payload: { activeId: activeId } });
		expect(state && state.activeId).toBeNull();
	});

	test('does not set wrong active id', () => {
		const activeId = 'Wrong_active_id';
		const state = appReducer(createState(), { type: SET_ACTIVE_ID, payload: { activeId: activeId } });
		expect(state && state.activeId !== activeId).toBeTruthy();
	});

	test('does not set active id if state is null', () => {
		const activeId = 'Root_page';
		const state = appReducer(null, { type: SET_ACTIVE_ID, payload: { activeId: activeId } });
		expect(state).toBeNull();
	});

	test('opens active page', () => {
		const activeId = 'Root_page';
		const state = appReducer(createState(), { type: SET_ACTIVE_ID, payload: { activeId: activeId } });
		expect(state && state.openedIds.has(activeId)).toBeTruthy();
	});

	test('opens page', () => {
		const pageId = 'Root_page';
		const state = appReducer(createState(), { type: TOGGLE_PAGE, payload: { pageId: pageId } });
		expect(state && state.openedIds.has(pageId)).toBeTruthy();
	});

	test('closes page', () => {
		const pageId = 'Root_page';
		let state = appReducer(createState(), { type: TOGGLE_PAGE, payload: { pageId: pageId } });
		state = appReducer(state, { type: TOGGLE_PAGE, payload: { pageId: pageId } });
		expect(state && state.openedIds.has(pageId)).toEqual(false);
	});

	test('opens path to active page', () => {
		const pageId = 'List_page_1';
		const state = appReducer(createState(), { type: SET_ACTIVE_ID, payload: { activeId: pageId } });
		const page = state && state.entities.pages[pageId];
		expect(state && page && page.parentId && state.openedIds.has(pageId) && state.openedIds.has(page.parentId)).toBeTruthy();
	});
});
