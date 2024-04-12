import { FC } from 'react';
import ReactJson from '@microlink/react-json-view';
import { Stack } from '@mui/material';
import styles from './FilePreviewer.module.css';

interface FilePreviewerProps {
    json: JSON;
}

export const FilePreviewer: FC<FilePreviewerProps> = ({ json }) => {
    return (
        <Stack className={styles.filePreviewer}>
            <ReactJson src={json}/>
        </Stack>
    );
};

