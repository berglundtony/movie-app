import { fetchMovie } from "@/src/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Movie } from "@/lib/interfaces";
import Image from "next/image";


export default async function MoviePage({
  params, }: {
    params: Promise<{ id: string }>;
  }) {
    const { id } = await params;
    const data: Movie = await fetchMovie(id);
  return (
    <Card className=" max-w-[70ch] mx-auto">
      <CardHeader className="text-center">
        <CardTitle>
          <h1 className="font-bold text-xl">
            {data.title}
          </h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 grid grid-cols-1 sm:grid-cols-2">
          <>
              <Image
                  className="w-full max-w-[260px] px-4 object-contain"
                  src={data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : `/glyphicons-basic-38.svg` }
                  alt={data.title}
                  width={300}
                  height={300}
                  style={{ width: "auto", height: "auto" }} 
              />
            <div className="grid gap-2">
                <p>{data.overview}</p>
            </div>
          </>
      </CardContent>
    </Card>
  );
}