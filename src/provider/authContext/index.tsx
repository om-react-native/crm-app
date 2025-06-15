import React, { createContext, useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { replaceScreen } from '@/navigation/action';
import { AppRoutesConstants } from '@/navigation/constants';

const COLLECTION = 'superAdmin';

type AuthContextType = {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  forgotPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async authUser => {
      setUser(authUser);
      setLoading(false);
      // if (authUser) {
      //   navigation.navigate('Home'); // 👈 Navigate to Home
      // } else {
      //   navigation.navigate('Login'); // 👈 Go to login if signed out
      // }
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const currentUser = userCredential.user;

      const userDocRef = firestore()
        .collection(COLLECTION)
        .doc(currentUser.uid);
      const userDoc = await userDocRef.get();

      if (!userDoc.exists) {
        await auth().signOut();
        Alert.alert('Error', 'User data not found in Firestore.');
        throw new Error('User data not found in Firestore.');
      }

      const { verified } = userDoc.data() as { verified: boolean };

      if (!currentUser.emailVerified) {
        // Resend email verification
        await currentUser.sendEmailVerification();

        // Sign out the user
        await auth().signOut();

        // Show alert
        Alert.alert(
          'Email Not Verified',
          'A verification email has been sent to your inbox. Please verify your email before logging in.',
        );

        throw new Error('Email not verified.');
      }

      // ✅ All checks passed, set user
      setUser(currentUser);

      // 🔄 Optionally update verified flag in Firestore
      if (!verified) {
        await userDocRef.update({ verified: true });
      }
    } catch (error) {
      // Optional: show alert here too
      // Alert.alert('Login Error', error.message);
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const { uid } = userCredential.user;

      // Send email verification
      await userCredential.user.sendEmailVerification();

      // Add user info to Firestore
      await firestore().collection(COLLECTION).doc(uid).set({
        email,
        createdAt: firestore.FieldValue.serverTimestamp(),
        verified: false,
      });

      setUser(userCredential.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      setUser(null);
      replaceScreen(AppRoutesConstants.BOTTOM_TAB_BAR_STACK);
    } catch (error) {
      throw error;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      // 🔍 Check Firestore COLLECTION collection for existence of the email
      const querySnapshot = await firestore()
        .collection(COLLECTION)
        .where('email', '==', email.toLowerCase())
        .get();

      if (querySnapshot.empty) {
        Alert.alert(
          'Email Not Found',
          'No account exists with this email address.',
        );
        return;
      }

      // ✅ Send reset email
      await auth().sendPasswordResetEmail(email);
      Alert.alert(
        'Reset Email Sent',
        'A password reset link has been sent to your email address.',
      );
    } catch (error: any) {
      Alert.alert('Reset Failed', error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, loading, forgotPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
