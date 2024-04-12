import { defineConfig } from 'orval';

export default defineConfig({
    'orbify': {
        'input': {
            target: './src/api/data/openapi.yaml'
        },
        'output': {
            client: 'react-query',
            target: './src/api/generated.ts',
            mock: true,
            baseUrl: '/api/v2',
        },
    }
});
