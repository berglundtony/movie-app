"use client"
import { MovieContext } from "@/src/app/providers";
import { useContext } from "react";

export default function WishlistCheck({ params }: { params: { id: string } }) {
    const moviectx = useContext(MovieContext);
    if (!moviectx) throw new Error('movieContext måste användas inom en MovieProvider');
    const { wishList, changeMovieWishList } = moviectx;
    console.log("Movie Context:", wishList.results);
    const currentMovie = wishList.results.find(movie => movie.id.toString() === params.id)
    return (
        <label className="flex flex-col items-center text-white space-y-1">
            <span className="text-xs font-small">
                {currentMovie ? (currentMovie.wishlist ? "Is Present" : "Not Present") : "Film not found"}
            </span>
            {/* <Switch checked={currentDog?.present} onCheckedChange={() => changeDogPresent(currentDog)} /> */}
            <button
                onClick={() => changeMovieWishList(currentMovie)}
                className={`w-15 h-7 flex items-center rounded-full transition-colors border-2 border-transparent outline-2 outline-white 
                ${currentMovie?.wishlist ? "bg-green-100" : "bg-pink-100"}`}>
                <div className={`w-6 h-6 rounded-full shadow-md transform transition-transform 
                ${currentMovie?.wishlist ? "bg-emerald-600 translate-x-8" : "bg-pink-600 translate-x-0"}`} />
            </button>
        </label>
        
    )
}