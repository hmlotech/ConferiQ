import { Session, SessionType, CoverageStatus, Priority, User, DateTab } from './types';

export const USERS: User[] = [
  { id: '1', name: 'Mark Porter', role: 'Lead', avatar: 'https://picsum.photos/seed/mark/32/32' },
  { id: '2', name: 'Emma Liu', role: 'Analyst', avatar: 'https://picsum.photos/seed/emma/32/32' },
  { id: '3', name: 'Jacob Schmidt', role: 'Analyst', avatar: 'https://picsum.photos/seed/jacob/32/32' },
  { id: '4', name: 'Sarah Chen', role: 'Analyst', avatar: 'https://picsum.photos/seed/sarah/32/32' },
];

export const DATE_TABS: DateTab[] = [
  { label: 'Apr 6', date: '2026-04-06', isActive: false },
  { label: 'Apr 7', date: '2026-04-07', isActive: true }, // Active day
  { label: 'Apr 8', date: '2026-04-08', isActive: false },
  { label: 'Apr 9', date: '2026-04-09', isActive: false },
  { label: 'Apr 10', date: '2026-04-10', isActive: false },
];

export const SESSIONS: Session[] = [
  // 8:00 AM Slot
  {
    id: 's1',
    title: 'Novel Actinium-225 Therapies in Solid Tumors',
    abstractId: 'Theranostics', // Using as Track/Category for display
    startTime: '8:00 am',
    endTime: '9:30 am',
    location: 'Room IE75',
    track: 'Radiopharmaceuticals',
    type: SessionType.SYMPOSIUM,
    priority: Priority.CRITICAL,
    status: CoverageStatus.ASSIGNED,
    assignedTo: [USERS[0], USERS[1]],
    matchScore: 98,
  },
  {
    id: 's2',
    title: 'Erdite Responders in Monotherapy Contexts',
    abstractId: 'Radiopharmaceuticals',
    startTime: '8:00 am',
    endTime: '9:30 am',
    location: 'Room 575',
    track: 'Clinical Trials',
    type: SessionType.ORAL,
    priority: Priority.MEDIUM,
    status: CoverageStatus.UNASSIGNED,
    assignedTo: [],
    matchScore: 65,
  },
  // 9:30 AM Slot
  {
    id: 's3',
    title: 'Lun Patel: Advancements in Targeted Alpha Therapy',
    abstractId: 'Room E75',
    startTime: '9:30 am',
    endTime: '10:10 am',
    location: 'Room E75',
    track: 'Theranostics',
    type: SessionType.KEYNOTE,
    priority: Priority.HIGH,
    status: CoverageStatus.COMPLETE,
    assignedTo: [USERS[2]],
    matchScore: 92,
  },
  {
    id: 's4',
    title: 'Eroplucthe on Czpatacies-Masithacea: Phase 2 Results',
    abstractId: 'Actinium',
    startTime: '9:30 am',
    endTime: '10:10 am',
    location: 'Room 575',
    track: 'Radiopharmaceuticals',
    type: SessionType.ORAL,
    priority: Priority.HIGH,
    status: CoverageStatus.ASSIGNED,
    assignedTo: [USERS[0], USERS[1], USERS[3]],
    matchScore: 88,
  },
  // 10:10 AM Slot
  {
    id: 's5',
    title: 'Radotharma: Global Market Access Strategies',
    abstractId: 'Room E75',
    startTime: '10:10 am',
    endTime: '11:00 am',
    location: 'Room E75',
    track: 'Market Access',
    type: SessionType.BOOTH,
    priority: Priority.MEDIUM,
    status: CoverageStatus.IN_PROGRESS,
    assignedTo: [USERS[1]],
    matchScore: 70,
  },
  {
    id: 's6',
    title: 'Gediathingal with-Immersion: A New Standard?',
    abstractId: 'Charge',
    startTime: '10:10 am',
    endTime: '11:00 am',
    location: 'Room 5675',
    track: 'Immunology',
    type: SessionType.ORAL,
    priority: Priority.LOW,
    status: CoverageStatus.ASSIGNED,
    assignedTo: [USERS[3]],
    matchScore: 45,
  },
   // 10:20 AM Slot (Overlapping)
  {
    id: 's7',
    title: 'Lead-212 Pipeline Updates and Safety Profiles',
    abstractId: 'Lead-212',
    startTime: '10:20 am',
    endTime: '11:00 am',
    location: 'Room Bellamy',
    track: 'Radiopharmaceuticals',
    type: SessionType.SYMPOSIUM,
    priority: Priority.CRITICAL,
    status: CoverageStatus.ASSIGNED,
    assignedTo: [USERS[0], USERS[2]],
    matchScore: 95,
  },
  // 11:00 AM Slot
  {
    id: 's8',
    title: 'Memcapate: Mechanisms of Resistance',
    abstractId: 'Room E75',
    startTime: '11:00 am',
    endTime: '12:00 pm',
    location: 'Room E75',
    track: 'Preclinical',
    type: SessionType.ORAL,
    priority: Priority.MEDIUM,
    status: CoverageStatus.COMPLETE,
    assignedTo: [USERS[1]],
    matchScore: 60,
  },
  {
    id: 's9',
    title: 'Summor therapy, Low Thesis and Patient Outcomes',
    abstractId: 'Theranostics',
    startTime: '11:00 am',
    endTime: '12:00 pm',
    location: 'Susan Bellamy',
    track: 'Clinical Practice',
    type: SessionType.POSTER,
    priority: Priority.LOW,
    status: CoverageStatus.UNASSIGNED,
    assignedTo: [],
    matchScore: 30,
  }
];

export const AI_SUGGESTIONS = [
  {
    id: 'ai1',
    title: 'Novel Actinium-225 Therapies',
    reason: 'Matches your "Radio-ligand" interest',
    score: 98,
    type: 'High Relevance'
  },
  {
    id: 'ai2',
    title: 'Lu-177 Advancements in Bone Mets',
    reason: 'Competitor data read-out anticipated',
    score: 94,
    type: 'Critical Insight'
  },
  {
    id: 'ai3',
    title: 'Lead-212 Pipeline Updates',
    reason: 'Key strategic area for 2026',
    score: 89,
    type: 'Strategic'
  }
];