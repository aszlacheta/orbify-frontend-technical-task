import { ChangeEvent, DragEvent, FC, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { FileUpload } from '../../../../components/file-upload/FileUpload.tsx';
import { AreaOfInterests } from '../../../../api/generated.ts';
import { useTranslation } from 'react-i18next';
import { FilePreviewer } from '../../../../components/file-previewer/FilePreviewer.tsx';
import { WizardHeader } from '../../../../components/wizard-header/WizardHeader.tsx';
import { toast } from 'react-toastify';
import { IOnValidation } from '../../IOnValidation.ts';

const FILE_UPLOAD_ACCEPT_TYPE = 'json/*';

interface ProjectWizardAreaOfInterestsProps extends IOnValidation {
    onAreaOfInterestChange: (areaOfInterest: AreaOfInterests) => void;
}

export const ProjectWizardAreaOfInterests: FC<ProjectWizardAreaOfInterestsProps> = ({
                                                                                        onAreaOfInterestChange,
                                                                                        onValidation
                                                                                    }) => {
    const { t } = useTranslation();
    const [json, setJson] = useState<JSON | undefined>();

    useEffect(() => {
        onValidation(json !== undefined);

        return () => {
            onValidation(true);
        };
    }, [json, onValidation]);


    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (
            event.target.files !== null &&
            event.target?.files?.length > 0
        ) {
            const file = event.target.files.item(0);

            if (file) {
                await handleFileRead(file);
            }
        }
    };

    const handleDrop = async (event: DragEvent<HTMLElement>) => {
        if (
            event.dataTransfer.files !== null &&
            event.dataTransfer?.files?.length > 0
        ) {
            const file = event.dataTransfer.files[0];

            if (file) {
                await handleFileRead(file);
            }
        }

    };

    const handleFileRead = async (file: File) => {
        try {
            const text = await file.text();
            const json = JSON.parse(text);

            setJson(json);
            onAreaOfInterestChange(json);
        } catch (error) {
            toast(t('steps.areaOfInterests.uploadComponent.errors.uploadError'));
        }
    };

    return (
        <Stack overflow="auto">
            <WizardHeader label={t('steps.areaOfInterests.header')}/>
            <FileUpload accept={FILE_UPLOAD_ACCEPT_TYPE}
                        label={t('steps.areaOfInterests.uploadComponent.label')}
                        hoverLabel={t('steps.areaOfInterests.uploadComponent.labelHover')}
                        dropLabel={t('steps.areaOfInterests.uploadComponent.dropLabel')}
                        onChange={handleChange}
                        onDrop={handleDrop}/>
            {json && <FilePreviewer json={json}/>}
        </Stack>
    );
};
