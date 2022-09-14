import React, {useState, useEffect} from 'react'
import MovieList from './MovieList';
import Header from "./Header";
import SearchBox from "./SearchBox";
import MyList from "./MyList";
import RemoveMyList from "./RemoveMyList";

const Movielist = (props) => {
	const MyListComponent = props.myListComponents;
    const [movies, setMovies] = useState([]);
    const [myList, setMyList] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const getMovieRequest = async (searchValue) => {
      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=efefef32`;
  
      const response = await fetch(url);
      const responseJson = await response.json();
      if (responseJson.Search) {
        setMovies(responseJson.Search);
      }
    };
  
    useEffect(() => {
      getMovieRequest(searchValue);
    }, [searchValue]);
    useEffect(() => {
      const movieMyList = JSON.parse(
        localStorage.getItem("react-movie-app-myList")
      );
      setMyList(movieMyList);
    }, []);
  
    const saveToLocalStorage = (items) => {
      localStorage.setItem("react-movie-app-myList", JSON.stringify(items));
    };
  
    const addtoMyListMovie = (movie) => {
      const newMyList = [...myList, movie];
      setMyList(newMyList);
      saveToLocalStorage(newMyList);
    };
  
    const removefromMyList = (movie) => {
      const newMyList = myList.filter((myList) => myList.imdbID !== movie.imdbID);
      setMyList(newMyList);
      saveToLocalStorage(newMyList);
    };
  return (
    <>
      {props.movies?.map((movie, index) => (
        <div className=" image-container d-flex justify-content-start m-3">
          <img
           src={movie.Poster}  className='rounded'
          alt="movie" />
          <div onClick={() => props.handleMyListClick(movie)} className="overlay d-flex align-items-center justify-content-center">
            <MyListComponent />
          </div>
        </div>
      ))}
       <div className="container-fluid movie-app">
        <div className="row d-flex align-items-center mt-4 mb-4">
          <Header heading="Movies" />
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
        <div className="movies">
          <MovieList
            movies={movies}
            handleMyListClick={addtoMyListMovie}
            myListComponents={MyList}
          />
        </div>
        <div className="row d-flex align-items-center mt-4 mb-4">
          <Header heading="MyList" />
        </div>
        <div className="movies">
          <MovieList
            movies={myList}
            handleMyListClick={removefromMyList}
            myListComponents={RemoveMyList}
          />
        </div>
      </div>
    </>
  );
};

export default Movielist;
