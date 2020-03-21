import React, { useContext } from 'react';
import { TocElement } from '../toc-element/toc-element';
import { AppContext } from '../app-context';
import { assert } from '../helpers';

interface AnchorElementProps {
	id: string;
	pageId: string;
}

export function AnchorElement(props: AnchorElementProps): JSX.Element {
	const { state } = useContext(AppContext);
	assert(state !== null, 'Page element render failed: state is null');
	const anchor = state.entities.anchors[props.id];
	const page = state.entities.pages[props.pageId];

	return (
		<TocElement
			title={ anchor.title }
			level={ page.level }
			url={ anchor.url + anchor.anchor }
			isHighlighted={ true }
			onClick={ onClick }
		/>
	);

	function onClick(e: React.MouseEvent): void {
		e.preventDefault();
	}
}
