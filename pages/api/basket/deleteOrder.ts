import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';

type Data = {
  message: string;
};

type Error = {
  error: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const db = await getDb();
    const { id } = req.body ?? {};
    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: 'Missing id' });
      return;
    }

    await db.collection('fenster-orders').deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.dir(error, { depth: null });
    res.status(500).json({ error: 'Failed to delete from DB' });
  }
}
