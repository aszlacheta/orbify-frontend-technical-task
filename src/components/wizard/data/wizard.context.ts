import { createContext, Dispatch } from 'react';
import { initialData, WizardConfig } from './wizard.data.ts';


export const WizardContext = createContext<WizardConfig>(initialData);
export const WizardDispatchContext = createContext<Dispatch<never> | null>(null);
