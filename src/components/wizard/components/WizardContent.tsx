import { FC } from 'react';
import { WizardStep } from '../data/wizard.data.ts';
import { Stack } from '@mui/material';

interface WizardContentProps {
    content?: WizardStep['content'];
}

export const WizardContent: FC<WizardContentProps> = ({ content }) => {

    return (
        <Stack flex={1} p={1} overflow="auto">
            {content}
        </Stack>
    );
};
