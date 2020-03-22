import React from 'react';
import ReactDOM from 'react-dom';
import { App, TocAPI } from './app/app';

import './index.css';

ReactDOM.render(<App ref={ (ref: TocAPI) => (window as any).api = ref }/>, document.getElementById('root'));
