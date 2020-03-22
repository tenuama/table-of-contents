import React from 'react';
import { TocData } from './interfaces';
import { Action } from './reducer';

interface IContext {
	state: TocData | null;
	dispatch: (action: Action) => void;
}

export const AppContext = React.createContext<IContext>(
	{
		state: null,
		dispatch: () => {},
	}
);
