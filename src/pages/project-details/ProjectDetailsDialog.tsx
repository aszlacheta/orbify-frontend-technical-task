import { FC } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ProjectWizard } from '../../state/project-wizard/project.data.ts';
import { ProjectDetailsDialogContent } from './ProjectDetailsDialogContent.tsx';

interface ProjectDetailsDialogProps {
    open: boolean;
    project: ProjectWizard;
    onClose: () => void;
}

export const ProjectDetailsDialog: FC<ProjectDetailsDialogProps> = ({ open, project, onClose }) => {
    const { t } = useTranslation();

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth>
            <DialogTitle>{t('projectDetails.dialog.header')}</DialogTitle>
            <DialogContent>
                <ProjectDetailsDialogContent project={project}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t('projectDetails.dialog.buttons.close')}</Button>
            </DialogActions>
        </Dialog>
    );
};
