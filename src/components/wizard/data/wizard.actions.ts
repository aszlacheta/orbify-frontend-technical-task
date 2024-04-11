import { Dispatch } from 'react';
import { WizardConfig } from './wizard.data.ts';

export enum WizardAction {
    WIZARD_SET_STEPS = 'wizard-set-steps',
    WIZARD_SET_ACTIVE_STEP = 'wizard-set-active-step',
    WIZARD_MOVE_TO_NEXT = 'wizard-move-to-next',
    WIZARD_BACK_TO_PREV = 'wizard-back-to-prev',
    WIZARD_RESET = 'wizard-reset'
}

export type WizardDispatchAction = {
    type: WizardAction;
    data?: Partial<WizardConfig>;
}

export const setStepsAction = (dispatch: Dispatch<WizardDispatchAction>, steps: WizardConfig['steps']) => {
    dispatch({ type: WizardAction.WIZARD_SET_STEPS, data: { steps } });
};
export const setActiveStepAction = (dispatch: Dispatch<WizardDispatchAction>, activeStep: WizardConfig['activeStep']) => {
    dispatch({ type: WizardAction.WIZARD_SET_ACTIVE_STEP, data: { activeStep } });
};
export const openNextAction = (dispatch: Dispatch<WizardDispatchAction>) => {
    dispatch({ type: WizardAction.WIZARD_MOVE_TO_NEXT });
};
export const openPrevAction = (dispatch: Dispatch<WizardDispatchAction>) => {
    dispatch({ type: WizardAction.WIZARD_BACK_TO_PREV });
};
export const resetAction = (dispatch: Dispatch<WizardDispatchAction>) => {
    dispatch({ type: WizardAction.WIZARD_RESET });
};
