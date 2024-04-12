import { FC, useMemo, useReducer, useState } from 'react';
import { Wizard } from '../../components/wizard/Wizard.tsx';
import { ProjectWizardContext, ProjectWizardDispatchContext } from '../../state/project-wizard/projectWizardContext.ts';
import { projectWizardReducer, } from '../../state/project-wizard/project.reducers.ts';
import { useTranslation } from 'react-i18next';
import { WizardStep } from '../../components/wizard/data/wizard.data.ts';
import { ProjectWizardName } from './steps/project-wizard-name/ProjectWizardName.tsx';
import { ProjectWizardDateRange } from './steps/project-wizard-date-range/ProjectWizardDateRange.tsx';
import { ProjectWizardAreaOfInterests } from './steps/project-wizard-area-of-interests/ProjectWizardAreaOfInterests.tsx';
import { ProjectWizardSummary } from './steps/project-wizard-summary/ProjectWizardSummary.tsx';
import { Stack } from '@mui/material';
import { ProjectWizardWelcome } from './steps/project-wizard-welcome/ProjectWizardWelcome.tsx';
import {
    setProjectAreaOfInterestAction,
    setProjectDateRangeAction,
    setProjectDescriptionAction,
    setProjectNameAction
} from '../../state/project-wizard/project.actions.ts';
import { AreaOfInterests, DateRange, useAddProject } from '../../api/generated.ts';
import { toast } from 'react-toastify';
import { ProjectWizard as IProjectWizard } from '../../state/project-wizard/project.data.ts';
import { loadFromLocalStorage, withStoreInLocalStorage } from '../../state/project-wizard/ProjectWizardLocalStorage.ts';

import styles from './ProjectWizard.module.css';

interface ProjectWizardProps {
    activeStep: number;
    onProjectCreate?: (project: IProjectWizard) => void;
}

export const ProjectWizard: FC<ProjectWizardProps> = ({ activeStep, onProjectCreate }) => {
    const { t } = useTranslation();
    const [projectWizardContext, dispatch] = useReducer(withStoreInLocalStorage(projectWizardReducer), loadFromLocalStorage());
    const [isValid, setIsValid] = useState(true);

    const { mutateAsync: addProject } = useAddProject();

    const handleFinish = () => {
        addProject({ data: projectWizardContext })
            .then(() => {
                toast.success(t('api.projectCreation.success'));
                onProjectCreate?.(projectWizardContext);
            })
            .catch(() => {
                toast.error(t('api.projectCreation.failure'));
            });
    };

    const handleNameChange = (name: string) => {
        setProjectNameAction(dispatch, name);
    };

    const handleDescriptionChange = (description: string) => {
        setProjectDescriptionAction(dispatch, description);
    };

    const handleDateRangeChange = (dateRange: DateRange) => {
        setProjectDateRangeAction(dispatch, dateRange);
    };

    const handleAreaOfInterestChange = (areaOfInterest?: AreaOfInterests) => {
        setProjectAreaOfInterestAction(dispatch, areaOfInterest ?? {});
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
            content: <ProjectWizardName name={projectWizardContext.name}
                                        description={projectWizardContext.description}
                                        onValidation={setIsValid}
                                        onNameChange={handleNameChange}
                                        onDescriptionChange={handleDescriptionChange}/>
        },
        {
            title: t('steps.dateRange.title'),
            preTitle: t('steps.dateRange.preTitle'),
            content: <ProjectWizardDateRange startDate={projectWizardContext.dateRange.startDate}
                                             endDate={projectWizardContext.dateRange.endDate}
                                             onValidation={setIsValid}
                                             onDateRangeChange={handleDateRangeChange}/>
        },
        {
            title: t('steps.areaOfInterests.title'),
            preTitle: t('steps.areaOfInterests.preTitle'),
            content: <ProjectWizardAreaOfInterests areaOfInterest={projectWizardContext.areaOfInterest}
                                                   onAreaOfInterestChange={handleAreaOfInterestChange}
                                                   onValidation={setIsValid}/>
        },
        {
            title: t('steps.summary.title'),
            preTitle: t('steps.summary.preTitle'),
            content: <ProjectWizardSummary onValidation={setIsValid}/>
        },
    ], [t,
        projectWizardContext.name,
        projectWizardContext.description,
        projectWizardContext.dateRange.startDate,
        projectWizardContext.dateRange.endDate,
        projectWizardContext.areaOfInterest,
    ]);

    return (
        <ProjectWizardContext.Provider value={projectWizardContext}>
            <ProjectWizardDispatchContext.Provider value={dispatch}>
                <Stack className={styles.projectWizard}>
                    <Wizard steps={steps}
                            activeStep={activeStep}
                            completedLabel={t('steps.completed')}
                            inProgressLabel={t('steps.inProgress')}
                            pendingLabel={t('steps.pending')}
                            onFinish={handleFinish}
                            isNextDisabled={!isValid}
                            isFinishDisabled={!isValid}
                    />
                </Stack>
            </ProjectWizardDispatchContext.Provider>
        </ProjectWizardContext.Provider>
    );
};
