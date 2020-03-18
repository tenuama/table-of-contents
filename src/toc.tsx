import React, { useContext } from 'react';
import { AppContext } from './app-context';
import { TocPage } from './toc-element';

import s from './app.module.scss';

export function Toc(): JSX.Element | null {
	const context = useContext(AppContext);
	if (context === null) {
		return null;
	}

	const content = context.topLevelIds.map((id: string) => {
		const page = context.entities.pages[id];
		return (
			<TocPage
				key={ id }
				title={ page.title }
				pages={ page.pages }
				anchors={ page.anchors }
			/>
		);
	});

	return (
		<div className={ s.toc }>
			{ content }
		</div>
	);
}
