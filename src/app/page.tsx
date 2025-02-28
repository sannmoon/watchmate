import Link from "next/link";
import prisma from "@/db";
import MediaBox from "@/components/MediaBox";

export default async function Home() {
  const movies = await prisma.movie.findMany({
    where: {
      status: {
        in: ["WANT_WATCH", "WATCHED"],
      },
    },
  });

  const tvSeries = await prisma.tVSeries.findMany({
    where: {
      status: {
        in: ["WANT_WATCH", "WATCHED"],
      },
    },
    include: { seasons: true },
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Movies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {movies.map((movie) => {
            return <MediaBox key={movie.id} type="movies" data={movie} />;
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">TV Series</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {tvSeries.map((series) => {
            return <MediaBox key={series.id} type="tvseries" data={series} />;
          })}
        </div>
      </section>
    </main>
  );
}
