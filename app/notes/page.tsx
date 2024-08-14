import Link from 'next/link';

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

export default function NotesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>
      <ul className="space-y-4">
        {notes.map((note) => (
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
