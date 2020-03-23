import React, { useContext } from 'react';
import { AppContext } from '../app-context';
import { applyFilter, assert, hasFilter } from '../helpers';
import { SET_ACTIVE_ID, TOGGLE_PAGE } from '../reducer';
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
	const { id } = page;
	const isActive = state.activeId === id;
	const isFiltered = hasFilter(state.filteredIds) && state.filteredIds.has(id);
	const isOpened = state.openedIds.has(id) || isFiltered;

	const pageElements = applyFilter(page.pages, state.filteredIds).map((pageId: string) => {
		return (
			<PageElement key={ pageId } id={ pageId }/>
		);
	});

	const anchorElements = applyFilter(page.anchors, state.filteredIds).map((anchorId: string) => {
		return (
			<AnchorElement key={ anchorId } id={ anchorId } pageId={ id }/>
		);
	});

	const hasAnyChild = pageElements.length > 0 || anchorElements.length > 0;

	return (
		<React.Fragment>
			<TocElement
				title={ page.title }
				level={ page.level }
				url={ page.url }
				isActive={ isActive }
				isOpened={ isOpened }
				isHighlighted={ isActive && anchorElements.length > 0 && isOpened }
				onClick={ onClick }
				onArrowClick={ hasAnyChild ? onArrowClick : undefined }
			/>
			{ hasAnyChild && isOpened && (
				<ul className={ s.list }>
					{ (isActive || isFiltered) && anchorElements }
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
	}

	function onArrowClick(e: React.MouseEvent): void {
		e.preventDefault();

		dispatch({
			type: TOGGLE_PAGE,
			payload: {
				pageId: id,
			},
		});
	}
}
