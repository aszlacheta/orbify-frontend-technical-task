import { FC, useEffect, useMemo, useState } from 'react';
import { Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import { WizardHeader } from '../../../../components/wizard-header/WizardHeader.tsx';
import { IOnValidation } from '../../IOnValidation.ts';
import { DateRange } from '../../../../api/generated.ts';

import styles from './ProjectWizardDateRange.module.css';

type ProjectWizardDateError = undefined | 'required' | 'startDateAfterEndDate';

interface ProjectWizardDateRangeProps extends IOnValidation {
    startDate?: Dayjs | number | null;
    endDate?: Dayjs | number | null;
    onDateRangeChange: (dateRange: DateRange) => void;
}

export const ProjectWizardDateRange: FC<ProjectWizardDateRangeProps> = ({
                                                                            startDate: startDateInitial = dayjs(),
                                                                            endDate: endDateInitial = dayjs().add(1, 'week'),
                                                                            onValidation,
                                                                            onDateRangeChange
                                                                        }) => {
    const { t } = useTranslation();
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(startDateInitial));
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(endDateInitial));

    const startDateError = useMemo<ProjectWizardDateError>(() => {
        if (startDate === undefined || startDate === null) {
            return 'required';
        } else if (startDate.isAfter(endDate)) {
            return 'startDateAfterEndDate';
        }

        return undefined;
    }, [startDate, endDate]);

    const endDateError = useMemo<ProjectWizardDateError>(() => {
        if (endDate === undefined || endDate === null) {
            return 'required';
        } else if (endDate.isBefore(startDate)) {
            return 'startDateAfterEndDate';
        }

        return undefined;
    }, [startDate, endDate]);

    useEffect(() => {
        onValidation(!startDateError && !endDateError);

        return () => {
            onValidation(true);
        };
    }, [startDateError, endDateError, onValidation]);

    useEffect(() => {
        onDateRangeChange({ startDate: startDate?.valueOf(), endDate: endDate?.valueOf() });
    }, [startDate, endDate, onDateRangeChange]);


    const handleStartDateChange = (newValue: Dayjs | null) => {
        setStartDate(newValue);
    };
    const handleEndDateChange = (newValue: Dayjs | null) => {
        setEndDate(newValue);
    };

    return (
        <Stack>
            <WizardHeader label={t('steps.dateRange.header')}/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack flexDirection="row" className={styles.dateRangeContainer}>
                    <DatePicker
                        autoFocus
                        className={styles.dateRangeInput}
                        label={t('steps.dateRange.startDateInput.title')}
                        value={startDate}
                        disablePast
                        onChange={handleStartDateChange}
                        slotProps={
                            {
                                textField: {
                                    required: true,
                                    helperText: startDateError && t(`steps.errors.${startDateError}`),
                                    error: !!startDateError
                                }
                            }
                        }
                    />
                    <DatePicker
                        className={styles.dateRangeInput}
                        label={t('steps.dateRange.endDateInput.title')}
                        value={endDate}
                        disablePast
                        slotProps={
                            {
                                textField: {
                                    required: true,
                                    helperText: endDateError && t(`steps.errors.${endDateError}`),
                                    error: !!endDateError
                                }
                            }
                        }
                        onChange={handleEndDateChange}
                    />
                </Stack>
            </LocalizationProvider>
        </Stack>
    );
};
