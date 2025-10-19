import MediaForm from "@/components/MediaForm";
import { redirect } from "next/navigation";
import prisma from "@/db";

async function editMovieAction(id: number, formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const status = formData.get("status") as "WANT_WATCH" | "WATCHED";

  await prisma.movie.update({
    where: { id: id },
    data: {
      title,
      status,
      watchedDate: status === "WATCHED" ? new Date() : null,
    },
  });

  redirect("/");
}

async function getMovieData(id: string) {
  try {
    const movie = await prisma.movie.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    return { movie };
  } catch {
    redirect("/");
  }
}

export default async function EditMovie({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const awaitedParams = await params;
  const { movie } = await getMovieData(awaitedParams.id);
  const editActionWithId = editMovieAction.bind(null, Number(awaitedParams.id));

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Edit Movie</h1>
      <MediaForm
        action={editActionWithId}
        withStatus={true}
        initialValues={{
          title: movie.title,
          status: movie.status,
        }}
      />
    </>
  );
}
