import { FC, useContext } from 'react';
import { Step, StepLabel, Stepper } from '@mui/material';
import { WizardContext } from '../data/wizard.context.ts';
import { WizardHeaderLabel, WizardHeaderLabelTranslations } from './WizardHeaderLabel.tsx';

interface WizardHeaderProps extends WizardHeaderLabelTranslations {
}

export const WizardHeader: FC<WizardHeaderProps> = ({ completedLabel, inProgressLabel, pendingLabel }) => {
    const { activeStep, steps } = useContext(WizardContext);

    return (
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(({ title, preTitle, description }, index) => (
                <Step key={`${title}_${index}`}>
                    <StepLabel sx={{ '.MuiStepLabel-label': { display: 'flex', justifyContent: 'center' } }}>
                        <WizardHeaderLabel activeStep={activeStep}
                                           stepIndex={index}
                                           title={title}
                                           preTitle={preTitle}
                                           description={description}
                                           completedLabel={completedLabel}
                                           inProgressLabel={inProgressLabel}
                                           pendingLabel={pendingLabel}
                        />
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};

