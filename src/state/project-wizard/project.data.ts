import { Project } from '../../api/generated.ts';
import dayjs from 'dayjs';

export interface ProjectWizard extends Project {
}

export const initialData: ProjectWizard = {
    name: '',
    description: '',
    dateRange: {
        startDate: dayjs().valueOf(),
        endDate: dayjs().add(1, 'week').valueOf(),
    },
    areaOfInterest: {}
};

