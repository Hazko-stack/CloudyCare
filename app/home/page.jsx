"use client";
import React, { Suspense } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Bmkg from "@/components/Bmkg";
import { FloatingDockDemo } from '@/components/Dock';
import BMKGFooter from '@/components/BMKGFooter';

// Separate component untuk handle search params
function AlertMessages() {
  const searchParams = useSearchParams();
  const successMessage = searchParams.get('success');
  const errorMessage = searchParams.get('error');

  return (
    <>
      {/* Success Message */}
      {successMessage && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <div className="p-4 bg-green-50 border border-green-400 text-green-700 rounded-lg flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <div className="p-4 bg-red-50 border border-red-400 text-red-700 rounded-lg flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">{errorMessage}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasBiodata, setHasBiodata] = useState(false);
  const [checkingBiodata, setCheckingBiodata] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    
    // Check if user is authenticated and has biodata
    const checkUserAndBiodata = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        router.push('/login');
        return;
      }
      
      setUser(user);
      setLoading(false);

      // Check if user has biodata
      const { data: biodata, error: biodataError } = await supabase
        .from('user_biodata')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!biodata || biodataError) {
        // No biodata found, redirect to biodata page
        router.push('/biodata');
        return;
      }

      // User has biodata, allow access
      setHasBiodata(true);
      setCheckingBiodata(false);
    };

    checkUserAndBiodata();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          router.push('/');
        } else if (event === 'SIGNED_IN' && session) {
          setUser(session.user);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading || checkingBiodata) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user || !hasBiodata) {
    return null;
  }

  return (
    <React.Fragment>
      <main className="relative pb-32">
        {/* User Header */}
        <div className="bg-black text-white p-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">
                {user.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium">Welcome back!</span>
              <p className="text-xs opacity-75">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Alert Messages wrapped in Suspense */}
        <Suspense fallback={<div className="h-20" />}>
          <AlertMessages />
        </Suspense>
        
        <Bmkg />
      </main>
      
      {/* Footer with margin to avoid dock collision */}
      <div className="mb-20">
        <BMKGFooter />
      </div>
      
      {/* Floating Dock - Always visible */}
      <FloatingDockDemo />
    </React.Fragment>
  );
}