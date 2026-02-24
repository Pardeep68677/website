
'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

export function initializeFirebase() {
  try {
    // Check if we have at least a placeholder-like API key to prevent SDK crash
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'undefined') {
      throw new Error("Missing Firebase API Key");
    }

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const firestore = getFirestore(app);
    const auth = getAuth(app);
    return { app, firestore, auth };
  } catch (e) {
    // Return nulls if initialization fails to prevent the app from hard crashing
    console.warn("Firebase initialization skipped or failed. Check your environment variables.", e);
    return null;
  }
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
