import React, { useContext, useState } from 'react';
import { AppContext } from '../app-context';
import { assert } from '../helpers';
import { SET_ACTIVE_ID } from '../reducer';
import { TocElement } from '../toc-element/toc-element';
import { AnchorElement } from '../anchor-element/anchor-element';

import s from './page-element.module.scss';

interface PageElementProps {
	id: string;
}

export function PageElement(props: PageElementProps): JSX.Element {
	const { state, dispatch } = useContext(AppContext);
	assert(state !== null, 'Page element render failed: state is null');
	const page = state.entities.pages[props.id];
	const { id, pages, anchors } = page;
	const [opened, setOpened] = useState(false);
	const isActive = state.activeId === id;

	const pageElements = pages && pages.map((pageId: string) => {
		return (
			<PageElement key={ pageId } id={ pageId }/>
		);
	});

	const anchorElements = anchors && anchors.map((anchorId: string) => {
		return (
			<AnchorElement key={ anchorId } id={ anchorId } pageId={ id }/>
		);
	});

	return (
		<React.Fragment>
			<TocElement
				title={ page.title }
				level={ page.level }
				url={ page.url }
				isActive={ isActive }
				isOpened={ opened }
				isHighlighted={ isActive && anchors && opened }
				onClick={ onClick }
				onArrowClick={ pages ? onArrowClick : undefined }
			/>
			{ pages && opened && (
				<ul className={ s.list }>
					{ isActive && anchorElements }
					{ pageElements }
				</ul>
			) }
		</React.Fragment>
	);

	function onClick(e: React.MouseEvent): void {
		if (e.defaultPrevented) {
			return;
		}

		e.preventDefault();

		dispatch({
			type: SET_ACTIVE_ID,
			payload: {
				activeId: id,
			},
		});

		if (pages && !opened) {
			setOpened(!opened);
		}
	}

	function onArrowClick(e: React.MouseEvent): void {
		e.preventDefault();

		if (pages) {
			setOpened(!opened);
		}
	}
}
