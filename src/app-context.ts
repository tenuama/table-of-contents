import React from 'react';
import { TocData } from './interfaces';
import { SetActiveIdMessage, SetData } from './reducer';

interface IContext {
	state: TocData | null;
	dispatch: (action: SetData | SetActiveIdMessage) => void;
}

export const AppContext = React.createContext<IContext>(
	{
		state: null,
		dispatch: () => {},
	}
);
