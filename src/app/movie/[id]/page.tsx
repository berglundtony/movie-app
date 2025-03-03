import { fetchMovie } from "@/src/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Movie } from "@/lib/interfaces";
import Image from "next/image";


export default async function MoviePage({
    params,
}: {
    params: Promise<{ id: string }>;
    }) {
    const { id } = await params;
    const data: Movie = await fetchMovie(id);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
          <CardContent className="space-y-4 flex">
              <Image
                  className="w-full max-w-[260px] px-4"
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt={data.title}
                  width={300}
                  height={300}
              />
            <div className="grid gap-2">
                <p>{data.overview}</p>
            </div>
      </CardContent>
    </Card>
  );
}