import { ChangeEvent, DragEvent, FC, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import styles from './FileUpload.module.css';
import { CloudUpload } from '@mui/icons-material';

export interface FileUploadProps {
    accept: string;
    label: string;
    hoverLabel: string;
    dropLabel: string;
    width?: string;
    height?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onDrop: (event: DragEvent<HTMLElement>) => void;
}

export const FileUpload: FC<FileUploadProps> = ({
                                                    accept,
                                                    label,
                                                    hoverLabel,
                                                    dropLabel,
                                                    width = '100%',
                                                    height = '100px',
                                                    onChange,
                                                    onDrop,
                                                }) => {
    const [labelText, setLabelText] = useState<string>(hoverLabel);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    const stopDefaults = (e: DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
    };

    const handleMouseEnter = () => {
        setLabelText(hoverLabel);
    };

    const handleMouseLeave = () => {
        setLabelText(label);
    };


    const handleDragEnter = (e: DragEvent) => {
        stopDefaults(e);
        setIsDragOver(true);
        setLabelText(dropLabel);
    };

    const handleDragLeave = (e: DragEvent) => {
        stopDefaults(e);
        setIsDragOver(false);
        setLabelText(hoverLabel);
    };

    const handleDragOver = (e: DragEvent) => {
        stopDefaults(e);
    };

    const handleDrop =(e: DragEvent<HTMLElement>) => {
        stopDefaults(e);
        setLabelText(hoverLabel);
        setIsDragOver(false);

        onDrop(e);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
    };

    return (
        <>
            <input
                onChange={handleChange}
                accept={accept}
                className={styles.hidden}
                id="file-upload"
                type="file"
            />

            <label
                htmlFor="file-upload"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`${styles.fileUpload} ${isDragOver && styles.onDragOver}`}
            >
                <Stack
                    width={width}
                    height={height}
                    position="relative"
                    bgcolor="#fff"
                    className={styles.noMouseEvent}
                >
                    <Stack
                        height={height}
                        width={width}
                        className={styles.iconText}
                    >
                        <CloudUpload fontSize="large" color="primary"/>
                        <Typography>{labelText}</Typography>
                    </Stack>
                </Stack>
            </label>
        </>
    );
};
