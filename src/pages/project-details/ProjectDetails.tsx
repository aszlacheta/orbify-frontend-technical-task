import { FC, useEffect, useState } from 'react';
import { ProjectDetailsDialog } from './ProjectDetailsDialog.tsx';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ProjectWizard } from '../../state/project-wizard/project.data.ts';

interface ProjectDetailsProps {
    isOpened: boolean;
    project: ProjectWizard;
}

export const ProjectDetails: FC<ProjectDetailsProps> = ({ isOpened, project }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(isOpened);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setOpen(isOpened);
    }, [isOpened]);


    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                {t('projectDetails.button')}
            </Button>
            <ProjectDetailsDialog
                open={open}
                onClose={handleClose}
                project={project}
            />
        </>
    );
};
