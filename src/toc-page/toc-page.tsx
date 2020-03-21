import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { AppContext } from '../app-context';
import { assert } from '../helpers';
import { ReactComponent as Arrow } from '../images/arrow.svg';
import { SET_ACTIVE_ID } from '../reducer';

import s from './toc-page.module.scss';

interface TocPageProps {
	id: string;
	title: string;
	pages?: string[];
	anchors?: string[];
	parentId?: string;
}

export function TocPage(props: TocPageProps): JSX.Element {
	const [opened, setOpened] = useState(false);
	const { state, dispatch } = useContext(AppContext);
	assert(state !== null, 'Toc element render failed: state is null');

	const pages = props.pages && props.pages.map((pageId: string) => {
		const page = state.entities.pages[pageId];
		return (
			<li key={ pageId } className={ s.child }>
				<TocPage { ...page }/>
			</li>
		);
	});

	return (
		<React.Fragment>
			<div
				className={ classNames(s['toc-page'], state.activeId === props.id && s['toc-page--selected']) }
				onClick={ onClick }
			>
				<span className={ s.title }>
					{ props.pages && <Arrow onClick={ onArrowClick } className={ classNames(s.arrow, opened && s['arrow--opened']) }/> }
					{ props.title }
				</span>
			</div>
			{ props.pages && opened && (
				<ul className={ s.list }>
					{ pages }
				</ul>
			) }
		</React.Fragment>
	);

	function onClick(e: React.MouseEvent): void {
		if (e.defaultPrevented) {
			return;
		}

		if (props.pages) {
			setOpened(!opened);
		}

		dispatch({
			type: SET_ACTIVE_ID,
			payload: {
				activeId: props.id,
			},
		});
	}

	function onArrowClick(e: React.MouseEvent): void {
		e.preventDefault();

		if (props.pages) {
			setOpened(!opened);
		}
	}
}
