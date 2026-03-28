'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createObject } from '@/lib/api';

interface Props {
  onCreated: () => void;
}

export function CreateObjectForm({ onCreated }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await createObject(data);
      formRef.current?.reset();
      onCreated();
    } catch {
      setError('Erreur lors de la création. Réessaie.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-xl bg-card">
      <h2 className="text-xl font-medium">Ajouter un objet</h2>

      <div className="space-y-1">
        <Label htmlFor="title">Titre</Label>
        <Input id="title" name="title" required placeholder="Mon objet" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Input id="description" name="description" required placeholder="Description de l'objet..." />
      </div>

      <div className="space-y-1">
        <Label htmlFor="image">Image</Label>
        <Input id="image" name="image" type="file" accept="image/*" required />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Envoi en cours...' : 'Créer l\'objet'}
      </Button>
    </form>
  );
}