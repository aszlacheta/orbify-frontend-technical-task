import { ChangeEvent, DragEvent, FC, useEffect, useMemo, useState } from 'react';
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
    areaOfInterest?: AreaOfInterests;
    onAreaOfInterestChange: (areaOfInterest?: AreaOfInterests) => void;
}

export const ProjectWizardAreaOfInterests: FC<ProjectWizardAreaOfInterestsProps> = ({
                                                                                        areaOfInterest: areaOfInterestInitial,
                                                                                        onAreaOfInterestChange,
                                                                                        onValidation
                                                                                    }) => {
    const { t } = useTranslation();
    const [areaOfInterest, setAreaOfInterst] = useState<AreaOfInterests | undefined>(areaOfInterestInitial);
    const isAreaOfInterestDefined = useMemo(() => areaOfInterest && Object.keys(areaOfInterest).length > 0, [areaOfInterest]);
    const json = useMemo<JSON | undefined>(() => isAreaOfInterestDefined && JSON.parse(JSON.stringify(areaOfInterest)), [isAreaOfInterestDefined, areaOfInterest]);

    useEffect(() => {
        onValidation(json !== undefined);

        return () => {
            onValidation(true);
        };
    }, [json, onValidation]);

    useEffect(() => {
        onAreaOfInterestChange(areaOfInterest);
    }, [areaOfInterest, onAreaOfInterestChange]);


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
            const fileContent = JSON.parse(text);

            if (isAreaOfInterestGuard(fileContent as never)) {
                setAreaOfInterst(fileContent);
            }
        } catch (error) {
            toast.error(t('steps.areaOfInterests.uploadComponent.errors.uploadError'));
            console.error('There was an issue with uploaded file', error);
        }
    };

    const isAreaOfInterestGuard = (areaOfInterest: never) => {
        return (
            typeof areaOfInterest === 'object' &&
            areaOfInterest !== null &&
            'id' in areaOfInterest &&
            'bbox' in areaOfInterest &&
            'geometry' in areaOfInterest &&
            'properties' in areaOfInterest &&
            'type' in areaOfInterest
        );
    };

    return (
        <Stack overflow="auto">
            <WizardHeader label={t('steps.areaOfInterests.header')}/>
            <FileUpload accept={FILE_UPLOAD_ACCEPT_TYPE}
                        label={t(isAreaOfInterestDefined ? 'steps.areaOfInterests.uploadComponent.replaceLabel' : 'steps.areaOfInterests.uploadComponent.label')}
                        hoverLabel={t(isAreaOfInterestDefined ? 'steps.areaOfInterests.uploadComponent.replaceHoverLabel' : 'steps.areaOfInterests.uploadComponent.labelHover')}
                        dropLabel={t('steps.areaOfInterests.uploadComponent.dropLabel')}
                        onChange={handleChange}
                        onDrop={handleDrop}/>
            {json && <FilePreviewer json={json}/>}
        </Stack>
    );
};
