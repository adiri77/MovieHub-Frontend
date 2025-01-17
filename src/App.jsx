import React, { useState, useEffect } from 'react';
import './App.scss';
import { fetchData } from './utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import { PageNotFound } from './pages/404/PageNotFound';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Register from './components/auth/registration/Registration';
import Login from './components/auth/login/Login';
import Playlist from './pages/playlist/index';

function App() {
  const [likedMovies, setLikedMovies] = useState([]);
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchData("/configuration")
      .then((res) => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original"
        };
        dispatch(getApiConfiguration(url));
      });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchData(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore likedMovies={likedMovies} setLikedMovies={setLikedMovies} />} />
        <Route path="/playlist" element={<Playlist likedMovies={likedMovies} />} />
        <Route path='/register' element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
