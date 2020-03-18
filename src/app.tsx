import React, { useEffect, useState } from 'react';
import { Toc } from './toc';
import { AppContext } from './app-context';
import { TocData } from './interfaces';

import s from './app.module.scss';

export function App(): JSX.Element {
	const [data, setData] = useState<null | TocData>(null);
	useEffect(() => {
		fetch('/HelpTOC.json')
			.then((response: Response) => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then((json: TocData) => {
				setData(json);
			});
	});

	return (
		<AppContext.Provider value={ data }>
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
