import Dexie, { type EntityTable } from 'dexie';

interface Note {
  id: number;
  title: string;
  content: string;
}

const db = new Dexie('notes-database') as Dexie & {
  notes: EntityTable<Note, 'id'>;
};

db.version(1).stores({
  notes: '++id, title, content',
});

export type { Note };
export { db };
