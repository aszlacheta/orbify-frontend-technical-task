import { FC, useMemo, useReducer } from 'react';
import { Wizard } from '../../components/wizard/Wizard.tsx';
import { initialData } from '../../state/project-wizard/project.data.ts';
import { ProjectWizardContext, ProjectWizardDispatchContext } from '../../state/project-wizard/projectWizardContext.ts';
import { projectWizardReducer } from '../../state/project-wizard/project.reducers.ts';
import { useTranslation } from 'react-i18next';
import { WizardStep } from '../../components/wizard/data/wizard.data.ts';
import { ProjectWizardName } from './steps/project-wizard-name/ProjectWizardName.tsx';
import { ProjectWizardDateRange } from './steps/project-wizard-date-range/ProjectWizardDateRange.tsx';
import { ProjectWizardAreaOfInterests } from './steps/project-wizard-area-of-interests/ProjectWizardAreaOfInterests.tsx';
import { ProjectWizardSummary } from './steps/project-wizard-summary/ProjectWizardSummary.tsx';
import { Stack } from '@mui/material';
import { ProjectWizardWelcome } from './steps/project-wizard-welcome/ProjectWizardWelcome.tsx';

import styles from './ProjectWizard.module.css';

interface ProjectWizardProps {
    activeStep: number;
}

export const ProjectWizard: FC<ProjectWizardProps> = ({ activeStep }) => {
    const { t } = useTranslation();

    const [projectWizardContext, dispatch] = useReducer(projectWizardReducer, initialData);

    const handleFinish = () => {
        console.log('Wizard has finished with data: '); // TODO
    };

    const steps: WizardStep[] = useMemo(() => [
        {
            title: t('steps.welcome.title'),
            preTitle: t('steps.welcome.preTitle'),
            content: <ProjectWizardWelcome/>
        },
        {
            title: t('steps.names.title'),
            preTitle: t('steps.names.preTitle'),
            content: <ProjectWizardName/>
        },
        {
            title: t('steps.dateRange.title'),
            preTitle: t('steps.dateRange.preTitle'),
            content: <ProjectWizardDateRange/>
        },
        {
            title: t('steps.areaOfInterests.title'),
            preTitle: t('steps.areaOfInterests.preTitle'),
            content: <ProjectWizardAreaOfInterests/>
        },
        {
            title: t('steps.summary.title'),
            preTitle: t('steps.summary.preTitle'),
            content: <ProjectWizardSummary/>
        },
    ], [t]);

    return (
        <ProjectWizardContext.Provider value={projectWizardContext}>
            <ProjectWizardDispatchContext.Provider value={dispatch}>
                <Stack className={styles.projectWizard}>
                    <Wizard steps={steps}
                            activeStep={activeStep}
                            completedLabel={t('steps.completed')}
                            inProgressLabel={t('steps.inProgress')}
                            pendingLabel={t('steps.pending')}
                            onFinish={handleFinish}/>
                </Stack>
            </ProjectWizardDispatchContext.Provider>
        </ProjectWizardContext.Provider>
    );
};
