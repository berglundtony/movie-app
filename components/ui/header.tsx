"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GenreSelect from "../select-genres";


export default function Header() {
    const router = useRouter();
    const [query, setSearchQuery] = useState<string>('');
    const [selectedGenre, setSelectedGenre] = useState("");

    const handleSearch = () => {
        if (query.trim()) {
            router.push(`/search?query=${encodeURIComponent(query)}`);
        } 
    };

    useEffect(() => {
        if (selectedGenre) {
            router.push(`/genre/${selectedGenre}`);
        }
    }, [selectedGenre, router]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && query.trim()) {
            router.push(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    const handleGenreSelect = (genreId: string) => {
        setSelectedGenre(genreId);
        router.push(`/genre/${genreId}`);
    };

    return (
        <header>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-4">
                <Link href={`/`}>
                    <Image
                        src="/logo.svg"
                        alt="logo"
                        width={120}
                        height={80}
                        style={{ width: "auto", height: "auto" }} 
                    />
                </Link>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div>
                    <p className="text-sm">Välj en filmkategori:</p>
                        <GenreSelect onSelectGenre={handleGenreSelect} />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <input type="text"
                        placeholder="Sök efter en film..."
                        className="bg-white text-gray-800 p-1 rounded-md shadow-[0_2px_5px_rgba(255,255,255,0.2)] transition-all duration-300 ease-in-out"
                        value={query}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown} />
                    <button className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded-md shadow-[0_2px_5px_rgba(255,255,255,0.2)] transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none" disabled={!query.trim()}
                        onClick={handleSearch}> Sök
                    </button>
                </div>
            </div>
        </header>
    )

}
// Compare this snippet from components/ui/card.tsx:    