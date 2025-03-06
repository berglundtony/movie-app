"use server"
import { Movie } from "../../lib/interfaces";

const RAW_API_KEY = process.env.RAWG_API_KEY; 
const BASE_URL = 'https://api.themoviedb.org/3';
const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${RAW_API_KEY}&language=sv-SE`;

export const fetchMovies = async (page = 1, query?: string, genreId?:string) => {
    // try {
    let url = "";

        if (query) {
            url = `${BASE_URL}/search/movie?api_key=${RAW_API_KEY}&language=sv-SE&query=${query}&page=${page}}`
        } else if (genreId) {
            url = `${BASE_URL}/discover/movie?api_key=${RAW_API_KEY}&language=sv-SE&with_genres=${genreId}&page=${page}`;
        } else {
            url = `${BASE_URL}/movie/popular?api_key=${RAW_API_KEY}&language=sv-SE&page=${page}`;
        }
        
    const response = await fetch(url);

    if (!response.ok) {
        console.error('HTTP Error:', response.status);
        return;
    }

        const data = await response.json();
        // const results: Movie[] = await data;
        return data;
    // } catch (error) {
    //     console.error("Fel vid hämtning av filmer:", error);
    //     return null;
    // }


}

export const fetchMovie = async (id: string) => {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${RAW_API_KEY}&language=sv-SE`);
    //TODO: check if data is ok
    const data: Movie= await res.json();
    return data;
}

export const fetchSearchMovie = async (query: string) => {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${RAW_API_KEY}&query=${query}`);
    const data = await res.json();
    const filteredMovies = await data.results.filter((movie: Movie) => movie.title && movie.poster_path);
    const results: Movie[] = filteredMovies;
    return results;
}

export const fetchGenres = async () => {
    try {
        const response = await fetch(genreUrl);
        const data = await response.json();
        return data.genres;
        
    } catch (error) {
        console.error("Fel vid hämtning av genrer:", error);
    }
}

export async function fetchMoviesByGenre(genreId: string) {
    try {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${RAW_API_KEY}&language=sv-SE&with_genres=${genreId}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log('Filmer:', data.results);
        return data.results;
    } catch (error) {
        console.error("Fel vid hämtning av filmer:", error);
        return [];
    }
}
