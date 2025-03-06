"use client"
import { Movie, MovieContextInterface } from "@/lib/interfaces";
import React, { createContext, useEffect, useState } from "react";
import { fetchMovies } from "./actions";

// 1. Skapa context
export const MovieContext = createContext<MovieContextInterface | null>(null);

// 2. Provide-komponent
export function MovieProvider({ children }: { children: React.ReactNode }) {
    const [wishList, setMovieWishList] = useState<Movie[]>([])

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
            {children}
        </MovieContext.Provider>
    )
}