import React, { useContext } from 'react';
import { AppContext } from '../app-context';
import { PageElement } from '../page-element/page-element';

import s from './toc.module.scss';

export function Toc(): JSX.Element | null {
	const { state } = useContext(AppContext);
	if (state === null) {
		return null;
	}

	const content = state.topLevelIds.map((id: string) => {
		return (
			<PageElement
				key={ id }
				id={ id }
			/>
		);
	});

	return (
		<nav>
			<ul className={ s.toc }>
				{ content }
			</ul>
		</nav>
	);
}
