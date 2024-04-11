import { ProjectWizard } from './project.data.ts';

export enum ProjectActions {
    PROJECTS_WIZARD_SET_ITEMS = 'projects-wizard-set-items',
    PROJECTS_WIZARD_SET_SELECTED = 'projects-wizard-set-selected',
    PROJECTS_WIZARD_SET_DESELECTED = 'projects-wizard-set-deselected',
    PROJECTS_WIZARD_TOGGLE_SELECTION = 'projects-wizard-toggle-selection',
    PROJECTS_WIZARD_SELECT_ALL = 'projects-wizard-select-all',
    PROJECTS_WIZARD_DESELECT_ALL = 'projects-wizard-deselect-all',
}

export type ProjectWizardDispatchAction = {
    type: ProjectActions;
    data?: Partial<ProjectWizard>;
}

// export const setItemsAction = (dispatch: Dispatch<ProjectsWizardDispatchAction>, items: Intent[]) => {
//     dispatch({ type: ProjectsActions.PROJECTS_WIZARD_SET_ITEMS, data: { items } });
// };
// export const setSelectedAction = (dispatch: Dispatch<ProjectsWizardDispatchAction>, id: Intent['id']) => {
//     dispatch({ type: ProjectsActions.PROJECTS_WIZARD_SET_SELECTED, data: { id } });
// };
// export const toggleSelectionAction = (dispatch: Dispatch<ProjectsWizardDispatchAction>, id: Intent['id']) => {
//     dispatch({ type: ProjectsActions.PROJECTS_WIZARD_TOGGLE_SELECTION, data: { id } });
// };
// export const setDeselectedAction = (dispatch: Dispatch<ProjectsWizardDispatchAction>, id: Intent['id']) => {
//     dispatch({ type: ProjectsActions.PROJECTS_WIZARD_SET_DESELECTED, data: { id } });
// };
// export const setSelectedAllAction = (dispatch: Dispatch<ProjectsWizardDispatchAction>) => {
//     dispatch({ type: ProjectsActions.PROJECTS_WIZARD_SELECT_ALL });
// };
// export const setDeselectedAllAction = (dispatch: Dispatch<ProjectsWizardDispatchAction>) => {
//     dispatch({ type: ProjectsActions.PROJECTS_WIZARD_DESELECT_ALL });
// };
