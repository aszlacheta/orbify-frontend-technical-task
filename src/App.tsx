import { ProjectWizard } from './pages/projects-wizard/ProjectWizard.tsx';
import './App.css';
import './i18n.config.ts';

export const App = () => {

    // const { mutate } = useAddProject();
    //
    // useEffect(() => {
    //     const project = { name: '', description: 'dummy', dataRange: [1, 2], areaOfInterest: {} };
    //     console.log(mutate({ data: project }));
    //     // add({ name: '', description: 'dummy', dataRange: [1, 2], areaOfInterest: {} })
    //     //     .then(() => {
    //     //         console.log('success');
    //     //     }).catch((error) => {
    //     //     console.log('error', error);
    //     // });
    // }, [mutate]);


    return (
        <>
            <ProjectWizard activeStep={DEFAULT_ACTIVE_STEP_INDEX}/>
        </>
    );
};
