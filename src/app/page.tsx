import MoviesList from "@/components/movies-list";


export default async function Home() {
  return (
      <main>
            <h1 className="text-center text-2xl font-bold my-6">Populära filmer</h1>
      <MoviesList />
    </main>
    );
  }
