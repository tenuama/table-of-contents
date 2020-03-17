import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './app';

fetch('/HelpTOC.json')
.then((response: Response) => {
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return response.json();
})
.then(() => {
	ReactDOM.render(<App />, document.getElementById('root'));
});
