import React from 'react';
import { Toc } from './toc';

import s from './app.module.scss';

export function App(): JSX.Element {
	return (
		<div className={ s.app }>
			<header className={ s.header }></header>
			<main className={ s.main }>
				<Toc/>
			</main>
			<footer className={ s.footer }/>
		</div>
	);
}
