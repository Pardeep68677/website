
'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

export function initializeFirebase() {
  try {
    // Check if we have at least a placeholder-like API key to prevent SDK crash
    const hasValidConfig = firebaseConfig.apiKey && firebaseConfig.apiKey !== 'placeholder-api-key' && firebaseConfig.apiKey !== 'undefined';
    
    if (!hasValidConfig) {
      console.warn("Firebase configuration is missing or invalid. Using mock mode.");
      return { app: null as any, firestore: null as any, auth: null as any };
    }

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const firestore = getFirestore(app);
    const auth = getAuth(app);
    return { app, firestore, auth };
  } catch (e) {
    console.warn("Firebase initialization failed:", e);
    return { app: null as any, firestore: null as any, auth: null as any };
  }
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
