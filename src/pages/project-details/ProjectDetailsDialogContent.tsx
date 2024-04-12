import { FC, useMemo } from 'react';
import styles from '../project-wizard/steps/project-wizard-summary/ProjectWizardSummary.module.css';
import { WizardHeader } from '../../components/wizard-header/WizardHeader.tsx';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ProjectWizard } from '../../state/project-wizard/project.data.ts';
import { ProjectDetailsDialogMap } from './ProjectDetailsDialogMap.tsx';

interface ProjectDetailsDialogContentProps {
    project: ProjectWizard;
}

export const ProjectDetailsDialogContent: FC<ProjectDetailsDialogContentProps> = ({ project }) => {
    const { t, i18n } = useTranslation();
    const { name, description, dateRange, areaOfInterest } = project;

    const formatter = useMemo(() => new Intl.DateTimeFormat(i18n.language), [i18n]);
    const startDate = useMemo(() => dateRange.startDate && formatter.format(dateRange.startDate), [formatter, dateRange]);
    const endDate = useMemo(() => dateRange.endDate && formatter.format(dateRange.endDate), [formatter, dateRange]);


    return (
        <Stack className={styles.summaryContainer}>
            <Stack flexDirection="column" className={styles.summaryContainer}>
                <Stack flex={1} mr={5} flexDirection="row">
                    <Stack flex={1} mr={5}>
                        <WizardHeader className={styles.header} label={t('steps.summary.nameRow.header')}/>
                        <Stack flexDirection="row">
                            <Typography className={styles.label}>{t('steps.summary.nameRow.nameLabel')}</Typography>
                            <Typography color="primary" className={styles.value}>{name || t('empty')}</Typography>
                        </Stack>
                        <Stack flexDirection="row">
                            <Typography
                                className={styles.label}>{t('steps.summary.nameRow.descriptionLabel')}</Typography>
                            <Typography color="primary"
                                        className={styles.value}>{description || t('empty')}</Typography>
                        </Stack>
                    </Stack>
                    <Stack flex={1}>
                        <WizardHeader className={styles.header} label={t('steps.summary.dateRange.header')}/>
                        <Stack flexDirection="row">
                            <Typography
                                className={styles.label}>{t('steps.summary.dateRange.startDateLabel')}</Typography>
                            <Typography color="primary" className={styles.value}>{startDate || t('empty')}</Typography>
                        </Stack>
                        <Stack flexDirection="row">
                            <Typography
                                className={styles.label}>{t('steps.summary.dateRange.endDateLabel')}</Typography>
                            <Typography color="primary" className={styles.value}>{endDate || t('empty')}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack flex={1}>
                    <WizardHeader className={styles.header} label={t('steps.summary.areaOfInterests.header')}/>
                    <ProjectDetailsDialogMap areaOfInterest={areaOfInterest}/>
                </Stack>
            </Stack>
        </Stack>
    );
};
