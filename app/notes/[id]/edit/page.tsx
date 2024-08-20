"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { db } from "@/app/models/db";

export default function EditNotePage({ params }: { params: { id: string } }) {
  const noteId = Number(params.id);
  const note = useLiveQuery(async () => {
    const note = await db.notes.get(noteId);
    return note;
  }, [noteId]);

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (note) {
      setTitle(note.title ?? "");
      setContent(note.content ?? "");
    }
  }, [note]);

  const router = useRouter();

  const handleOnClickUpdate = () => {
    if (title && content) {
      db.notes.update(noteId, { title: title, content: content });
      router.push(`/notes`);
    }
  };

  if (!note) {
    return <div>Loading...</div>; // ロード中の状態を表示
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Title</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={title ?? ""}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Content</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          value={content ?? ""}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          required
        />
      </div>
      <button onClick={handleOnClickUpdate} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Update
      </button>
    </div>
  );
}
