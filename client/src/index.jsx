import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';

// keep the colors the site had with Material UI v4
const theme = createTheme({
    palette: {
        primary: { main: '#3f51b5' },
        secondary: { main: '#f50057' },
    },
});

createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
);
