// src/services/taskService.ts
import { Task } from '@/types/task';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

const TASKS_COLLECTION = 'tasks';

export const addTask = async (
    userId: string,
    text: string
  ): Promise<Task> => {
    const createdAt = firestore.FieldValue.serverTimestamp();
  
    const docRef = await firestore().collection('tasks').add({
      userId,
      text,
      status: 'active',
      createdAt,
    });
  
    // Fetch the added doc to get actual timestamp
    const snapshot = await docRef.get();
    const data = snapshot.data();
  
    return {
      id: docRef.id,
      userId: data?.userId,
      text: data?.text,
      status: data?.status as 'active' | 'waiting', // 👈 Type-cast here
      createdAt: data?.createdAt as FirebaseFirestoreTypes.Timestamp,
    };
  };

export const fetchTasks = async (userId: string) => {
    return await firestore()
      .collection('tasks')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
  };

export const updateTaskStatus = async (taskId: string, status: 'active' | 'waiting') => {
  await firestore().collection(TASKS_COLLECTION).doc(taskId).update({ status });
};

export const deleteTask = async (taskId: string) => {
  await firestore().collection(TASKS_COLLECTION).doc(taskId).delete();
};
