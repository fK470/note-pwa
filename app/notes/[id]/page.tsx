'use client';

import { notFound } from 'next/navigation';

type Note = {
  id: number;
  title: string;
  content: string;
};

const notes: Note[] = [
  {
    id: 1,
    title: 'First Note',
    content: 'This is the content of the first note.',
  },
  {
    id: 2,
    title: 'Second Note',
    content: 'This is the content of the second note.',
  },
];

export default function NoteDetailPage({ params }: { params: { id: string } }) {
  const noteId = parseInt(params.id, 10);
  const note = notes.find((note) => note.id === noteId);

  if (!note) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{note?.title}</h1>
      <p className="text-gray-700 mb-4">{note?.content}</p>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={() => {
          // ここでメモを削除するロジックを追加
          console.log('Delete note with ID:', noteId);
        }}
      >
        Delete Note
      </button>
    </div>
  );
}
