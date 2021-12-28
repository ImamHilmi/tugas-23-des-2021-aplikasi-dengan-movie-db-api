import Chip from '@mui/material/Chip';
import { blue, indigo } from '@mui/material/colors';
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/system';
import Axios from 'axios';
import React, { useEffect } from 'react'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: indigo[50], 
        },
        secondary: {
            main: blue[300],
          },
      }
});

const Genres = ({ 
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage,
}) => {
    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    }

    const handleRemove = (genre) => {
        setSelectedGenres(
          selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
      };

    const fetchGenres = async () => {
        // const { data } = await Axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=08957f87ddd3813cba7beff2d3ffee88&language=en-US`);

        const { data } = await Axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        // setGenres=(data.genres);
        setGenres(data.genres);
    }

    // console.log(genres);

    useEffect(() => {
        fetchGenres();
    
        return () => {
          setGenres({}); 
        };
        // eslint-disable-next-line
      }, [setGenres]);

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <div style={{ padding: "6px 0" }}>
                {selectedGenres && selectedGenres.map((genre) => (
                    <Chip 
                        label={genre.name} 
                        style={{margin: "5px"}} 
                        variant="outlined" 
                        clickable
                        size="small"
                        color="secondary"
                        onClick={() => handleRemove(genre)}
                        key={genre.id}
                    />
                ))}
                {genres && genres.map((genre) => (
                    <Chip 
                        label={genre.name} 
                        style={{margin: "5px"}} 
                        variant="outlined" 
                        clickable
                        onClick={() => handleAdd(genre)}
                        color="primary"
                        size="small"
                        key={genre.id}
                    />
                ))}
                </div>  
            </ThemeProvider>
        </>
    )
}  

export default Genres
