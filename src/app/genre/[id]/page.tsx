import MoviesList from "@/components/movies-list";



export default async function GenrePage({
    params }: {
        params: { id: string }
    }) {
    return (
        <main>
            <h1 className="text-center text-2xl font-bold my-6">Filmer i vald kategori</h1>
            <MoviesList query={null} genreId={(params).id} />
        </main>
    )
};