import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material';
import { blue } from '@mui/material/colors';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: blue[300],
          },
      }
});

const CustomPagination = ({ setPage, numOfPage = 10 }) => {
    const handleChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
      };
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '50',
                    marginBottom: '50'
                }}>
                    <ThemeProvider theme={darkTheme}>
                        <Pagination count={numOfPage} variant="outlined" color="primary" showFirstButton showLastButton onChange={(event) => handleChange(event.target.textContent)} /> 
                        </ThemeProvider>
                </div>
            </ThemeProvider>
        </>
    )
}

export default CustomPagination
