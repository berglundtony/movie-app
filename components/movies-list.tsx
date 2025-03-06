"use client"
import { useContext, useEffect, useState } from "react";

import { fetchMovies } from "@/src/app/actions"; // Importera fetch-funktionen
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Movie, MovieContextInterface } from "@/lib/interfaces";
import { MovieContext } from "@/src/app/providers";


export default function MoviesList({ query, genreId, filteredMovies }: MovieContextInterface & { filteredMovies?: Movie[] }) {

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const movieCtx = useContext(MovieContext);
    if (!movieCtx) throw new Error("MovieContext måste användas inom en MovieProvider");


    const { wishList } = movieCtx;
    const [movies, setMovies] = useState<Movie[]>([]);

    console.log("wishList:", wishList);

    useEffect(() => {
        const getMovies = async () => {
            setLoading(true);
            try {
                const data = await fetchMovies(Math.max(1, Math.min(page, 500)), query ?? undefined, genreId ?? undefined);
                if (data) {
                    setMovies(
                        data.results.map((movie) => ({
                            ...movie,
                            wishlist: wishList.some((wishMovie) => wishMovie.id === movie.id),
                        }))
                    );
                    setTotalPages(Math.min(data.total_pages, 500));
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };
        getMovies();
    }, [page, query, genreId, wishList]);

    // Uppdatera movies om wishList ändras
    useEffect(() => {
        setMovies((prevMovies) =>
            prevMovies.map((movie) => ({
                ...movie,
                wishlist: wishList.some((wishMovie) => wishMovie.id === movie.id),
            }))
        );
    }, [JSON.stringify(wishList)]);




    if (loading) return <p>Searching for movies...</p>
    const displayedMovies = filteredMovies && filteredMovies.length > 0 ? filteredMovies : movies;
    console.log(`displayedMovies: ${displayedMovies}`);
    console.log("wishList:", wishList);
    console.log("movies:", movies);


    return (
        <div className="text-center">
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 my-8 mx-4 justify-items-center">
                {displayedMovies.length > 0 ? (
                    displayedMovies?.map((movie) => (
                        <li key={movie.id} className={`h-full w-full rounded-xl border-4 ${movie.wishlist ? "border-emerald-600" : "border-pink-600"}`}>
                            <Link href={`/movie/${movie.id}`}>
                                <Card className="flex flex-col h-full p-4 bg-white rounded-lg shadow-sm hover:scale-103 hover:shadow-xl transition-all duration-300">
                                    <CardContent className="flex flex-col h-full">
                                        <Image
                                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `/glyphicons-basic-38.svg`}
                                            alt={movie.title}
                                            width={200}
                                            height={350}
                                            style={{ width: "auto", height: "auto" }}
                                            className="rounded-md"
                                        />
                                        <CardHeader className="p-0 -ml-2 font-semibold text-gray-800">
                                            <CardTitle className="w-full text-left text-base py-2 ml-2 font-semibold text-gray-800">{movie.title?.trim() ? movie.title : movie.original_title}</CardTitle>
                                        </CardHeader>
                                        <p className="text-sm text-gray-600 font-bold">Release datum:  <span className="font-normal">{movie.release_date}</span></p>
                                        <p className="text-sm text-gray-600 font-bold">Betyg: <span className="font-normal">{movie.vote_average}</span></p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </li>
                    ))
                ) :
                    (<p>No movies found for {query}.</p>)
                }

            </ul>

            {/* Paginering */}
            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={() => setPage((1))}
                    disabled={page === 1}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300"
                >
                    Första
                </button>
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300"
                >
                    Föregående
                </button>
                <span className="text-lg font-semibold">Sida {page} av {totalPages}</span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300"
                >
                    Nästa
                </button>
                <button
                    onClick={() => setPage(totalPages)}
                    disabled={page >= totalPages}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300"
                >
                    Sista
                </button>
            </div>
        </div>
    )
};




