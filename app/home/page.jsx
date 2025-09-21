"use client";
import React from 'react';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Bmkg from "@/components/Bmkg";
import { FloatingDockDemo } from '@/components/Dock';

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    
    // Check if user is authenticated
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        // User not authenticated, redirect to login
        router.push('/login');
        return;
      }
      
      setUser(user);
      setLoading(false);
    };

    getUser();

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; 
  }

  return (
    <React.Fragment>
      <main className="relative pb-20">
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
        
        <Bmkg />
      </main>
      
      {/* Floating Dock - Always visible */}
      <FloatingDockDemo />
    </React.Fragment>
  );
}