import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import styles from './WizardHeaderLabel.module.css';

interface WizardHeaderLabelProps extends WizardHeaderLabelTranslations {
    stepIndex: number;
    activeStep: number;
    title: string;
    preTitle?: string;
    description?: string;
}

export interface WizardHeaderLabelTranslations {
    completedLabel?: string;
    inProgressLabel?: string;
    pendingLabel?: string;
}

export const WizardHeaderLabel: FC<WizardHeaderLabelProps> = ({
                                                                  stepIndex,
                                                                  activeStep,
                                                                  title,
                                                                  preTitle,
                                                                  description,
                                                                  inProgressLabel,
                                                                  pendingLabel,
                                                                  completedLabel
                                                              }) => {
    const isCompleted = stepIndex < activeStep;
    const isInProgress = stepIndex === activeStep;
    const isPending = stepIndex > activeStep;

    return (
        <Stack flexDirection="column" alignItems="flex-start"
               data-cy={`wizard-header-label ${isCompleted && 'is-completed'} ${isInProgress && 'is-in-progress'}`}>
            <Typography className={styles.preTitle}>
                {preTitle}
            </Typography>
            <Typography className={styles.title}>
                {title}
            </Typography>
            {isCompleted && completedLabel && <Typography className={styles.completed}>{completedLabel}</Typography>}
            {isInProgress && inProgressLabel &&
                <Typography className={styles.inProgress}>{inProgressLabel}</Typography>}
            {isPending && pendingLabel && <Typography className={styles.pending}>{pendingLabel}</Typography>}
            {description &&
                <Typography className={styles.description}>{description}</Typography>}
        </Stack>
    );
};
