import { createTheme } from '@mui/material';
import { green } from '@mui/material/colors';

export const theme = createTheme({
    typography: {
        'fontFamily': '"Lato", "Helvetica", "Arial", sans-serif',
        'fontSize': 14,
        'fontWeightLight': 300,
        'fontWeightRegular': 400,
        'fontWeightMedium': 500
    },
    palette: {
        primary: {
            main: '#008c76',
        },
        secondary: {
            main: green[500],
        },
    },
});
