"use client"
import { useState } from 'react';

const API_KEY = '0bd07cd4d4166d94ef83bad8d6d24b08';
const BASE_URL = 'https://api.themoviedb.org/3';

export default function MovieSearch() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState<{ id: number; title: string; release_date: string }[]>([]);

    async function handleSearch() {
        if (!query.trim()) return;
        const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results);
    }

    return (
        <div>
            <input type="text"
                placeholder="Sök efter en film..."
                value={query}
                onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch} > Sök </button>

            <ul>
                {
                    movies.map(movie => (
                        <li key={movie.id} >
                            {movie.title}({movie.release_date?.slice(0, 4) || "Okänt år"})
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
