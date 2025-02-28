"use client";

import Link from "next/link";
import React, { useState } from "react";

type Props = {
  editLink: string;
  onDelete: () => void;
};

export default function EllipsisButton({ editLink, onDelete }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete?")) {
      onDelete();
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>⋮</button>

      {isOpen && (
        <div className="absolute right-0 bg-[#0d263d] shadow-md rounded p-2">
          <Link
            href={editLink}
            className="block w-full text-left px-4 py-2 text-green-400 hover:bg-[#03091b]"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="block w-full text-left px-4 py-2 text-red-400 hover:bg-[#100]"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
