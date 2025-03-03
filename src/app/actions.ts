"use server"
import { Movie } from "../../lib/interfaces";

const API_KEY = '0bd07cd4d4166d94ef83bad8d6d24b08'; // Ersätt med din API-nyckel
const BASE_URL = 'https://api.themoviedb.org/3';
const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=sv-SE`;

export const fetchMovies = async () => {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=sv-SE&page=1`);
    //TODO: check if data is ok
    const data = await res.json();
    const results: Movie[] = await data.results;
    return results;
}

export const fetchMovie = async (id: string) => {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=sv-SE`);
    //TODO: check if data is ok
    const data: Movie= await res.json();
    return data;
}

export const fetchGenres = async () =>{
    const response = await fetch(genreUrl);
    const data = await response.json();
    console.log('Genrer:', data.genres);
}

async function fetchMoviesByGenre(genreId: number) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log('Filmer:', data.results);
}

const genre = fetchMoviesByGenre(28);
console.log(genre)
