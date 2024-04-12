import { setupWorker } from 'msw/browser';
import { getAddProjectMockHandler } from '../generated';

export const serviceWorker = setupWorker(getAddProjectMockHandler());
