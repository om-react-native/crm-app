// userService.ts
import firestore from '@react-native-firebase/firestore';

import auth, { EmailAuthProvider, reauthenticateWithCredential } from '@react-native-firebase/auth';
import { showToast } from './toastService';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Administrator' | 'Manager' | 'User';
  status: 'Active' | 'Pending' | 'Inactive';
  password: string;
}

const USERS_COLLECTION = 'users';


export const getAllUsers = async (): Promise<User[]> => {
    try {
      const snapshot = await firestore().collection('users').get();
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name ?? '',
          email: data.email ?? '',
          role: data.role ?? '',
          status: data.status ?? '',
          password: data.password ?? '', // if you're storing password (hashed ideally)
        };
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  export const addUser = async (user: Omit<User, 'id'>): Promise<void> => {
    try {
      // Step 1: Check for duplicate email in Firestore
      const existingUserSnapshot = await firestore()
        .collection(USERS_COLLECTION)
        .where('email', '==', user.email)
        .get();
  
      if (!existingUserSnapshot.empty) {
        showToast("A user with this email already exists",'error')
      }
  
      // Step 2: Create user in Firebase Auth
      const userCredential = await auth().createUserWithEmailAndPassword(
        user.email,
        user.password
      );
  
      // Step 3: Send verification email
      await userCredential.user.sendEmailVerification();

      showToast('A verification email is sent to users email','success')
  
      // Step 4: Store user info in Firestore
      const userData: User = {
        ...user,
        id: userCredential.user.uid,
      };
  
      await firestore()
        .collection(USERS_COLLECTION)
        .doc(userData.id)
        .set(userData);
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  };

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const snapshot = await firestore().collection(USERS_COLLECTION).get();
    return snapshot.docs.map(doc => doc.data() as User);
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await firestore().collection(USERS_COLLECTION).doc(userId).delete();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const updateUser = async (userId: string, updatedData: Partial<User>): Promise<void> => {
  try {
    await firestore().collection(USERS_COLLECTION).doc(userId).update(updatedData);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

/**
 * Change password for logged-in user and update it in Firestore `users` collection.
 * @param currentPassword string
 * @param newPassword string
 */
export const changePassword = async (
    user:any,
    currentPassword: string,
    newPassword: string
  ): Promise<void> => {
   
  
    if (!user || !user.email) {
      throw new Error('User not authenticated.');
    }
  
    try {
      // Step 1: Re-authenticate with current password
      console.log('user', user)
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user,credential);

  
      // Step 2: Update password in Firebase Auth
      await user.updatePassword(newPassword);
  
      // Step 3: Update password in Firestore `users` collection
      await firestore()
        .collection(USERS_COLLECTION)
        .doc(user.uid)
        .update({ password: newPassword });
  
      showToast('Password changed successfully!', 'success');
    } catch (error: any) {
      console.error('Change password error:', error);
      const errorMessage = getFriendlyFirebaseError(error);
      showToast(errorMessage, 'error');
      throw error;
    }
  };
  
  // Optional: error mapper
  const getFriendlyFirebaseError = (error: any): string => {
    switch (error.code) {
      case 'auth/wrong-password':
        return 'Current password is incorrect.';
      case 'auth/weak-password':
        return 'New password is too weak.';
      default:
        return 'Failed to change password.';
    }
  };
