"use client"
import { Movie, MovieContextInterface } from "@/lib/interfaces";
<<<<<<< HEAD
import React, { createContext, useEffect, useState, ReactNode } from "react";
=======
import React, { createContext, useEffect, useState } from "react";
>>>>>>> fa7b1c3b50958ebb11d3b00bf7e6dd0efda17dab
import { fetchMovies } from "./actions";

// 1. Skapa context
export const MovieContext = createContext<MovieContextInterface | null>(null);

// 2. Provide-komponent
export function MovieProvider({ children }: { children: React.ReactNode }) {
    const [wishList, setMovieWishList] = useState<Movie[]>([])
<<<<<<< HEAD
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
=======

    // 🛠 Hämta filmerna från API vid render
    useEffect(() => {
        fetchMovies()
            .then(data => {
                if (data) {
                    setMovieWishList(data);
                    console.log("Wishlist:", wishList);
                } else {
                    console.error('No data received');
                }
            })
            .catch(error => console.error(error));
    }, []);

    // Körs endast vid första renderingen
    function changeMovieWishList(movie: Movie | undefined) {
        if (!movie) return;
        setMovieWishList((prev) =>
            prev.map((curr) =>
                curr.id === movie.id ? { ...curr, wishlist: !curr.wishlist } : curr
            )
        )
    };

    return (
        <MovieContext.Provider value= {{ wishList, changeMovieWishList }}>
>>>>>>> fa7b1c3b50958ebb11d3b00bf7e6dd0efda17dab
            {children}
        </MovieContext.Provider>
    )
}