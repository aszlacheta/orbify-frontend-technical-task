import { Reducer } from 'react';
import { ProjectActions, ProjectWizardDispatchAction } from './project.actions.ts';
import { ProjectWizard } from './project.data.ts';

export const projectWizardReducer: Reducer<ProjectWizard, ProjectWizardDispatchAction> = (projectWizard, action) => {
    switch (action.type) {
        case ProjectActions.PROJECTS_WIZARD_SET_NAME: {
            return {
                ...projectWizard,
                name: action.data?.name ?? '',
            };
        }
        case ProjectActions.PROJECTS_WIZARD_SET_DESCRIPTION: {
            return {
                ...projectWizard,
                description: action.data?.description,
            };
        }

        default:
            return projectWizard;
    }
};
