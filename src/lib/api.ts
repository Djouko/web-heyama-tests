const BASE =
  typeof window === 'undefined'
    ? process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL;

export interface ObjectItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export async function fetchObjects(): Promise<ObjectItem[]> {
  const res = await fetch(`${BASE}/objects`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch objects');
  return res.json();
}

export async function fetchObject(id: string): Promise<ObjectItem> {
  const res = await fetch(`${BASE}/objects/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Object not found');
  return res.json();
}

export async function createObject(formData: FormData): Promise<ObjectItem> {
  const res = await fetch(`${BASE}/objects`, { method: 'POST', body: formData });
  if (!res.ok) throw new Error('Failed to create object');
  return res.json();
}

export async function deleteObject(id: string): Promise<void> {
  const res = await fetch(`${BASE}/objects/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete object');
}