import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

// src/types/Task.ts
export interface Task {
    id: string;
    text: string;
    status: 'active' | 'waiting';
    userId: string;
    createdAt: FirebaseFirestoreTypes.Timestamp;
  }
  