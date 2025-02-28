import React from "react";
import { Movie, TVSeries } from "@prisma/client";
import { deleteAction } from "@/action";
import EllipsisButton from "./EllipsisButton";
import ToggleButton from "./ToggleButton";

interface MediaBoxProps {
  data?: Movie | (TVSeries & { seasons: string[] }) | null;
  type: "movies" | "tvseries";
}

export default function MediaBox({ data, type }: MediaBoxProps) {
  const isMovie = type === "movies";

  if (!data) {
    return null;
  }

  const deleteWithId = deleteAction.bind(null, data.id, type);

  return (
    <div className="bg-[#220d44] shadow-md rounded-lg p-4 flex">
      <div className="w-full">
        <div className="flex h-32">
          <h3 className="flex-1 text-xl font-semibold text-center">
            {data.title}
          </h3>
          <div className="ml-auto">
            <EllipsisButton
              editLink={`/${type === "movies" ? "movies" : "tvseries"}/edit/${
                data.id
              }`}
              onDelete={deleteWithId}
            />
          </div>
        </div>

        {!isMovie && "seasons" in data && (
          <p className="text-sm mt-1 text-center mb-4">
            Seasons: {data.seasons.length || "Unknown"}
          </p>
        )}

        <div className="mt-auto flex flex-col items-center">
          <ToggleButton
            id={data.id.toString()}
            type={type}
            currentStatus={data.status as "WANT_WATCH" | "WATCHED"}
          />
        </div>
      </div>
    </div>
  );
}
