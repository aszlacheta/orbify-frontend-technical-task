import { ProjectWizard } from './project.data.ts';
import { Dispatch } from 'react';

export enum ProjectActions {
    PROJECTS_WIZARD_SET_NAME = 'projects-wizard-set-name',
    PROJECTS_WIZARD_SET_DESCRIPTION = 'projects-wizard-set-description',
    PROJECTS_WIZARD_SET_DATE_RANGE = 'projects-wizard-set-date-range',
}

export type ProjectWizardDispatchAction = {
    type: ProjectActions;
    data?: Partial<ProjectWizard>;
}

export const setProjectNameAction = (dispatch: Dispatch<ProjectWizardDispatchAction>, name: ProjectWizard['name']) => {
    dispatch({ type: ProjectActions.PROJECTS_WIZARD_SET_NAME, data: { name } });
};
export const setProjectDescriptionAction = (dispatch: Dispatch<ProjectWizardDispatchAction>, description: ProjectWizard['description']) => {
    dispatch({ type: ProjectActions.PROJECTS_WIZARD_SET_NAME, data: { description } });
};

export const setProjectDateRangeAction = (dispatch: Dispatch<ProjectWizardDispatchAction>, dateRange: ProjectWizard['dateRange']) => {
    dispatch({ type: ProjectActions.PROJECTS_WIZARD_SET_DATE_RANGE, data: { dateRange } });
};

