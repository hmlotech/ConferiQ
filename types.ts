
export enum SessionType {
  ORAL = 'Oral',
  POSTER = 'Poster',
  KEYNOTE = 'Keynote',
  SYMPOSIUM = 'Symposium',
  BOOTH = 'Booth'
}

export enum CoverageStatus {
  UNASSIGNED = 'Unassigned',
  ASSIGNED = 'Assigned',
  IN_PROGRESS = 'In Progress',
  COMPLETE = 'Complete',
  MISSED = 'Missed'
}

export enum Priority {
  CRITICAL = 'Critical',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'Admin' | 'Analyst' | 'Lead';
}

export interface SessionFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
}

export interface Session {
  id: string;
  title: string;
  abstractId: string;
  date: string; // ISO format: YYYY-MM-DD
  startTime: string;
  endTime: string;
  location: string;
  track: string;
  type: SessionType;
  priority: Priority;
  status: CoverageStatus;
  assignedTo: User[];
  matchScore?: number; // AI match score
  documents?: SessionFile[];
}

export interface DateTab {
  label: string;
  date: string;
  isActive: boolean;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  action: string;
  target: string; // The session title or object name
  timestamp: string; // ISO string
  type: 'update' | 'assignment' | 'alert' | 'upload' | 'complete';
}

export interface Conference {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  attendees: string;
  competitors: number;
  priority: 'high' | 'medium' | 'low';
  status: 'upcoming' | 'completed' | 'ongoing';
  therapeuticAreas: string[];
}
