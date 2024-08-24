"use client";

import { useLiveQuery } from "dexie-react-hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { db } from "@/app/models/db";

export default function NoteDetailPage({ params }: { params: { id: string } }) {
  const noteId = Number(params.id);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const note = useLiveQuery(async () => {
    const note = await db.notes.get(noteId);
    return note;
  }, [noteId]);

  const handleOnClickDelete = () => {
    db.notes.delete(noteId);
    router.push("/notes");
  };

  return (
    <div className="w-1/2 mx-auto p-4">
      <div className="flex justify-between mb-4">
        <Link href="/notes" className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600">
          Back
        </Link>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            ...
          </button>
          {isOpen && (
            <ul className="absolute z-10 p-3 bg-slate-200 rounded-lg shadow-lg space-y-2">
              <li className="pb-2 border-solid border-b border-gray ">
                <Link href={`/notes/${params.id}/edit`}>Edit</Link>
              </li>
              <li className="">
                <button onClick={handleOnClickDelete}>Delete</button>
              </li>
            </ul>
          )}
        </div>
      </div>
      <h1 className="border rounded-lg bg-slate-50 text-2xl font-bold p-4 mb-4">{note?.title}</h1>
      <p className="border rounded-lg bg-slate-50 text-gray-700 p-4 mb-4">{note?.content}</p>
    </div>
  );
}
