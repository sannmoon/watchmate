import MediaForm from "@/components/MediaForm";
import { redirect } from "next/navigation";
import prisma from "@/db";

async function editTVSeriesAction(id: number, formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const status = formData.get("status") as "WANT_WATCH" | "WATCHED";
  const seasonsCount = Number(formData.get("seasons"));

  await prisma.tVSeries.update({
    where: { id: id },
    data: {
      title,
      status,
      watchedDate: status === "WATCHED" ? new Date() : null,
    },
  });

  if (!isNaN(seasonsCount) && seasonsCount > 0) {
    await prisma.season.deleteMany({ where: { tvSeriesId: id } });

    const newSeasons = Array.from({ length: seasonsCount }, (_, i) => ({
      number: i + 1,
      tvSeriesId: id,
    }));

    await prisma.season.createMany({ data: newSeasons });
  }

  redirect("/");
}

export default async function EditTVSeries({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  async function getTVSeriesData(id: string) {
    try {
      const tvSeries = await prisma.tVSeries.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
        include: {
          seasons: true,
        },
      });
      return { tvSeries };
    } catch {
      redirect("/");
    }
  }

  const awaitedParams = await params;
  const { tvSeries } = await getTVSeriesData(awaitedParams.id);
  const editTVSeriesActionWithId = editTVSeriesAction.bind(
    null,
    Number(awaitedParams.id)
  );

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Edit TV Series</h1>
      <MediaForm
        action={editTVSeriesActionWithId}
        withStatus={true}
        buttonText="Update"
        initialValues={{
          title: tvSeries.title,
          status: tvSeries.status,
          seasons: tvSeries.seasons.length,
        }}
      />
    </>
  );
}
