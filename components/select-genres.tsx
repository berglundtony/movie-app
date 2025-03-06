import { fetchGenres } from "@/src/app/actions";
import { useEffect, useState } from "react";
interface GenreSelectProps {
    onSelectGenre: (genreId: string) => void;
}

const GenreSelect = ({ onSelectGenre }: GenreSelectProps) => {
    const [genres, setGenres] = useState < { id: number; name: string }[]>([]);


    useEffect(() => {
        const getGenres = async () => {
            const genres = await fetchGenres();
            setGenres(genres);
            console.log(genres);
        };
        getGenres();
    }, []);

    return (
        <select
            className="p-1 border rounded bg-white text-black"
            onChange={(e) => onSelectGenre(e.target.value)}
        >
            <option value="">Välj en kategori</option>
            {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                    {genre.name}
                </option>
            ))}
        </select>
    );
};
export default GenreSelect;