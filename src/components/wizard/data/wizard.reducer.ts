import { initialData, WizardConfig } from './wizard.data.ts';
import { Reducer } from 'react';
import { WizardAction, WizardDispatchAction } from './wizard.actions.ts';

export const wizardReducer: Reducer<WizardConfig, WizardDispatchAction> = (wizardConfig, action) => {
    switch (action.type) {
        case WizardAction.WIZARD_SET_STEPS: {
            return {
                ...wizardConfig,
                steps: action.data?.steps ?? [],
            };
        }
        case WizardAction.WIZARD_SET_ACTIVE_STEP: {
            return {
                ...wizardConfig,
                activeStep: action.data?.activeStep ?? initialData.activeStep,
            };
        }
        case WizardAction.WIZARD_MOVE_TO_NEXT: {
            const activeStep = wizardConfig.activeStep + 1 < wizardConfig.steps.length ?
                wizardConfig.activeStep + 1
                : wizardConfig.steps.length;

            return {
                ...wizardConfig,
                activeStep
            };
        }
        case WizardAction.WIZARD_BACK_TO_PREV: {
            const activeStep = wizardConfig.activeStep - 1 > 0 ?
                wizardConfig.activeStep - 1
                : 0;

            return {
                ...wizardConfig,
                activeStep
            };
        }
        case WizardAction.WIZARD_RESET: {
            return {
                ...wizardConfig,
                activeStep: initialData.activeStep
            };
        }
        default:
            return wizardConfig;
    }
};
