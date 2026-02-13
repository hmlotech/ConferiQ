
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Session, User, Activity, Conference, SessionType, CoverageStatus, Priority } from '../types';
import { SESSIONS, USERS, CONFERENCES } from '../constants';
import { realTime } from '../services/realtime';

interface ConferenceContextType {
  sessions: Session[];
  conferences: Conference[];
  users: User[];
  activityFeed: Activity[];
  recentUpdates: string[]; // For showing toasts
  updateSession: (id: string, updates: Partial<Session>) => void;
  addConference: (url: string, extractedSessions?: Session[]) => void;
  deleteConference: (id: string) => void;
}

const ConferenceContext = createContext<ConferenceContextType | undefined>(undefined);

export const ConferenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<Session[]>(SESSIONS);
  const [conferences, setConferences] = useState<Conference[]>(CONFERENCES);
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

  const addConference = (url: string, extractedSessions?: Session[]) => {
    // Determine details from URL or first session
    const domain = url.replace('https://', '').replace('http://', '').split('/')[0];
    let name = domain.split('.')[0].toUpperCase();

    // Attempt to refine name from extracted sessions if available
    if (extractedSessions && extractedSessions.length > 0) {
      // Simple heuristic: check if title contains "Annual Meeting" or similar
      const firstTitle = extractedSessions[0].title;
      if (firstTitle.includes(':')) {
        name = firstTitle.split(':')[0].trim(); // Guess conference name from session title prefix
      }
    }

    const confId = `custom-${Date.now()}`;

    const newConf: Conference = {
      id: confId,
      title: extractedSessions && extractedSessions.length > 0 ? `${name} (Imported)` : `${name} Annual Meeting 2026`,
      startDate: extractedSessions && extractedSessions.length > 0 ? extractedSessions[0].date : 'Aug 15, 2026',
      endDate: extractedSessions && extractedSessions.length > 0 ? extractedSessions[extractedSessions.length - 1].date : 'Aug 18, 2026',
      location: extractedSessions && extractedSessions.length > 0 ? extractedSessions[0].location : 'Virtual / Online',
      attendees: 'Unknown',
      competitors: 0,
      priority: 'medium',
      status: 'upcoming',
      therapeuticAreas: ['Imported Data']
    };

    setConferences(prev => [newConf, ...prev]);

    // Use extracted sessions or generate mock ones
    let sessionsToAdd: Session[] = [];

    if (extractedSessions && extractedSessions.length > 0) {
      sessionsToAdd = extractedSessions.map(s => ({
        ...s,
        conferenceId: confId, // Bind to new conference
        id: `s-${confId}-${Math.random().toString(36).substr(2, 9)}`
      }));
    }

    setSessions(prev => [...prev, ...sessionsToAdd]);

    // Add to activity feed
    const activity: Activity = {
      id: `act-${Date.now()}`,
      userId: USERS[0].id,
      userName: USERS[0].name,
      userAvatar: USERS[0].avatar,
      action: extractedSessions ? 'imported real agenda from' : 'added new conference via URL',
      target: newConf.title,
      timestamp: new Date().toISOString(),
      type: 'update'
    };
    setActivityFeed(prev => [activity, ...prev]);
  };

  const deleteConference = (id: string) => {
    const conferenceToDelete = conferences.find(c => c.id === id);
    if (!conferenceToDelete) return;

    setConferences(prev => prev.filter(c => c.id !== id));
    setSessions(prev => prev.filter(s => s.conferenceId !== id));

    // Add to activity feed
    const activity: Activity = {
      id: `act-${Date.now()}`,
      userId: USERS[0].id,
      userName: USERS[0].name,
      userAvatar: USERS[0].avatar,
      action: 'removed conference',
      target: conferenceToDelete.title,
      timestamp: new Date().toISOString(),
      type: 'update'
    };
    setActivityFeed(prev => [activity, ...prev]);
  };

  const value = useMemo(() => ({
    sessions,
    conferences,
    users: USERS,
    activityFeed,
    recentUpdates,
    updateSession,
    addConference,
    deleteConference
  }), [sessions, conferences, activityFeed, recentUpdates]);

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
