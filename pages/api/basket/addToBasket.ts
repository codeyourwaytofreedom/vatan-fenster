import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '@/lib/mongodb';
import { basisValidator } from '@/lib/models/basisModel';

type Data = {
  message: string;
};

type Error = {
  error: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  try {
    const db = await getDb();
    const { basis, farben, verglasung, zusatze } = req.body ?? {};

    await db.createCollection('fenster-orders', {
      validator: basisValidator,
      validationAction: 'error',
      validationLevel: 'strict',
    });

    await db.collection('fenster-orders').insertOne({
      basis, farben, verglasung, zusatze
    });

    res.status(200).json({ message: 'Order added successfully' });
  } catch (error) {
    console.dir(error, { depth: null });
    res.status(500).json({ error: 'Failed to add to DB' });
  }
}
