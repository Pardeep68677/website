
'use client';

import React, { useEffect, useState } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const [firebase, setFirebase] = useState<ReturnType<typeof initializeFirebase> | null>(null);

  useEffect(() => {
    const instances = initializeFirebase();
    setFirebase(instances);
  }, []);

  // Ensure we always render children even if Firebase isn't ready
  // We pass nulls if firebase instance couldn't be created
  return (
    <FirebaseProvider
      app={firebase?.app || null as any}
      firestore={firebase?.firestore || null as any}
      auth={firebase?.auth || null as any}
    >
      <FirebaseErrorListener />
      {children}
    </FirebaseProvider>
  );
}
