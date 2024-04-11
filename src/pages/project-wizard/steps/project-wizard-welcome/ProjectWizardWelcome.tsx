import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './ProjectWizardWelcome.module.css';

interface ProjectWizardWelcomeProps {

}

export const ProjectWizardWelcome: FC<ProjectWizardWelcomeProps> = () => {
    const { t } = useTranslation();

    return (
        <Stack className={styles.welcomeContainer}>
            <Typography className={styles.header}>{t('steps.welcome.description.header')}</Typography>
            <Typography>{t('steps.welcome.description.description')}</Typography>
        </Stack>
    );
};
