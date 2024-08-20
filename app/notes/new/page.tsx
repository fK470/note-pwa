"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { db } from "@/app/models/db";

export default function NewNotePage() {
  const [note, setNote] = useState({ title: "", content: "" });

  const router = useRouter();

  const addNote = async () => {
    try {
      await db.notes.add(note);
    } catch (err) {
      console.error(err);
    }
    setNote({ title: "", content: "" });
    router.push("/notes");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Note</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Title</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Content</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          rows={6}
          required
        />
      </div>
      <button onClick={addNote} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Save
      </button>
    </div>
  );
}
