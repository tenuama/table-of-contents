import React, { useContext } from 'react';
import { AppContext } from '../app-context';
import { TocPage } from '../toc-page/toc-page';

import s from './toc.module.scss';

export function Toc(): JSX.Element | null {
	const { state } = useContext(AppContext);
	if (state === null) {
		return null;
	}

	const content = state.topLevelIds.map((id: string) => {
		const page = state.entities.pages[id];
		return (
			<TocPage
				{ ...page }
				key={ id }
			/>
		);
	});

	return (
		<div className={ s.toc }>
			{ content }
		</div>
	);
}
