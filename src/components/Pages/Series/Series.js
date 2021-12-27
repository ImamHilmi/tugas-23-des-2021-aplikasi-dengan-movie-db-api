import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import useGenre from '../../../hooks/useGenre'
import Genres from '../../Genres'
import CustomPagination from '../../Pagination/CustomPagination'
import SingleContent from '../../SingleContent/SingleContent'
import '../Trending/Trending.css'

const Series = () => {

    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPage, setNumOfPages] = useState();
    const genreforURL = useGenre(selectedGenres);

    const fetchSeries = async () => {

        const { data } = await Axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);

        setContent(data.results);
        setNumOfPages(data.total_pages);
    }

    useEffect(() => {
        window.scroll(0, 0);
        fetchSeries();
        // eslint-disable-next-line
    }, [genreforURL, page]);

    return (
        <>
            <span className="pageTitle">TV Series</span>
            <Genres 
                type='tv'
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
                            media_type="tv"
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

export default Series
