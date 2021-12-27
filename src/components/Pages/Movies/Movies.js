import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Genres from '../../Genres';
import CustomPagination from '../../Pagination/CustomPagination';
import SingleContent from '../../SingleContent/SingleContent';
import useGenre from "../../../hooks/useGenre";
import '../Trending/Trending.css'

const Movies = () => {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPage, setNumOfPages] = useState();
    const genreforURL = useGenre(selectedGenres);

    const fetchMovies = async () => {

        const { data } = await Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);

        // const { data } = await Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=08957f87ddd3813cba7beff2d3ffee88&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&page=${page}&with_genres=$
        
        // genreforURL`);

        // const { data } = await Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreforURL}`);

        // const { data } = await Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&page=${page}&with_genres=false`);
        
        // console.log(data);
        // console.log(data.total_pages);
        setContent(data.results);
        setNumOfPages(data.total_pages);
    }

    useEffect(() => {
        window.scroll(0, 0);
        fetchMovies();
        // eslint-disable-next-line
    }, [genreforURL, page]);

    return (
        <>
            <span className="pageTitle">Movies</span>
            <Genres 
                type='movie'
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
            <div className="trending">
                {
                    content && content.map((card) => 
                    // console.log(card)
                    (
                        <SingleContent 
                            key={card.id} 
                            id={card.id} 
                            poster={card.poster_path} 
                            title={card.title || card.name} 
                            date={card.first_air_date || card.release_date}
                            media_type="Movie"
                            vote_average={card.vote_average}
                        />
                    )
                    )
                }
            </div>
            {numOfPage > 1 && (
                <CustomPagination setPage={setPage} numOfPage={numOfPage} />
            )}
        </>
    )
}

export default Movies
