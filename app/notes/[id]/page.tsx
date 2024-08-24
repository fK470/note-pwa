"use client";

import { useLiveQuery } from "dexie-react-hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

import { db } from "@/app/models/db";

export default function NoteDetailPage({ params }: { params: { id: string } }) {
  const noteId = Number(params.id);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const note = useLiveQuery(async () => {
    const note = await db.notes.get(noteId);
    return note;
  }, [noteId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [popoverRef]);

  const handleOnClickDelete = () => {
    db.notes.delete(noteId);
    router.push("/notes");
  };

  return (
    <div className="sm:w-full md:w-3/4 lg:w-1/2 mx-auto p-4 mb">
      <button className="bg-gray-400 text-white px-4 py-2 mb-3 rounded hover:bg-gray-600">
        <Link href="/notes">Back</Link>
      </button>
      <div className="border rounded-lg bg-slate-50 shadow">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold p-4">{note?.title}</h1>
          <div className="relative px-4 " ref={popoverRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="rounded text-slate-800">
              <EllipsisHorizontalIcon className="w-8 h-8" />
            </button>
            {isOpen && (
              <ul className="absolute z-10 p-2 bg-slate-200 rounded-lg shadow-lg">
                <li className="px-2 py-1 rounded hover:bg-slate-400">
                  <Link href={`/notes/${params.id}/edit`}>Edit</Link>
                </li>
                <li className="px-2 py-1 rounded hover:bg-slate-400">
                  <button onClick={handleOnClickDelete}>Delete</button>
                </li>
              </ul>
            )}
          </div>
        </div>
        <p className="text-gray-700 p-4 mb-4">{note?.content}</p>
      </div>
    </div>
  );
}
