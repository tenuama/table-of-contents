import React from 'react';
import { render } from '@testing-library/react';
import { TocElement } from '../toc-element/toc-element';

describe('TocElement  ', () => {
	test('renders title', () => {
		const title = 'Root_page';
		const element = render((
			<TocElement
				title={ title }
				level={ 0 }
			/>
		));
		expect(element.container).toHaveTextContent(title);
	});

	test('render span if url is not provided', () => {
		const element = render((
			<TocElement
				title={ 'Root_page' }
				level={ 0 }
			/>
		));
		expect(element.container.querySelector('span')).toBeInTheDocument();
	});

	test('does not render link if url is not provided', () => {
		const element = render((
			<TocElement
				title={ 'Root_page' }
				level={ 0 }
			/>
		));
		expect(element.queryByRole('link')).toBeNull();
	});

	test('renders link if it has url', () => {
		const element = render((
			<TocElement
				title={ 'Root_page' }
				level={ 0 }
				url={ 'installation-guide.html' }
			/>
		));
		expect(element.getByRole('link')).toBeInTheDocument();
	});

	test('render arrow', () => {
		const element = render((
			<TocElement
				title={ 'Root_page' }
				level={ 0 }
				onArrowClick={ () => {} }
			/>
		));
		expect(element.container.querySelector('svg')).toBeInTheDocument();
	});
});
