"use client"
import MoviesList from "@/components/movies-list";
import { useContext, useEffect, useMemo, useState } from 'react';
import { MovieContext } from "./providers";
import { Movie } from "@/lib/interfaces";



export default function Home() {

  const [filterActive, setFilterActive] = useState(false);


  const movieCtx = useContext(MovieContext);
  const movieList = useMemo(() => movieCtx?.movieList || { results: [] }, [movieCtx?.movieList]);

  useEffect(() => {
    // Återställ eller hämta den uppdaterade listan här
    console.log("Uppdaterad MovieList:", movieList);
  }, [movieList]);  // Kör när movieList ändras

  function toggleFilter() {
    setFilterActive((prev) => !prev); 
  }


  const filteredMovies: Movie[] = filterActive
    ? movieList?.results?.filter((movie: Movie) => movie.wishlist) || []
    : movieList?.results || [];


  console.log(filteredMovies);

  return (
      <main>
      <h1 className="text-center text-2xl font-bold my-6">Populära filmer</h1>
      <button className="bg-button text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center h-12 w-30" onClick={toggleFilter}>
        <svg
          className="w-5 h-5 text-white mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-5.414 5.414a1 1 0 00-.293.707v5.586a1 1 0 01-1 1H9a1 1 0 01-1-1v-5.586a1 1 0 00-.293-.707L2.293 6.707A1 1 0 012 6V4z"
          />
        </svg>
        {filterActive ? "Visa alla" : "Visa önskelistan"}</button>
           <MoviesList query="" genreId="" filteredMovies={undefined}  />
    </main>
    );
  }
