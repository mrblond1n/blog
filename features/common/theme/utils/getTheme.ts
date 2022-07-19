import {deepOrange, deepPurple, grey} from '@mui/material/colors';
import {createTheme} from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: deepOrange,
        secondary: grey,
        divider: deepOrange[700],
        background: {
            default: deepOrange[900],
            paper: deepOrange[900],
        },
        text: {
            primary: '#fff',
            secondary: grey[500],
        },
    },
});

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: deepPurple,
        secondary: grey,
        divider: deepPurple[300],
        background: {
            default: deepPurple[300],
            paper: deepPurple[300],
        },
        text: {
            primary: '#000',
            secondary: grey[700],
        },
    },
});

export const getTheme = (value: 'dark' | 'light') => (value === 'light' ? lightTheme : darkTheme);
