'use client';

import { useEffect, useState, useCallback } from 'react';
import { fetchObjects, ObjectItem } from '@/lib/api';
import { ObjectCard } from '@/components/ObjectCard';
import { CreateObjectForm } from '@/components/CreateObjectForm';
import { useSocket } from '@/hooks/useSocket';

export default function HomePage() {
  const [objects, setObjects] = useState<ObjectItem[]>([]);
  const socket = useSocket();

  const loadObjects = useCallback(async () => {
    const data = await fetchObjects();
    setObjects(data);
  }, []);

  useEffect(() => { loadObjects(); }, [loadObjects]);

  useEffect(() => {
    if (!socket) return;

    socket.on('object:created', (obj: ObjectItem) => {
      setObjects((prev) => [obj, ...prev]);
    });

    socket.on('object:deleted', ({ id }: { id: string }) => {
      setObjects((prev) => prev.filter((o) => o._id !== id));
    });

    return () => {
      socket.off('object:created');
      socket.off('object:deleted');
    };
  }, [socket]);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-medium">Collection d'objets</h1>
      <CreateObjectForm onCreated={() => {}} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {objects.length === 0 && (
          <p className="col-span-full text-muted-foreground text-center py-8">
            Aucun objet pour le moment.
          </p>
        )}
        {objects.map((obj) => (
          <ObjectCard
            key={obj._id}
            object={obj}
            onDeleted={(id) => setObjects((prev) => prev.filter((o) => o._id !== id))}
          />
        ))}
      </div>
    </main>
  );
}