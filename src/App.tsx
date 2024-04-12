import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme.config.ts';
import { ToastContainer } from 'react-toastify';
import { ProjectDetails } from './pages/project-details/ProjectDetails.tsx';
import { useState } from 'react';
import { ProjectWizard as IProjectWizard } from './state/project-wizard/project.data.ts';
import { ProjectWizard } from './pages/project-wizard/ProjectWizard.tsx';

import 'react-toastify/dist/ReactToastify.css';
import './i18n.config.ts';

const DEFAULT_ACTIVE_STEP_INDEX = 1;

export const App = () => {
    const [showProjectSummary, setShowProjectSummary] = useState(false);
    const [project, setProject] = useState<IProjectWizard | undefined>();

    const handleProjectCreation = (project: IProjectWizard) => {
        setShowProjectSummary(true);
        setProject(project);
    };

    return (
        <ThemeProvider theme={theme}>
            <ProjectWizard activeStep={DEFAULT_ACTIVE_STEP_INDEX} onProjectCreate={handleProjectCreation}/>
            {project && <ProjectDetails isOpened={showProjectSummary} project={project}/>}
            <ToastContainer/>
        </ThemeProvider>
    );
};
