import { ReactElement } from 'react';

export interface WizardConfig {
    activeStep: number;
    steps: WizardStep[];
}

export type WizardStep = {
    title: string;
    preTitle?: string;
    description?: string;
    content?: ReactElement;
}

export const initialData: WizardConfig = {
    activeStep: 0,
    steps: [],
};
