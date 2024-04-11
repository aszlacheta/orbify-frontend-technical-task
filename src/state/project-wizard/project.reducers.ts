import { Reducer } from 'react';
import { ProjectWizardDispatchAction } from './project.actions.ts';
import { ProjectWizard } from './project.data.ts';

export const projectWizardReducer: Reducer<ProjectWizard, ProjectWizardDispatchAction> = (projectWizard, action) => {
    switch (action.type) {

        default:
            return projectWizard;
    }
};
