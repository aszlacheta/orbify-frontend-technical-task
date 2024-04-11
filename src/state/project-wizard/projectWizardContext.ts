import { createContext, Dispatch } from 'react';
import { initialData, ProjectWizard } from './project.data.ts';

export const ProjectWizardContext = createContext<ProjectWizard>(initialData);
export const ProjectWizardDispatchContext = createContext<Dispatch<never> | null>(null);

