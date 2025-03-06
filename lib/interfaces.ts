export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    wishlist: boolean;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
 
export interface searchAndGenreProps {
    query: string | null;
    genreId: string | null;
}

export interface MovieContextInterface {
    query: string;
    genreId: string;
    wishList: Movie[];
    changeMovieWishList: (movie: Movie | undefined) => void;
    movieList: { results: Movie[]; total_pages: number; };

}