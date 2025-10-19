"use client";
import React, { useState } from "react";

type MediaStatus = "WANT_WATCH" | "WATCHED";
type MediaType = "movie" | "tvseries";

interface MediaFormInitialValues {
  title?: string;
  status?: MediaStatus;
  seasons?: number;
  type?: MediaType;
}

interface MediaFormProps {
  action: (formData: FormData) => Promise<void>;
  withType?: boolean;
  withStatus?: boolean;
  initialValues?: MediaFormInitialValues;
  buttonText?: string;
}

export default function MediaForm({
  action,
  withType,
  withStatus,
  initialValues,
  buttonText = "Add to Watch List",
}: MediaFormProps) {
  const [type, setType] = useState<MediaType>(initialValues?.type ?? "movie");

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form
        action={action}
        className="space-y-6 w-full max-w-xl px-6 py-16 bg-[#2A3B5C] rounded-lg shadow-lg"
      >
        {withType && (
          <div>
            <label htmlFor="type" className="block mb-2">
              Type
            </label>
            <select
              id="type"
              name="type"
              required
              value={type}
              className="w-full px-3 py-4 bg-[#1E2A4A] rounded-md"
              onChange={(e) => setType(e.target.value as MediaType)}
            >
              <option value="movie">Movie</option>
              <option value="tvseries">TV Series</option>
            </select>
          </div>
        )}
        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full px-3 py-3 bg-[#1E2A4A] rounded-md"
            defaultValue={initialValues?.title}
          />
        </div>
        {type === "tvseries" && (
          <div>
            <label htmlFor="seasons" className="block mb-1">
              Number of Seasons
            </label>
            <input
              id="seasons"
              name="seasons"
              type="number"
              min="1"
              className="w-full px-3 py-3 bg-[#1E2A4A] rounded-md"
              defaultValue={initialValues?.seasons}
            />
          </div>
        )}
        {withStatus && (
          <div>
            <label htmlFor="status" className="block mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              required
              className="w-full px-3 py-2 bg-[#1E2A4A] rounded-md"
              defaultValue={initialValues?.status}
            >
              <option value="WANT_WATCH">Want to Watch</option>
              <option value="WATCHED">Watched</option>
            </select>
          </div>
        )}
        <button
          type="submit"
          className="w-full px-3 py-3 bg-[#904496] text-white rounded-lg hover:bg-green-600"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
