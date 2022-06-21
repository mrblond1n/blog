import {deepOrange, deepPurple, grey} from '@mui/material/colors';
import {createTheme} from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: deepOrange,
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
        divider: deepPurple[700],
        background: {
            default: deepPurple[900],
            paper: deepPurple[900],
        },
        text: {
            primary: '#000',
            secondary: grey[700],
        },
    },
});

export const getTheme = (value: 'dark' | 'light') => (value === 'light' ? lightTheme : darkTheme);
