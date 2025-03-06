"use client"
import { Movie, MovieContextInterface } from "@/lib/interfaces";
import React, { createContext, useEffect, useState, ReactNode } from "react";
import { fetchMovies } from "./actions";

// 1. Skapa context
export const MovieContext = createContext<MovieContextInterface | null>(null);

// 2. Provide-komponent
export function MovieProvider({ children }: { children: React.ReactNode }) {
    const [wishList, setMovieWishList] = useState<Movie[]>([])
    const [movieList, setMovieList] = useState<{ results: Movie[], total_pages: number }>({ results: [], total_pages: 1 });
    const [query, setQuery] = useState<string>("");
    const [genreId, setGenreId] = useState<string>("");

    // 🛠 Hämta filmerna från API vid render
    useEffect(() => {
        fetchMovies().then(data => {
            if (Array.isArray(data.results)) {
                setMovieList({ results: data.results, total_pages: data.total_pages });
            }
        });
    }, []);

    useEffect(() => {
        setMovieList((prevMovieList) => ({
            ...prevMovieList,
            results: prevMovieList.results.map((movie) => {
                const isInWishList = wishList.some((item) => item.id === movie.id);
                return isInWishList ? { ...movie, wishlist: true } : movie;
            }),
        }));
    }, [wishList]); 


    // Körs endast vid första renderingen
    const changeMovieWishList = (movie: Movie) => {
        console.log("🛠️ Ändrar wishlist-status för:", movie);

        setMovieWishList((prev) => {
            const exists = prev.some((m) => m.id === movie.id);
            if (exists) {
                console.log("❌ Tar bort från wishlist:", movie.id);
                return prev.filter((m) => m.id !== movie.id);
            } else {
                console.log("✅ Lägger till i wishlist:", movie.id);
                return [...prev, { ...movie, wishlist: true }];
            }
        });
    };
    return (
        <MovieContext.Provider value={{ wishList, changeMovieWishList, movieList, query, genreId }}>
            {children}
        </MovieContext.Provider>
    )
}