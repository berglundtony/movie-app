import MoviesList from "@/components/movies-list";
import { Movie } from "@/lib/interfaces";

export default async function GenrePage( { params }: {
        params: { id?: string }
    }) {
    if (!params?.id) {
        return <p>Laddar...</p>;
    }
    return (
        <main>
            <h1 className="text-center text-2xl font-bold my-6">Filmer i vald kategori</h1>
            <MoviesList query={""} genreId={params.id} filteredMovies={undefined} />
        </main>
    )
};