"use client";

import React from "react";
import { TbMovie } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import { toggleStatusWatch } from "@/action";

interface ToggleButtonProps {
  id: string;
  type: "movies" | "tvseries";
  currentStatus: "WANT_WATCH" | "WATCHED";
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  id,
  type,
  currentStatus,
}) => {
  const toggleStatusWatchWithData = toggleStatusWatch.bind(
    null,
    id,
    currentStatus === "WANT_WATCH" ? "WATCHED" : "WANT_WATCH",
    type
  );

  const handleToggleStatus = async (status: "WANT_WATCH" | "WATCHED") => {
    const response = await fetch(`/api/toggle-status`, {
      method: "POST",
      body: JSON.stringify({ id, status, type }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to update status");
    } else {
    }
  };

  return (
    <div className="flex justify-center gap-8">
      <div className="flex flex-col items-center">
        <button
          onClick={toggleStatusWatchWithData}
          className={`p-2 rounded-full border ${
            currentStatus === "WANT_WATCH"
              ? "bg-[#a66fdd] border-[#a66fdd]"
              : "border"
          }`}
        >
          <TbMovie className="w-6 h-6" />
        </button>
        <span
          className={`text-sm ${
            currentStatus === "WANT_WATCH" ? "text-[#a66fdd]" : ""
          }`}
        >
          Watchlist
        </span>
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={toggleStatusWatchWithData}
          className={`p-2 rounded-full border ${
            currentStatus === "WATCHED"
              ? "bg-[#a66fdd] border-[#a66fdd]"
              : "border"
          }`}
        >
          <TiTick className="w-6 h-6" />
        </button>
        <span
          className={`text-sm ${
            currentStatus === "WATCHED" ? "text-[#a66fdd]" : ""
          }`}
        >
          Watched
        </span>
      </div>
    </div>
  );
};

export default ToggleButton;
