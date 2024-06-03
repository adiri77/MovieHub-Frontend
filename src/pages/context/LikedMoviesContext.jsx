import React, { createContext, useContext, useState } from "react";

const LikedMoviesContext = createContext();

export const useLikedMovies = () => useContext(LikedMoviesContext);
console.log(useLikedMovies,".........................++++++++++");

export const LikedMoviesProvider = ({ children }) => {
    const [likedMovies, setLikedMovies] = useState([]);

    const addLikedMovie = (mediaType, id) => {
        setLikedMovies((prev) => [...prev, { mediaType, id }]);
    };

    return (
        <LikedMoviesContext.Provider value={{ likedMovies, addLikedMovie }}>
            {children}
        </LikedMoviesContext.Provider>
    );
};
