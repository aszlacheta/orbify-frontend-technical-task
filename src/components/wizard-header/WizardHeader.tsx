import { FC } from 'react';
import { Typography } from '@mui/material';
import styles from './WizardHeader.module.css';


interface WizardHeaderProps {
    label: string;
}

export const WizardHeader: FC<WizardHeaderProps> = ({ label }) => {
    return (
        <Typography className={styles.header}>{label}</Typography>
    );
};
