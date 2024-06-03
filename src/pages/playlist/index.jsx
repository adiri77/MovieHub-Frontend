// src/components/playlist/Playlist.jsx
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../utils/api';
import MovieCard from '../../components/movieCard/MovieCard';
import Spinner from '../../components/spinner/Spinner';
import './style.scss';

const Playlist = ({ likedMovies }) => {
  const [playlistData, setPlaylistData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedMoviesData = async () => {
      const promises = likedMovies.map((movie) => 
        fetchData(`/${movie.mediaType}/${movie.id}`)
      );

      const results = await Promise.all(promises);
      setPlaylistData(results);
      setLoading(false);
    };

    if (likedMovies.length > 0) {
      fetchLikedMoviesData();
    } else {
      setLoading(false);
    }
  }, [likedMovies]);

  if (loading) {
    return <Spinner />;
  }
  console.log(playlistData,"................");

  return (
    <div className="playlistPage">
      <div className="pageHeader">
        <div className="pageTitle">
          Hey
        </div>
        
      </div>

       <h1>PlayList</h1> 
       
       {playlistData.length > 0 ? (
          <div className="row">
            {playlistData.map((item, index) => (
              <div className="col-md-4" key={index}>
                <MovieCard data={item} mediaType={item.created_by ? 'tv' : 'movie'} />
              </div>
            ))}
          </div>
        ) : (
          <span className="noLikedMovies">No liked movies in your playlist.</span>
        )}
        
        </div>
  );
};

export default Playlist;
