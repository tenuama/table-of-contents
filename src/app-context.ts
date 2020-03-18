import React from 'react';
import { TocData } from './interfaces';

export const AppContext = React.createContext<TocData | null>(null);
