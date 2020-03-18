import React, { useContext } from 'react';
import { AppContext } from './app-context';
import { assert } from './helpers';

interface TocPageProps {
	title: string;
	pages?: string[];
	anchors?: string[];
}

export function TocPage(props: TocPageProps): JSX.Element {
	const context = useContext(AppContext);
	assert(context !== null, 'Toc element render failed: context is null');

	const pages = props.pages && props.pages.map((pageId: string) => {
		const page = context.entities.pages[pageId];
		return (
			<li key={ pageId }>
				<TocPage
					title={ page.title }
					pages={ page.pages }
					anchors={ page.anchors }
				/>
			</li>
		);
	});

	return (
		<React.Fragment>
			<p>{ props.title }</p>
			{ props.pages && (
				<ul>
					{ pages }
				</ul>
			) }
		</React.Fragment>
	);
}
