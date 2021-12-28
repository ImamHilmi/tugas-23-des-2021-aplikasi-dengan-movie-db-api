import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from "../../config/config";

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media_type, id }) => {
    const [credits, setCredits] = useState([]);

    const items = credits.map((c) => (
      <div className="carouselItem">
        <img
          src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
          alt={c?.name}
          onDragStart={handleDragStart}
          className="carouselItem__img"
        />
        <b className="carouselItem__txt">{c?.name}</b>
      </div>
    ));

    const responsive = {
        0: {
          items: 3,
        },
        512: {
          items: 5,
        },
        1024: {
          items: 7,
        },
      };

      const fetchCredits = async () => {
        // const { data } = await axios.get(
        //   `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        // );

        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=da7c98e17d255a7057d751c52dc6817d&language=en-US`
        );
        setCredits(data.cast);
      };
    
      useEffect(() => {
        fetchCredits();
        // eslint-disable-next-line
      }, []);

  return (
    <AliceCarousel 
        mouseTracking 
        items={items}
        infinite
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
    />
  );
}

export default Carousel;