"use client"
import { useSearchParams } from "next/navigation"   
import MoviesList from "../../../components/movies-list";
import { useContext } from "react";
import { MovieContext } from "@/src/app/providers"; 

export default function SearchPage() {
    const query = useSearchParams().get('query') || '';
    const movieCtx = useContext(MovieContext);
    // Hantera om contexten är null
    if (!movieCtx) {
        return <p>Loading...</p>; // Eller någon annan fallback för att visa när contexten inte är tillgänglig
    }
    const { wishList, changeMovieWishList, movieList } = movieCtx;
    if (!movieList || !movieList.results) {
        return <p>Loading movies...</p>; // Visa en laddningsskärm om movieList.results är undefined
    }
    return (
        <main>
            <h1 className="text-center text-2xl font-bold my-6">Sökresultat för: {query}</h1>
            <MoviesList query={query} genreId="" filteredMovies={undefined} wishList={wishList} changeMovieWishList={changeMovieWishList} movieList={movieList} />
        </main>
    );
}
