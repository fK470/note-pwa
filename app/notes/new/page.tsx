'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/app/utils/db';

export default function NewNotePage() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const router = useRouter();

  const addNote = async () => {
    try {
      const id = await db.notes.add({
        title,
        content,
      });

      setStatus(`Note ${title} successfully added. Got id ${id}`);
      setTitle('');
      setContent('');
    } catch (error) {
      setStatus(`Failed to add ${title}: ${error}`);
      console.log(status);
    }
    router.push('/notes');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Note</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Title</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Content</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          required
        />
      </div>
      <button onClick={addNote} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Save Note
      </button>
    </div>
  );
}