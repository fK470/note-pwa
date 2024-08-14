"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Note = {
  id: number;
  title: string;
  content: string;
};

const notes: Note[] = [
  {
    id: 1,
    title: "First Note",
    content: "This is the content of the first note.",
  },
  {
    id: 2,
    title: "Second Note",
    content: "This is the content of the second note.",
  },
];

export default function EditNotePage({ params }: { params: { id: string } }) {
  const noteId = parseInt(params.id, 10);
  const note = notes.find((note) => note.id === noteId);
  const [title, setTitle] = useState<string>(note?.title || "");
  const [content, setContent] = useState<string>(note?.content || "");
  const router = useRouter();

  useEffect(() => {
    if (!note) {
      router.push("/notes");
    }
  }, [note, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここでメモを保存するロジックを追加
    console.log("Update note:", { title, content });
    router.push(`/notes/${noteId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Content
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Note
        </button>
      </form>
    </div>
  );
}
