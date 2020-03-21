import React from 'react';
import classNames from 'classnames';
import { ReactComponent as Arrow } from '../images/arrow.svg';

import s from './toc-element.module.scss';

const RIGHT_MARGIN = 14;

interface TocElementProps {
	title: string;
	level: number;
	url?: string;
	isActive?: boolean;
	isOpened?: boolean;
	isHighlighted?: boolean;
	onClick?: (e: React.MouseEvent) => void;
	onArrowClick?: (e: React.MouseEvent) => void;
}

export function TocElement(props: TocElementProps): JSX.Element {
	const { title, level, url, isActive, isOpened, isHighlighted, onClick, onArrowClick } = props;
	const Tag = url ? 'a' : 'span';
	return (
		<li
			style={ { paddingLeft: RIGHT_MARGIN * level + 'px' } }
			className={ classNames(
				s['toc-element'],
				isActive && s['toc-element--selected'],
				isHighlighted && s['toc-element--highlighted']
			) }
			onClick={ onClick }
		>
			<Tag href={ url } className={ s.title }>
				{ onArrowClick && <Arrow onClick={ onArrowClick } className={ classNames(s.arrow, isOpened && s['arrow--opened']) }/> }
				{ title }
			</Tag>
		</li>
	);
}
