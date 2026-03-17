import React, { useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import LoginScreen from './components/LoginScreen';
import Layout from './components/Layout';
import ProfileSetupModal from './components/ProfileSetupModal';
import { useQueryClient } from '@tanstack/react-query';

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const queryClient = useQueryClient();

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerUserProfile();

  // Clear query cache on logout
  useEffect(() => {
    if (!isAuthenticated) {
      queryClient.clear();
    }
  }, [isAuthenticated, queryClient]);

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  // Show loading state while initializing
  if (isInitializing || profileLoading || !profileFetched) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'oklch(0.08 0.005 260)' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, oklch(0.55 0.14 65), oklch(0.25 0.06 65))',
              boxShadow: '0 0 30px oklch(0.72 0.18 65 / 0.4)',
              animation: 'orb-pulse 2s ease-in-out infinite',
            }}
          >
            <span className="text-2xl font-orbitron font-bold" style={{ color: 'oklch(0.08 0.005 260)' }}>F</span>
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  background: 'oklch(0.72 0.18 65)',
                  animation: 'thinking-dot 1.4s ease-in-out infinite',
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
          <p className="text-xs font-mono-tech" style={{ color: 'oklch(0.45 0.02 80)' }}>
            INITIALIZING FRIDAY...
          </p>
        </div>
      </div>
    );
  }

  // Show profile setup if no profile exists
  const showProfileSetup = isAuthenticated && !profileLoading && profileFetched && userProfile === null;

  if (showProfileSetup) {
    return (
      <>
        <Layout userName="" />
        <ProfileSetupModal
          onComplete={() => {
            queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
          }}
        />
      </>
    );
  }

  return <Layout userName={userProfile?.name || ''} />;
}
