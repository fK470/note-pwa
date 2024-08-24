"use client";

import { useLiveQuery } from "dexie-react-hooks";
import Link from "next/link";

import { db } from "../models/db";

export default function NotesPage() {
  const notes = useLiveQuery(() => db.notes.toArray());

  return (
    <div className="sm:w-full md:w-3/4 lg:w-1/2 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>
      <ul className="space-y-4">
        {notes?.map((note) => (
          <li key={note.id} className="border p-4 rounded-lg shadow">
            <Link href={`/notes/${note.id}`} className="text-xl font-semibold text-blue-500 hover:underline">
              {note.title}
            </Link>
            <p className="text-gray-700 mt-2">{note.content}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Link href="/notes/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create New Note
        </Link>
      </div>
    </div>
  );
}
