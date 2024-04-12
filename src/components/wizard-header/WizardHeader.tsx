import { FC } from 'react';
import { Typography } from '@mui/material';
import styles from './WizardHeader.module.css';


interface WizardHeaderProps  {
    label: string;
    className?: string;
}

export const WizardHeader: FC<WizardHeaderProps> = ({ label, className }) => {
    return (
        <Typography className={`${styles.header} ${className}`}>{label}</Typography>
    );
};
