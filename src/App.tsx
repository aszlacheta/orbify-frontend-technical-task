import { ProjectWizard } from './pages/project-wizard/ProjectWizard.tsx';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme.config.ts';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './i18n.config.ts';

const DEFAULT_ACTIVE_STEP_INDEX = 3;

export const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <ProjectWizard activeStep={DEFAULT_ACTIVE_STEP_INDEX}/>
            <ToastContainer />
        </ThemeProvider>
    );
};
