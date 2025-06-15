import firestore from '@react-native-firebase/firestore';

const COLLECTION = 'price_updates';

export type PriceUpdate = {
  id: string;
  description: string;
  status: 'Waiting';
  date: string;
};

// Add a new price update
export const addPriceUpdate = async (description: string): Promise<PriceUpdate> => {
  const newUpdate = {
    description,
    status: 'Waiting',
    date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
  };

  const docRef = await firestore().collection(COLLECTION).add(newUpdate);
  return { id: docRef.id, ...newUpdate };
};

// Fetch all price updates
export const fetchPriceUpdates = async (): Promise<PriceUpdate[]> => {
  const snapshot = await firestore()
    .collection(COLLECTION)
    .orderBy('date', 'desc')
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<PriceUpdate, 'id'>),
  }));
};

// Delete a price update by ID
export const deletePriceUpdate = async (id: string): Promise<void> => {
  await firestore().collection(COLLECTION).doc(id).delete();
};
