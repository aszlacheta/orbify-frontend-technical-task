import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './ProjectWizardName.module.css';
import { WizardHeader } from '../../../../components/wizard-header/WizardHeader.tsx';
import { IOnValidation } from '../../IOnValidation.ts';

type ProjectWizardNameError = undefined | 'required' | 'minLength' | 'maxLength';
type ProjectWizardDescriptionError = undefined | 'minLength';

const NAME_CONSTRAINTS = {
    minLength: 3,
    maxLength: 32
};

const DESCRIPTION_CONSTRAINTS = {
    minLength: 5
};

interface ProjectWizardNameProps extends IOnValidation {
    onNameChange: (name: string) => void;
    onDescriptionChange: (description: string) => void;
}

export const ProjectWizardName: FC<ProjectWizardNameProps> = ({ onValidation, onNameChange, onDescriptionChange }) => {
    const { t } = useTranslation();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const nameError = useMemo<ProjectWizardNameError>(() => {
        if (name === undefined || name.length === 0) {
            return 'required';
        } else if (name.length < NAME_CONSTRAINTS.minLength) {
            return 'minLength';
        } else if (name.length >= NAME_CONSTRAINTS.maxLength) {
            return 'maxLength';
        }

        return undefined;
    }, [name]);

    const descriptionError = useMemo<ProjectWizardDescriptionError>(() => {
        if (description.length === 0) {
            return undefined;
        } else if (description.length < DESCRIPTION_CONSTRAINTS.minLength) {
            return 'minLength';
        }

        return undefined;
    }, [description]);

    useEffect(() => {
        onValidation(!nameError && !descriptionError);

        return () => {
            onValidation(true);
        };
    }, [nameError, descriptionError, onValidation]);

    useEffect(() => {
        onNameChange(name);
    }, [name, onNameChange]);

    useEffect(() => {
        onDescriptionChange(description);
    }, [description, onDescriptionChange]);

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    return (
        <Stack>
            <WizardHeader label={t('steps.names.header')}/>
            <Stack className={styles.nameContainer}>
                <TextField
                    className={styles.input}
                    fullWidth
                    label={t('steps.names.nameInput.label')}
                    placeholder={t('steps.names.nameInput.placeholder')}
                    value={name}
                    error={!!nameError}
                    helperText={nameError && t(`steps.errors.${nameError}`, {
                        minLength: NAME_CONSTRAINTS.minLength,
                        maxLength: NAME_CONSTRAINTS.maxLength
                    })}
                    onChange={handleNameChange}
                />
                <TextField
                    className={styles.input}
                    fullWidth
                    multiline
                    rows={4}
                    label={t('steps.names.descriptionInput.label')}
                    placeholder={t('steps.names.descriptionInput.placeholder')}
                    value={description}
                    error={!!descriptionError}
                    helperText={descriptionError && t(`steps.errors.${descriptionError}`, {
                        minLength: DESCRIPTION_CONSTRAINTS.minLength
                    })}
                    onChange={handleDescriptionChange}
                />
            </Stack>
        </Stack>
    );
};
