import { Button, Stack } from '@mui/material';
import { FC, useContext, useMemo } from 'react';
import { WizardContext } from '../data/wizard.context.ts';

export interface WizardActionsProps {
    onBack: () => void;
    onNext: () => void;
    onFinish?: () => void;
    isBackDisabled?: boolean;
    isNextDisabled?: boolean;
    isFinishDisabled?: boolean;
}

export const WizardActions: FC<WizardActionsProps> = ({
                                                          onBack: handleBack,
                                                          onNext: handleNext,
                                                          onFinish: handleFinish,
                                                          isBackDisabled: isBackDisabledInitial,
                                                          isNextDisabled: isNextDisabledInitial,
                                                          isFinishDisabled: isFinishDisabledInitial
                                                      }) => {
    const { activeStep, steps } = useContext(WizardContext);
    const isPrevDisabled = useMemo(() => (activeStep === 0) || isBackDisabledInitial, [activeStep, isBackDisabledInitial]);
    const isNextDisabled = useMemo(() => activeStep + 1 >= steps.length || isNextDisabledInitial, [activeStep, steps, isNextDisabledInitial]);
    const isLastStep = useMemo(() => activeStep === steps.length - 1, [activeStep, steps]);

    return (
        <Stack flexDirection="row" justifyContent="flex-end">
            <Button
                data-cy="wizard-back-button"
                color="inherit"
                disabled={isPrevDisabled}
                onClick={handleBack}
                sx={{ mr: 1 }}
            >
                Back
            </Button>
            {!isLastStep && <Button
                data-cy="wizard-next-button"
                color="inherit"
                disabled={isNextDisabled}
                onClick={handleNext}
                sx={{ mr: 1 }}
            >
                Next
            </Button>}
            {isLastStep && <Button
                color="inherit"
                data-cy="wizard-finish-button"
                onClick={handleFinish}
                disabled={isFinishDisabledInitial}
                sx={{ mr: 1 }}
            >
                Finish
            </Button>}
        </Stack>
    );
};
