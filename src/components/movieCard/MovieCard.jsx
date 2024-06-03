import React, { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.jpg";
import HeartIcon from "../../assets/heart-icon.svg";
import HeartIconRed from "../../assets/heart-icon-red.svg"; // Make sure to have an SVG or image for the red heart icon

const MovieCard = ({ data, fromSearch, mediaType, onLike }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);

    const toggleLike = (e) => {
        e.stopPropagation(); // Prevent triggering the navigation
        setLiked(!liked);
        onLike(data.media_type || mediaType, data.id);
    };

    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;

    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data.media_type || mediaType||'movie'||'tv'}/${data.id}`)
            }
        >
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
                <div className="likeButton" onClick={toggleLike}>
                    <img src={liked ? HeartIconRed : HeartIcon} alt="Like" />
                </div>
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={data.vote_average?.toFixed(1)} />
                        {data.genre_ids && <Genres data={data.genre_ids.slice(0, 2)} />}
                    </React.Fragment>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;
