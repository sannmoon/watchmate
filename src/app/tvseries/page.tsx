import prisma from "@/db";
import MediaBox from "@/components/MediaBox";

async function getTVSeries() {
  "use server";
  const wantWatchSeries = await prisma.tVSeries.findMany({
    where: { status: "WANT_WATCH" },
    orderBy: { id: "desc" },
    include: { seasons: true },
  });

  const watchedTVSeries = await prisma.tVSeries.findMany({
    where: { status: "WATCHED" },
    orderBy: { watchedDate: "desc" },
    include: { seasons: true },
  });

  return { wantWatchSeries, watchedTVSeries };
}

export default async function MoviePage() {
  const { wantWatchSeries, watchedTVSeries } = await getTVSeries();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">TV Series</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Want to Watch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wantWatchSeries.map((tVSeries) => (
            <MediaBox key={tVSeries.id} type="tvseries" data={tVSeries} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Watched</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchedTVSeries.map((tVSeries) => (
            <MediaBox key={tVSeries.id} type="tvseries" data={tVSeries} />
          ))}
        </div>
      </section>
    </main>
  );
}
