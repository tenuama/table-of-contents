import React, { useEffect, useImperativeHandle, useReducer } from 'react';
import { Toc } from '../toc/toc';
import { AppContext } from '../app-context';
import { TocData } from '../interfaces';
import { appReducer, SET_ACTIVE_ID, SET_DATA } from '../reducer';

import s from './app.module.scss';

export interface TocAPI {
	setActiveId: (activeId: string | null) => void;
}

export const App = React.forwardRef((props: object, ref: React.Ref<TocAPI>) => {
	const [state, dispatch] = useReducer(appReducer, null);

	useEffect(
		() => {
			let isMounted = true;
			fetch('/HelpTOC.json')
				.then((response: Response) => {
					if (!response.ok) {
						throw new Error(response.statusText);
					}
					return response.json();
				})
				.then((json: TocData) => {
					if (isMounted) {
						dispatch({
							type: SET_DATA,
							payload: {
								...json,
								activeId: null,
								openedIds: new Set(),
							},
						});
					}
				});
			return () => void (isMounted = false);
		},
		[]
	);

	useImperativeHandle(
		ref,
		() => ({
			setActiveId: (activeId: string | null) => {
				dispatch({
					type: SET_ACTIVE_ID,
					payload: {
						activeId: activeId,
					},
				});
			},
		}),
		[]
	);

	return (
		<AppContext.Provider value={ { state, dispatch } }>
			<div className={ s.app }>
				<header className={ s.header }></header>
				<main className={ s.main }>
					<nav className={ s.nav }>
						<Toc/>
					</nav>
				</main>
				<footer className={ s.footer }/>
			</div>
		</AppContext.Provider>
	);
});
