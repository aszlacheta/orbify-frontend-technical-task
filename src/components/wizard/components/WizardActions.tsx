import { Button, Stack } from '@mui/material';
import { FC, useContext, useMemo } from 'react';
import { WizardContext } from '../data/wizard.context.ts';

interface WizardActionsProps {
    onBack: () => void;
    onNext: () => void;
    onFinish?: () => void;
}

export const WizardActions: FC<WizardActionsProps> = ({
                                                          onBack: handleBack,
                                                          onNext: handleNext,
                                                          onFinish: handleFinish
                                                      }) => {
    const { activeStep, steps } = useContext(WizardContext);
    const isPrevDisabled = useMemo(() => activeStep === 0, [activeStep]);
    const isNextDisabled = useMemo(() => activeStep + 1 >= steps.length, [activeStep, steps]);
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
                sx={{ mr: 1 }}
            >
                Finish
            </Button>}
        </Stack>
    );
};
