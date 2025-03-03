import Image from "next/image";
import { fetchMovies } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import MovieSearch from "@/components/ui/movie-search";


export default async function Home({
  // searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const data = await fetchMovies();
  
  // const { searchNumber } = await searchParams;
  // const data = await fetchMoviesByGenre(searchNumber);
  // debugger;
  // console.log(data);
  return (
    <>
      <MovieSearch>Search</MovieSearch>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 my-8 mx-4 justify-items-center">
      {data.map((movie) => (
        <li key={movie.id} className="h-full w-full">
          <Link href={`/movie/${movie.id}`}>
          <Card className="flex flex-col h-full p-4 bg-white rounded-lg shadow-sm hover:scale-103 hover:shadow-xl transition-all duration-300">
  
            <CardContent className="flex flex-col h-full">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={350}
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
      ))}
      </ul>
    </>
  );
}
