import { FC, useContext, useEffect, useMemo } from 'react';
import { Stack, Typography } from '@mui/material';
import { FilePreviewer } from '../../../../components/file-previewer/FilePreviewer.tsx';
import { ProjectWizardContext } from '../../../../state/project-wizard/projectWizardContext.ts';
import { useTranslation } from 'react-i18next';
import styles from './ProjectWizardSummary.module.css';
import { WizardHeader } from '../../../../components/wizard-header/WizardHeader.tsx';
import { IOnValidation } from '../../IOnValidation.ts';

interface ProjectWizardSummaryProps extends IOnValidation {
}

export const ProjectWizardSummary: FC<ProjectWizardSummaryProps> = ({ onValidation }) => {
    const { t, i18n } = useTranslation();

    const { name, description, dateRange, areaOfInterest } = useContext(ProjectWizardContext);
    const areaOfInterestJson = useMemo(() => areaOfInterest ? JSON.parse(JSON.stringify(areaOfInterest)) : undefined, [areaOfInterest]);

    const formatter = useMemo(() => new Intl.DateTimeFormat(i18n.language), [i18n]);
    const startDate = useMemo(() => dateRange.startDate && formatter.format(dateRange.startDate), [formatter, dateRange]);
    const endDate = useMemo(() => dateRange.endDate && formatter.format(dateRange.endDate), [formatter, dateRange]);

    useEffect(() => {
        onValidation(name?.length > 0
            && dateRange?.startDate !== undefined
            && dateRange?.endDate !== undefined
            && Object.keys(areaOfInterest).length > 0);
        return () => {
            onValidation(true);
        };
    }, [name, dateRange, areaOfInterest, onValidation]);

    return (
        <Stack className={styles.summaryContainer}>
            <WizardHeader className={styles.header} label={t('steps.summary.header')}/>
            <Stack flexDirection="row" className={styles.summaryContainer}>
                <Stack flex={0.8} mr={5}>
                    <Stack>
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
                    <Stack>
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
                    <FilePreviewer json={areaOfInterestJson}/>
                </Stack>
            </Stack>
        </Stack>
    );
};
