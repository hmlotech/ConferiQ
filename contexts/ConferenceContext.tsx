
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Session, User, Activity } from '../types';
import { SESSIONS, USERS } from '../constants';
import { realTime } from '../services/realtime';

interface ConferenceContextType {
  sessions: Session[];
  users: User[];
  activityFeed: Activity[];
  recentUpdates: string[]; // For showing toasts
  updateSession: (id: string, updates: Partial<Session>) => void;
}

const ConferenceContext = createContext<ConferenceContextType | undefined>(undefined);

export const ConferenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<Session[]>(SESSIONS);
  const [activityFeed, setActivityFeed] = useState<Activity[]>([
    {
        id: 'init-1',
        userId: USERS[1].id,
        userName: USERS[1].name,
        userAvatar: USERS[1].avatar,
        action: 'uploaded PDF transcript for',
        target: 'Theranostics Keynote',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        type: 'upload'
    },
    {
        id: 'init-2',
        userId: USERS[0].id,
        userName: USERS[0].name,
        userAvatar: USERS[0].avatar,
        action: 'flagged critical insight in',
        target: 'Lead-212 Safety Profile',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        type: 'alert'
    }
  ]);
  const [recentUpdates, setRecentUpdates] = useState<string[]>([]);

  useEffect(() => {
    realTime.connect();

    const unsubSession = realTime.on('session_update', (data: { id: string, updates: Partial<Session> }) => {
      setSessions(prev => prev.map(s => s.id === data.id ? { ...s, ...data.updates } : s));
    });

    const unsubActivity = realTime.on('activity', (activity: Activity) => {
      setActivityFeed(prev => [activity, ...prev].slice(0, 50));
      // Trigger a toast notification
      const message = `${activity.userName} ${activity.action} ${activity.target.substring(0, 20)}...`;
      setRecentUpdates(prev => [...prev, message]);
      // Auto dismiss toast after 3s
      setTimeout(() => {
        setRecentUpdates(prev => prev.filter(m => m !== message));
      }, 4000);
    });

    return () => {
      unsubSession();
      unsubActivity();
      realTime.disconnect();
    };
  }, []);

  const updateSession = (id: string, updates: Partial<Session>) => {
    // Optimistic update
    setSessions(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    // Push to "server"
    realTime.emit('client_update', { id, updates });
  };

  const value = useMemo(() => ({
    sessions,
    users: USERS,
    activityFeed,
    recentUpdates,
    updateSession
  }), [sessions, activityFeed, recentUpdates]);

  return (
    <ConferenceContext.Provider value={value}>
      {children}
    </ConferenceContext.Provider>
  );
};

export const useConference = () => {
  const context = useContext(ConferenceContext);
  if (context === undefined) {
    throw new Error('useConference must be used within a ConferenceProvider');
  }
  return context;
};
