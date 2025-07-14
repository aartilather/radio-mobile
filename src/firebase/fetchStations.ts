import { getDocs, collection } from 'firebase/firestore';
import { db } from './config';
import { Station } from '../types/station';

export const fetchStationsFromFirebase = async (): Promise<Station[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'stations'));
    const stations: Station[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Station, 'id'>),
    }));
    return stations;
  } catch (error) {
    console.error('Error fetching stations:', error);
    return [];
  }
};
