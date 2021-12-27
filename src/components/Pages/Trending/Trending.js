import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CustomPagination from '../../Pagination/CustomPagination';
import SingleContent from '../../SingleContent/SingleContent';
import './Trending.css'

const Trending = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1); 

    const fetchTrending = async () => {

        // const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=08957f87ddd3813cba7beff2d3ffee88&page=${page}`);

        // const {data} = await axios.get(`
        // https://api.themoviedb.org/3/trending/all/day?api_key=08957f87ddd3813cba7beff2d3ffee88&page=${page}`);

        const {data} = await axios.get(`
        https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);


        // const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`);

        // console.log(data);
        setContent(data.results);
    }

    useEffect(() => {
        fetchTrending();
        // eslint-disable-next-line
    }, [page])

    return (
        <>
            <span className="pageTitle">Trending</span>
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
                            media_type={card.media_type}
                            vote_average={card.vote_average}
                        />
                    )
                    )
                }
            </div>
            <CustomPagination setPage={setPage} />
        </>
    )
}

export default Trending
