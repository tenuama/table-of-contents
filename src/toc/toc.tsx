import React, { useContext } from 'react';
import { AppContext } from '../app-context';
import { PageElement } from '../page-element/page-element';
import { Preloader } from '../preloader/preloader';
import { applyFilter } from '../helpers';

import s from './toc.module.scss';

export function Toc(): JSX.Element | null {
	const { state } = useContext(AppContext);
	if (state === null) {
		return (<Preloader/>);
	}

	const content = applyFilter(state.topLevelIds, state.filteredIds).map((id: string) => {
		return (
			<PageElement
				key={ id }
				id={ id }
			/>
		);
	});

	return (
		<ul className={ s.toc }>
			{ content }
		</ul>
	);
}
