import Image from 'next/image';
import Link from 'next/link';
import { fetchObject } from '@/lib/api';
import { Button } from '@/components/ui/button';

export default async function ObjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const object = await fetchObject(id);

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Button asChild variant="outline">
        <Link href="/">← Retour</Link>
      </Button>

      <div className="relative h-72 w-full rounded-xl overflow-hidden">
        <Image src={object.imageUrl} alt={object.title} fill className="object-cover" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-medium">{object.title}</h1>
        <p className="text-muted-foreground">
          Créé le {new Date(object.createdAt).toLocaleDateString('fr-FR')}
        </p>
        <p className="text-base leading-relaxed">{object.description}</p>
      </div>
    </main>
  );
}