import { initialData, ProjectWizard } from './project.data.ts';
import { Reducer } from 'react';
import { ProjectWizardDispatchAction } from './project.actions.ts';

const LOCAL_STORAGE_PROJECTS_KEY = 'orbify_fronented_technical_task_project';

export const withStoreInLocalStorage = (reducer: Reducer<ProjectWizard, ProjectWizardDispatchAction>) =>
    (data: ProjectWizard, action: ProjectWizardDispatchAction) => {
        const newData = reducer(data, action);
        storeInLocalStorage(newData);

        return newData;
    };

const storeInLocalStorage = (project: ProjectWizard) => {
    const data = JSON.stringify({ project });

    localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, data);
};

export const loadFromLocalStorage = (): ProjectWizard => {
    const data = localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY);

    if (data) {
        const { project }: { project: ProjectWizard } = JSON.parse(data);

        if (isProjectTypeGuard(project as never)) {
            return project;
        }

    }

    return initialData;
};

const isProjectTypeGuard = (value: never) => {
    return (
        typeof value === 'object' &&
        value !== null &&
        'name' in value &&
        'description' in value &&
        'dateRange' in value &&
        'areaOfInterest' in value
    );
};
