import MediaForm from "@/components/MediaForm";
import prisma from "@/db";
import { redirect } from "next/navigation";

async function saveMovie(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const status = formData.get("status") as string;

  if (!title) {
    throw new Error("Title is required");
  }

  await prisma.movie.create({
    data: {
      title,
      status: "WANT_WATCH",
    },
  });

  redirect("/");
}

export default function AddMovie() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Add Movie</h1>
      <MediaForm action={saveMovie} withStatus={true} />
    </>
  );
}
