import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { img_500, unavailable, unavailableLandscape } from "../../config/config";
// import Carousel from '../Carousel/Carousel';
import './ContentModal.css'
import '../SingleContent/SingleContent.css'

const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,

    width: "90%",
    height: "85%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "#fff",
    boxShadow: 15,
    p: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
};

export default function ContentModal({ children, media_type, id }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [content, setContent] = React.useState();
    const [video, setVideo] = React.useState();

    const fetchData = async () => {
        // const { data } = await axios.get(
        //   `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        // );

        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}?api_key=da7c98e17d255a7057d751c52dc6817d&language=en-US`
        );
    
        setContent(data);
        // console.log(data);
    };

    const fetchVideo = async () => {
        // const { data } = await axios.get(
        //   `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        // );

        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=da7c98e17d255a7057d751c52dc6817d&language=en-US`
        );
    
        setVideo(data.results[0]?.key);
    };

    React.useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
      }, []);

    return (
        <div>
        <div className="media" onClick={handleOpen}>
            { children }
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style} className="modal-box">
                {content && (
                    <div>
                        <div className="ContentModal">
                            <img
                            src={
                                content.poster_path
                                ? `${img_500}/${content.poster_path}`
                                : unavailable
                            }
                            alt={content.name || content.title}
                            className="ContentModal__portrait"
                            />
                            <img
                            src={
                                content.backdrop_path
                                ? `${img_500}/${content.backdrop_path}`
                                : unavailableLandscape
                            }
                            alt={content.name || content.title}
                            className="ContentModal__landscape"
                            />
                            <div className="ContentModal__about">
                                <span className="ContentModal__title">
                                    {content.name || content.title} (
                                    {(
                                    content.first_air_date ||
                                    content.release_date ||
                                    "-----"
                                    ).substring(0, 4)}
                                    )
                                </span>
                                {content.tagline && (
                                    <i className="tagline">{content.tagline}</i>
                                )}

                                <span className="ContentModal__description">
                                    {content.overview}
                                </span>

                                {/* <div>
                                    <Carousel id={id} media_type={media_type} />
                                </div> */}

                                <Button
                                    variant="contained"
                                    startIcon={<YouTubeIcon />}
                                    color="secondary"
                                    target="__blank"
                                    href={`https://www.youtube.com/watch?v=${video}`}
                                >
                                    Watch the Trailer
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
                </Box>
            </Fade>
        </Modal>
        </div>
    );
}