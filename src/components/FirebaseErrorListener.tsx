
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handleError = (error: any) => {
      // In development, the Next.js overlay will catch uncaught errors.
      // In production or for specific UI feedback, we use a toast.
      toast({
        variant: 'destructive',
        title: 'Firestore Permission Denied',
        description: 'You do not have permission to perform this action.',
      });
      
      // Re-throw to trigger the development overlay for debugging Security Rules
      if (process.env.NODE_ENV === 'development') {
        throw error;
      }
    };

    errorEmitter.on('permission-error', handleError);
    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, [toast]);

  return null;
}
