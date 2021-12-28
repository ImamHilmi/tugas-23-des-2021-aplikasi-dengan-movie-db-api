import React from 'react'
import { img_300, unavailable } from '../../config/config'
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import './SingleContent.css'
import ContentModal from '../ContentModal/ContentModal';

const SingleContent = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average
}) => {
    return (
        <>
            <ContentModal media_type={media_type} id={id} >
                {/* <span><br />{ title }<br /><br /></span> */}
                <Stack spacing={2} direction="row">
                    <Badge badgeContent={vote_average} color={vote_average > 7 ? "primary" : "secondary"} />
                </Stack>
                <img className="poster" src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
                <b className="title">
                    {title}
                </b>
                <div className="media_date">
                    <span className="subTitle">
                        {media_type === "tv" ? "TV Series" : "Movie"}
                    </span>
                    <span className="subTitle">
                        {date}
                    </span>
                </div>
            </ContentModal>
        </>
    )
}

export default SingleContent
