// src/services/oceanFreightService.ts

import firestore from '@react-native-firebase/firestore';


export interface OceanFreight {
    id: string;
    description: string;
    status: string;
    date: string;
  }

const COLLECTION = 'oceanFreight';

export const addOceanFreight = async (description: string): Promise<void> => {
  const date = new Date().toISOString().split('T')[0];

  await firestore().collection(COLLECTION).add({
    description,
    status: 'Waiting',
    date,
  });
};

export const fetchOceanFreight = async (): Promise<OceanFreight[]> => {
  const snapshot = await firestore()
    .collection(COLLECTION)
    .orderBy('date', 'desc')
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as OceanFreight[];
};

export const deleteOceanFreight = async (id: string): Promise<void> => {
  await firestore().collection(COLLECTION).doc(id).delete();
};
