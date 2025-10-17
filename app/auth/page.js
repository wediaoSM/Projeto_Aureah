'use client';

import { Suspense } from 'react';
import AuthPageContent from './AuthPageContent';

export default function AuthPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    }>
      <AuthPageContent />
    </Suspense>
  );
}
