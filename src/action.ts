"use server";

import prisma from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addToWatchList(formData: FormData) {
  const type = formData.get("type") as "movie" | "tvseries";
  const title = formData.get("title") as string;
  const seasons = formData.get("seasons") as string;

  if (!type || !title) {
    throw new Error("Title and type are required");
  }

  if (type === "movie") {
    await prisma.movie.create({
      data: {
        title,
        watchedDate: new Date(),
        status: "WANT_WATCH",
      },
    });
  } else {
    const tvSeries = await prisma.tVSeries.create({
      data: {
        title,
        watchedDate: new Date(),
        status: "WANT_WATCH",
      },
    });

    const numberOfSeasons = parseInt(seasons) || 1;
    for (let i = 1; i <= numberOfSeasons; i++) {
      await prisma.season.create({
        data: {
          number: i,
          tvSeriesId: tvSeries.id,
        },
      });
    }
  }

  redirect("/");
}

export async function toggleStatusWatch(
  id: string,
  status: "WANT_WATCH" | "WATCHED",
  type: "movies" | "tvseries"
) {
  if (type === "movies") {
    await prisma.movie.update({
      where: {
        id: Number(id),
      },
      data: {
        watchedDate: new Date(),
        status: status,
      },
    });
  } else {
    await prisma.tVSeries.update({
      where: {
        id: Number(id),
      },
      data: {
        watchedDate: new Date(),
        status: status,
      },
    });
  }

  revalidatePath("/");
}

export async function deleteAction(id: number, type: "movies" | "tvseries") {
  if (type === "movies") {
    await prisma.movie.delete({ where: { id } });
  } else {
    await prisma.season.deleteMany({ where: { tvSeriesId: id } });
    await prisma.tVSeries.delete({ where: { id } });
  }

  revalidatePath("/");
}
