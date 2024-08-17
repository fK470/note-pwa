'use client';

import { db } from '@/app/utils/db';
import { useLiveQuery } from 'dexie-react-hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NoteDetailPage({ params }: { params: { id: string } }) {
  const noteId = Number(params.id);
  const router = useRouter();

  const note = useLiveQuery(async () => {
    const note = await db.notes.get(noteId);
    return note;
  }, [noteId]);

  const handleOnClickDelete = () => {
    db.notes.delete(noteId);
    router.push('/notes');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{note?.title}</h1>
      <p className="text-gray-700 mb-4">{note?.content}</p>
      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleOnClickDelete}>
        Delete
      </button>
      <Link href={`/notes/${params.id}/edit`} className="bg-teal-400 text-white px-4 py-2 rounded hover:bg-teal-600">
        Edit
      </Link>
    </div>
  );
}
