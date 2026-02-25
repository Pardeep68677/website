'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './config';

export function initializeFirebase() {
  try {
    // Robust check for valid configuration
    const isMock = !firebaseConfig.apiKey || 
                   firebaseConfig.apiKey === 'placeholder-api-key' || 
                   firebaseConfig.apiKey === 'undefined';
    
    if (isMock) {
      if (typeof window !== 'undefined') {
        console.warn("Firebase configuration is missing or invalid. Application is running in mock mode.");
      }
      return { app: null as any, firestore: null as any, auth: null as any };
    }

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const firestore = getFirestore(app);
    const auth = getAuth(app);
    return { app, firestore, auth };
  } catch (e) {
    if (typeof window !== 'undefined') {
      console.warn("Firebase initialization failed. Falling back to mock mode:", e);
    }
    return { app: null as any, firestore: null as any, auth: null as any };
  }
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
