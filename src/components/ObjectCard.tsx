'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ObjectItem, deleteObject } from '@/lib/api';

interface Props {
  object: ObjectItem;
  onDeleted: (id: string) => void;
}

export function ObjectCard({ object, onDeleted }: Props) {
  async function handleDelete() {
    if (!confirm('Supprimer cet objet ?')) return;
    await deleteObject(object._id);
    onDeleted(object._id);
  }

  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={object.imageUrl}
          alt={object.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{object.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">{object.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          {new Date(object.createdAt).toLocaleDateString('fr-FR')}
        </span>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/objects/${object._id}`}>Voir</Link>
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}