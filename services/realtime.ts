
import { SESSIONS, USERS } from '../constants';
import { Session, User, Activity, CoverageStatus } from '../types';

type Listener = (data: any) => void;

// Mock data generators
const ACTIONS = [
  { action: 'uploaded notes for', type: 'upload' },
  { action: 'completed coverage of', type: 'complete' },
  { action: 'assigned themselves to', type: 'assignment' },
  { action: 'flagged a conflict in', type: 'alert' },
  { action: 'updated priority for', type: 'update' },
];

export class RealTimeService {
  private listeners: Record<string, Listener[]> = {};
  private timer: any = null;

  connect() {
    console.log('[RealTime] Connected');
    this.startSimulation();
  }

  disconnect() {
    if (this.timer) clearInterval(this.timer);
    console.log('[RealTime] Disconnected');
  }

  on(event: string, callback: Listener) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    };
  }

  emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }

  private startSimulation() {
    // Simulate an event every 5-15 seconds
    this.timer = setInterval(() => {
      const randomEvent = Math.random();
      
      if (randomEvent > 0.7) {
        this.simulateStatusChange();
      } else if (randomEvent > 0.4) {
        this.simulateAssignment();
      } else {
        this.simulateActivity();
      }
    }, 8000);
  }

  private getRandomUser(): User {
    return USERS[Math.floor(Math.random() * USERS.length)];
  }

  private getRandomSession(): Session {
    return SESSIONS[Math.floor(Math.random() * SESSIONS.length)];
  }

  private simulateStatusChange() {
    const session = this.getRandomSession();
    const statuses = Object.values(CoverageStatus);
    const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Emit session update
    this.emit('session_update', {
      id: session.id,
      updates: { status: newStatus }
    });

    // Also emit activity
    this.emit('activity', {
      id: Date.now().toString(),
      userId: 'system',
      userName: 'System',
      userAvatar: '',
      action: `changed status to ${newStatus}`,
      target: session.title,
      timestamp: new Date().toISOString(),
      type: 'update'
    } as Activity);
  }

  private simulateAssignment() {
    const session = this.getRandomSession();
    const user = this.getRandomUser();
    
    this.emit('session_update', {
      id: session.id,
      updates: { assignedTo: [user] } // Simplify to single assignment for demo
    });

    this.emit('activity', {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      action: 'picked up coverage for',
      target: session.title,
      timestamp: new Date().toISOString(),
      type: 'assignment'
    } as Activity);
  }

  private simulateActivity() {
    const user = this.getRandomUser();
    const session = this.getRandomSession();
    const actionTemplate = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];

    const activity: Activity = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      action: actionTemplate.action,
      target: session.title,
      timestamp: new Date().toISOString(),
      type: actionTemplate.type as any
    };

    this.emit('activity', activity);
  }
}

export const realTime = new RealTimeService();
