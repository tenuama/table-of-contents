import React, { useEffect, useReducer } from 'react';
import { Toc } from './toc/toc';
import { AppContext } from './app-context';
import { TocData } from './interfaces';
import { appReducer, SET_DATA } from './reducer';

import s from './app.module.scss';

export function App(): JSX.Element {
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
							},
						});
					}
				});
			return () => void (isMounted = false);
		},
		[]
	);

	return (
		<AppContext.Provider value={ { state, dispatch } }>
			<div className={ s.app }>
				<header className={ s.header }></header>
				<main className={ s.main }>
					<Toc/>
				</main>
				<footer className={ s.footer }/>
			</div>
		</AppContext.Provider>
	);
}
