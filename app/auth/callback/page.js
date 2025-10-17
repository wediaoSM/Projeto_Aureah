'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error in auth callback:', error);
          router.push('/auth?error=' + encodeURIComponent(error.message));
          return;
        }

        if (data.session) {
          router.push('/dashboard');
        } else {
          router.push('/auth');
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
        router.push('/auth');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Processando autenticação...</p>
        <p className="text-gray-400 text-sm mt-2">Aguarde um momento</p>
      </div>
    </div>
  );
}