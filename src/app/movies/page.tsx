import prisma from "@/db";
import MediaBox from "@/components/MediaBox";

async function getMovies() {
  "use server";
  const wantWatchMovies = await prisma.movie.findMany({
    where: { status: "WANT_WATCH" },
    orderBy: { id: "desc" },
  });

  const watchedMovies = await prisma.movie.findMany({
    where: { status: "WATCHED" },
    orderBy: { watchedDate: "desc" },
  });

  return { wantWatchMovies, watchedMovies };
}

export default async function MoviePage() {
  const { wantWatchMovies, watchedMovies } = await getMovies();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Movies</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Want to Watch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wantWatchMovies.map((movie) => (
            <MediaBox key={movie.id} type="movies" data={movie} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Watched</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchedMovies.map((movie) => (
            <MediaBox key={movie.id} type="movies" data={movie} />
          ))}
        </div>
      </section>
    </main>
  );
}
