"use client"
import { useSearchParams } from "next/navigation"   
import MoviesList from "../../../components/movies-list";

export default function SearchPage() {
    const query = useSearchParams().get('query') || '';
    // const [loading, setLoading] = useState(true);
    // if (loading) return <p>Loading films...</p>;

    return (
        <main>
            <h1 className="text-center text-2xl font-bold my-6">Sökresultat för: {query}</h1>
            <MoviesList query={query} />
        </main>
    );
}
