import { Project } from '../../api/generated.ts';

export interface ProjectWizard extends Project {
}

export const initialData: ProjectWizard = {
    name: '',
    description: '',
    dateRange: {
        startDate: (new Date()).getTime(),
        endDate: (new Date()).getTime(),
    },
    areaOfInterest: {}
};

