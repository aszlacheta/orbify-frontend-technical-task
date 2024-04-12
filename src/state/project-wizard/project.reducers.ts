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
        case ProjectActions.PROJECTS_WIZARD_SET_DATE_RANGE: {
            return {
                ...projectWizard,
                dateRange: action.data?.dateRange ?? {},
            };
        }
        case ProjectActions.PROJECTS_WIZARD_SET_AREA_OF_INTERESTS: {
            return {
                ...projectWizard,
                areaOfInterest: action.data?.areaOfInterest ?? {},
            };
        }

        default:
            return projectWizard;
    }
};
