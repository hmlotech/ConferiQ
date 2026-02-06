# ConferiQ Software Standards Document

> **Version 2.0.0** | Last Updated: February 2026
>
> This document establishes comprehensive software standards for the **ConferiQ** application — an AI-powered biopharma conference intelligence SaaS platform. All development must adhere to these standards to ensure code quality, consistency, maintainability, and a polished demo experience.

---

## Table of Contents

1. [Product Overview & Scope](#1-product-overview--scope)
2. [Tech Stack Overview](#2-tech-stack-overview)
3. [Project Structure](#3-project-structure)
4. [Architecture & Navigation](#4-architecture--navigation)
5. [Page Architecture & UX Structure](#5-page-architecture--ux-structure)
6. [TypeScript Standards](#6-typescript-standards)
7. [React Component Standards](#7-react-component-standards)
8. [State Management](#8-state-management)
9. [Data Management & Persistence](#9-data-management--persistence)
10. [Conference Data Extraction](#10-conference-data-extraction)
11. [AI Integration Standards](#11-ai-integration-standards)
12. [UI/UX Standards](#12-uiux-standards)
13. [Security Standards](#13-security-standards)
14. [Error Handling](#14-error-handling)
15. [Performance Standards](#15-performance-standards)
16. [Testing Standards](#16-testing-standards)
17. [Code Quality](#17-code-quality)
18. [Version Control](#18-version-control)
19. [Deployment Standards](#19-deployment-standards)

---

## 1. Product Overview & Scope

### 1.1 What Is ConferiQ

ConferiQ is an AI-powered conference intelligence platform for biopharma competitive intelligence (CI) teams. It transforms how teams plan, capture, and synthesize insights from medical/scientific conferences (ASCO, ESMO, JPM, AACR, ADA, etc.).

### 1.2 Core Problem Statement

```
CURRENT STATE                                CONFERIQ SOLUTION
─────────────────────────────────────────    ─────────────────────────────────────────
Manual program parsing (hours of work)   →   Auto-extract agenda from conference URL
Scattered notes across email/docs/chat   →   Unified capture per session per conference
No visibility into team progress         →   Real-time coverage dashboard
Lost institutional knowledge             →   Searchable conference archive
Post-conference reports take weeks       →   AI reports generated same-day
Siloed insights across conferences       →   Cross-conference AI connections
```

### 1.3 User Personas

| Persona | Role | Primary Use |
|---------|------|-------------|
| **CI Lead** | Team Manager | Plan coverage, assign analysts, track progress, review reports |
| **Field Analyst** | On-site Coverage | Capture sessions, add notes, tag completion during conference |
| **Remote Analyst** | Off-site Support | Review data, work on planner extraction, support field team |
| **Business User** | Consumer | Read reports, track topics of interest |

### 1.4 Development Phase: Demo/Prototype

**Current Phase**: Quick working demo that demonstrates all core functions.

**Key Constraints for Demo Phase**:
- **No backend/database** — all data persisted in browser `localStorage`
- **No authentication** — single-user experience (multi-user simulated via mock data)
- **No file system storage** — everything in localStorage + in-memory state
- **AI integration** — Google Gemini API (requires API key in environment)
- **Conference data extraction** — client-side URL fetching + AI parsing (via proxy or CORS-enabled endpoints)
- **Real-time simulation** — mock real-time updates via intervals (no WebSocket)

### 1.5 Feature Scope for Demo

| Feature | Priority | Status |
|---------|----------|--------|
| Multi-conference management (Home + Sidebar) | P0 | Required |
| Conference creation from URL extraction | P0 | Required |
| Conference agenda/planner data table | P0 | Required |
| Session assignment & prioritization | P0 | Required |
| Live coverage tracking dashboard | P0 | Required |
| Individual conference dashboard | P0 | Required |
| AI-powered daily briefs & summaries | P1 | Required |
| Notes capture per session | P1 | Required |
| Reports generation | P1 | Required |
| Team management (mock) | P2 | Nice-to-have |
| Cross-conference insights | P2 | Nice-to-have |
| Settings & preferences | P2 | Nice-to-have |

---

## 2. Tech Stack Overview

### 2.1 Core Technologies

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| Frontend Framework | React | ^19.2.4 | UI rendering (functional components + hooks) |
| Language | TypeScript | ~5.8.2 | Type safety across entire codebase |
| Build Tool | Vite | ^6.2.0 | Fast development server + production builds |
| CSS Framework | Tailwind CSS | v3.x (CDN) | Utility-first styling |
| Icons | Lucide React | ^0.563.0 | Consistent icon system |
| AI Integration | @google/genai | ^1.39.0 | Gemini AI for summaries, extraction, insights |
| Utility | clsx + tailwind-merge | ^2.1.1 / ^3.4.0 | Conditional class composition |

### 2.2 Browser APIs Used

| API | Purpose | Fallback |
|-----|---------|----------|
| **localStorage** | Primary data persistence (conferences, sessions, settings, coverage) | In-memory state (data lost on refresh) |
| **sessionStorage** | Temporary UI state (active tab, scroll positions) | Component state |
| **Fetch API** | Conference URL extraction, AI API calls | Error message + manual entry |
| **Clipboard API** | Copy report content, share links | Fallback textarea copy |

### 2.3 Explicitly NOT Used (Demo Phase)

| Technology | Reason |
|------------|--------|
| Next.js | Unnecessary complexity for demo; Vite + React is faster to iterate |
| Supabase / PostgreSQL | No backend needed; localStorage is sufficient for demo |
| React Router | State-based navigation is simpler for demo; no URL routing needed |
| Zustand / Redux | React Context is sufficient for demo-scale state |
| Shadcn/ui | Tailwind CDN approach means no shadcn build; custom UI components instead |
| File System Access API | Not needed; localStorage replaces file-based persistence |

### 2.4 Future Tech (Post-Demo)

These technologies are planned for production but **NOT for the demo phase**:

- Next.js 14 (App Router) for SSR + routing
- Supabase (PostgreSQL + Realtime + Auth + Storage)
- Zustand (global state) + TanStack Query (server state)
- Shadcn/ui component library
- Puppeteer/Playwright for server-side URL scraping
- WebSocket for true real-time collaboration

---

## 3. Project Structure

### 3.1 Root Directory Layout

```
ConferiQ/
├── components/                    # All React components
│   ├── ui/                        # Reusable UI primitives
│   │   └── UIComponents.tsx       # Button, Badge, Avatar, Dialog, Icons, cn()
│   ├── layout/                    # Layout components
│   │   ├── Sidebar.tsx            # Main navigation sidebar
│   │   └── Header.tsx             # Top bar (search, notifications, user)
│   ├── home/                      # Home/landing page components
│   │   ├── HomePage.tsx           # Multi-conference overview
│   │   └── ConferenceCard.tsx     # Conference summary card
│   ├── conference/                # Individual conference components
│   │   ├── ConferenceDashboard.tsx # Per-conference overview
│   │   └── ConferenceHeader.tsx   # Conference title + status bar
│   ├── planner/                   # Planner & extraction components
│   │   ├── PlannerView.tsx        # Main planner page (table + timeline)
│   │   ├── ExtractionWizard.tsx   # URL extraction multi-step flow
│   │   ├── SessionTable.tsx       # Data table of extracted sessions
│   │   ├── SessionCard.tsx        # Individual session card
│   │   └── FilterPanel.tsx        # Filters for planner view
│   ├── coverage/                  # Live coverage components
│   │   ├── LiveCoverageView.tsx   # Live tracking dashboard
│   │   ├── SessionCapture.tsx     # Notes capture per session
│   │   └── ProgressTracker.tsx    # Coverage progress indicators
│   ├── reports/                   # Reports components
│   │   ├── ReportsView.tsx        # Reports hub
│   │   └── DailyBrief.tsx         # AI-generated daily brief
│   ├── team/                      # Team components
│   │   └── TeamView.tsx           # Team management
│   ├── settings/                  # Settings components
│   │   └── SettingsView.tsx       # Settings page
│   ├── ai/                        # AI-related components
│   │   ├── AIPanel.tsx            # AI assistant sidebar
│   │   └── AISummaryCard.tsx      # AI-generated summary display
│   └── shared/                    # Cross-cutting shared components
│       ├── EmptyState.tsx         # Empty state illustrations
│       ├── LoadingState.tsx       # Skeleton/spinner loading
│       ├── StatusBadge.tsx        # Coverage status badges
│       └── PriorityBadge.tsx      # Priority level badges
├── contexts/                      # React Context providers
│   ├── AppContext.tsx             # Global app state (active conference, view)
│   └── ConferenceContext.tsx      # Conference data state (sessions, users, activity)
├── services/                      # Business logic & API services
│   ├── ai.ts                     # Google Gemini AI integration
│   ├── extraction.ts             # Conference URL data extraction service
│   ├── storage.ts                # localStorage persistence service
│   └── realtime.ts               # Mock real-time event simulation
├── hooks/                         # Custom React hooks
│   ├── useConference.ts          # Conference data access hook
│   ├── useStorage.ts             # localStorage read/write hook
│   └── useExtraction.ts          # URL extraction workflow hook
├── utils/                         # Pure utility functions
│   ├── dateUtils.ts              # Date formatting & manipulation
│   ├── sessionUtils.ts           # Session filtering, sorting, grouping
│   └── validators.ts             # Input validation utilities
├── Standards/                     # Documentation & standards
│   ├── PRD_Brainstorm.md         # Product requirements brainstorm
│   ├── SOFTWARE_STANDARDS.md     # This document
│   └── UI_UX_STANDARDS.md        # Design system guidelines
├── types.ts                       # Global TypeScript type definitions
├── constants.ts                   # Static/mock data & configuration
├── App.tsx                        # Root application component
├── index.tsx                      # Application entry point
├── index.html                     # HTML entry point (Tailwind CDN)
├── index.css                      # Base CSS (if needed beyond Tailwind)
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite build configuration
├── .gitignore                     # Git ignore rules
└── README.md                      # Project readme
```

### 3.2 Directory Naming Conventions

| Directory | Naming | Contents |
|-----------|--------|----------|
| `components/ui/` | PascalCase files | Reusable UI primitives (Button, Badge, Dialog, etc.) |
| `components/layout/` | PascalCase files | App-level layout (Sidebar, Header) |
| `components/home/` | PascalCase files | Home page / multi-conference view |
| `components/conference/` | PascalCase files | Individual conference components |
| `components/planner/` | PascalCase files | Planner & extraction components |
| `components/coverage/` | PascalCase files | Live coverage components |
| `components/reports/` | PascalCase files | Report components |
| `components/team/` | PascalCase files | Team management components |
| `components/settings/` | PascalCase files | Settings components |
| `components/ai/` | PascalCase files | AI feature components |
| `components/shared/` | PascalCase files | Shared cross-cutting components |
| `contexts/` | PascalCase files | React Context providers |
| `services/` | camelCase files | Business logic services |
| `hooks/` | camelCase with `use` prefix | Custom React hooks |
| `utils/` | camelCase files | Pure utility functions |

### 3.3 File Naming Conventions

| File Type | Convention | Example |
|-----------|------------|---------|
| Components | PascalCase `.tsx` | `ConferenceDashboard.tsx` |
| Page-level Components | PascalCase + `View` or `Page` suffix | `PlannerView.tsx`, `HomePage.tsx` |
| Contexts | PascalCase + `Context` suffix | `ConferenceContext.tsx` |
| Services | camelCase `.ts` | `extraction.ts`, `storage.ts` |
| Hooks | camelCase + `use` prefix `.ts` | `useConference.ts` |
| Utilities | camelCase `.ts` | `dateUtils.ts` |
| Types | camelCase `.ts` | `types.ts` |
| Tests | Same name + `.test.ts` / `.test.tsx` | `extraction.test.ts` |

---

## 4. Architecture & Navigation

### 4.1 Application Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         ConferiQ Architecture                            │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────┐    ┌──────────────────────────────────────────────┐   │
│  │   Sidebar     │    │              Main Content Area               │   │
│  │              │    │                                              │   │
│  │  Home        │    │  ┌────────────────────────────────────────┐  │   │
│  │  ────────    │    │  │  Header (Conference Name + Controls)   │  │   │
│  │  Conference1 │    │  ├────────────────────────────────────────┤  │   │
│  │  Conference2 │    │  │                                        │  │   │
│  │  Conference3 │    │  │        Active View Content             │  │   │
│  │  + Add New   │    │  │   (Dashboard/Planner/Coverage/etc.)    │  │   │
│  │              │    │  │                                        │  │   │
│  │  ────────    │    │  │                                        │  │   │
│  │  Settings    │    │  └────────────────────────────────────────┘  │   │
│  └──────────────┘    └──────────────────────────────────────────────┘   │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│  State Layer                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐  │
│  │ AppContext   │  │ Conference  │  │ localStorage │  │  AI Service  │  │
│  │ (navigation,│  │ Context     │  │ (persistence)│  │  (Gemini)    │  │
│  │  active conf)│  │ (sessions,  │  │              │  │              │  │
│  │             │  │  users, etc)│  │              │  │              │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └──────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Navigation Model

ConferiQ uses **state-based navigation** (no URL routing for demo).

#### Navigation Hierarchy

```
App (root)
├── activeConferenceId: string | null     ← Which conference is selected
├── currentView: View                     ← Which page is displayed
└── Sidebar reflects both states
```

#### View Types

```typescript
// Global views (no conference context needed)
type GlobalView = 'home' | 'settings';

// Conference-scoped views (require activeConferenceId)
type ConferenceView = 'dashboard' | 'planner' | 'coverage' | 'reports' | 'team';

// Combined
type View = GlobalView | ConferenceView;
```

#### Navigation Rules

1. **Home View**: Shown when no conference is selected or user clicks "Home"
2. **Conference Views**: Only accessible after selecting a conference from Home or Sidebar
3. **Sidebar State**: Shows list of conferences; clicking one sets `activeConferenceId` and navigates to `dashboard`
4. **Default View**: When a conference is selected, default to `dashboard`; remember last view per conference
5. **Settings**: Always accessible regardless of conference selection
6. **View Memory**: When switching conferences, remember the last view the user was on for each conference (store in `sessionStorage`)

#### Navigation State Shape

```typescript
interface NavigationState {
  activeConferenceId: string | null;
  currentView: View;
  lastViewPerConference: Record<string, ConferenceView>; // conferenceId -> last view
}
```

### 4.3 URL Structure (Future Implementation)

When proper routing is added post-demo, follow this URL convention:

```
/                                          → Home (multi-conference)
/conference/new                            → Create new conference (extraction wizard)
/conference/:conferenceId                  → Conference Dashboard
/conference/:conferenceId/planner          → Planner / Extraction Data
/conference/:conferenceId/coverage         → Live Coverage
/conference/:conferenceId/reports          → Reports Hub
/conference/:conferenceId/team             → Team Management
/settings                                  → Settings
```

---

## 5. Page Architecture & UX Structure

### 5.1 Page Map

```
ConferiQ
│
├── 🏠 HOME PAGE (Multi-Conference Overview)
│   ├── Quick Stats (total conferences, active, upcoming)
│   ├── Conference Cards (one per conference, with progress)
│   ├── [+ Create New Conference] button
│   └── Recent Activity across all conferences
│
├── 📋 SIDEBAR (Persistent Navigation)
│   ├── Home link
│   ├── Conference List (clickable, with status indicators)
│   │   ├── Conference 1 (active badge)
│   │   ├── Conference 2 (planning badge)
│   │   └── Conference 3 (completed badge)
│   ├── [+ Add Conference] action
│   └── Settings link
│
├── 📊 INDIVIDUAL CONFERENCE DASHBOARD
│   ├── Conference Header (name, dates, location, status)
│   ├── Sub-navigation tabs: Dashboard | Planner | Coverage | Reports | Team
│   ├── KPI Cards (total sessions, assigned, covered, missed)
│   ├── Coverage Progress (donut/bar chart)
│   ├── Today's Schedule Timeline
│   └── Recent Activity Feed (this conference)
│
├── 📋 PLANNER / EXTRACTION DATA PAGE
│   ├── Extraction Wizard (for new conferences)
│   │   ├── Step 1: Paste conference agenda URL
│   │   ├── Step 2: AI extracts sessions (handles multi-date, multi-session)
│   │   ├── Step 3: Review & edit extracted data
│   │   └── Step 4: Confirm & save to conference
│   ├── Planner Table View
│   │   ├── All sessions in sortable/filterable data table
│   │   ├── Columns: Date, Time, Title, Track, Type, Priority, Status, Assigned To
│   │   ├── Inline editing for priority, status, assignment
│   │   ├── Bulk actions (assign, set priority, delete)
│   │   └── Filter panel (by date, track, type, priority, status, assignee)
│   ├── Timeline View (day-by-day visual schedule)
│   └── Date tabs for multi-day navigation
│
├── 🔴 LIVE COVERAGE PAGE
│   ├── LIVE indicator badge
│   ├── Day selector tabs
│   ├── Coverage KPI cards (complete, in-progress, partial, missed)
│   ├── Overall progress bar
│   ├── Team Activity Feed (real-time)
│   │   ├── Per-analyst status (active/away)
│   │   ├── Current session being covered
│   │   └── Recent completions
│   ├── Session Capture interface
│   │   ├── Session info header
│   │   ├── Status toggle (not started / in progress / complete / partial)
│   │   ├── Notes editor (rich text or textarea)
│   │   ├── Key takeaways list
│   │   └── Save/Submit controls
│   └── Upcoming sessions timeline (next 2 hours)
│
├── 📊 REPORTS HUB
│   ├── Daily Briefs (AI-generated per day)
│   ├── Session Summaries
│   ├── Full Conference Report builder
│   └── Export options (copy, download)
│
├── 👥 TEAM MANAGEMENT
│   ├── Team member list with roles
│   ├── Assignment counts per member
│   └── Workload visualization
│
└── ⚙️ SETTINGS
    ├── General (app preferences)
    ├── AI Configuration (API key)
    └── About / Help
```

### 5.2 Page Component Responsibility Matrix

| Page | Primary Data | Key Actions | Components Used |
|------|-------------|-------------|-----------------|
| **Home** | All conferences | Create conference, select conference | ConferenceCard, QuickStats |
| **Conference Dashboard** | Active conference + sessions | View stats, navigate to sub-pages | KPICards, ProgressChart, Timeline |
| **Planner** | Sessions for active conference | Extract from URL, edit sessions, assign, filter | ExtractionWizard, SessionTable, FilterPanel |
| **Live Coverage** | Sessions + coverage data | Update status, capture notes, view team progress | SessionCapture, ProgressTracker, TeamFeed |
| **Reports** | AI summaries + session data | Generate briefs, view reports, export | DailyBrief, ReportBuilder |
| **Team** | Users + assignments | View workload, manage assignments | TeamMemberCard, WorkloadChart |
| **Settings** | App settings | Update API key, preferences | SettingsForm |

### 5.3 Sidebar Specification

The sidebar serves two critical functions: **global navigation** and **conference switching**.

```
┌──────────────────┐
│     ConferiQ     │  ← Logo / brand
│     [C] logo     │
├──────────────────┤
│  🏠 Home         │  ← Always visible, navigates to Home page
├──────────────────┤
│  CONFERENCES     │  ← Section header
│  ● AACR 2026     │  ← Active conference (highlighted)
│  ○ ASCO 2026     │  ← Another conference (not selected)
│  ○ ESMO 2026     │  ← Another conference
│  [+ Add New]     │  ← Opens creation/extraction wizard
├──────────────────┤
│  ─────────────── │
│  ⚙️ Settings     │  ← Always visible
├──────────────────┤
│  🔔 Notifications│  ← Bell icon with count
│  👤 User Avatar  │  ← Profile picture + status
└──────────────────┘
```

**Sidebar Behavior**:
- **Collapsed by default** on narrow viewports (icon-only mode, ~80px wide)
- **Expanded** on wider viewports (~260px wide) showing labels
- Clicking a conference name:
  1. Sets `activeConferenceId` to that conference
  2. Navigates to the last-visited view for that conference (default: `dashboard`)
  3. Highlights the conference in sidebar
- When a conference is active, **sub-navigation tabs** appear in the main content header (Dashboard | Planner | Coverage | Reports | Team)

---

## 6. TypeScript Standards

### 6.1 Type Definitions

#### File Organization

```typescript
// types.ts — Global types used across the application
// Additional module-specific types can be co-located in their service/component files
// Only create separate type files if a module has 50+ lines of types
```

#### Core Type Definitions

```typescript
// ═══════════════════════════════════════════════════
// ENUMS
// ═══════════════════════════════════════════════════

export enum SessionType {
  ORAL = 'Oral',
  POSTER = 'Poster',
  KEYNOTE = 'Keynote',
  SYMPOSIUM = 'Symposium',
  WORKSHOP = 'Workshop',
  PANEL = 'Panel',
  BOOTH = 'Booth',
  LATE_BREAKING = 'Late-Breaking',
  PLENARY = 'Plenary',
  OTHER = 'Other'
}

export enum CoverageStatus {
  UNASSIGNED = 'Unassigned',
  ASSIGNED = 'Assigned',
  IN_PROGRESS = 'In Progress',
  COMPLETE = 'Complete',
  PARTIAL = 'Partial',
  MISSED = 'Missed'
}

export enum Priority {
  CRITICAL = 'Critical',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export enum ConferenceStatus {
  PLANNING = 'Planning',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  ARCHIVED = 'Archived'
}

// ═══════════════════════════════════════════════════
// CORE INTERFACES
// ═══════════════════════════════════════════════════

export interface Conference {
  id: string;                        // UUID
  name: string;                      // "AACR 2026"
  fullName?: string;                 // "American Association for Cancer Research Annual Meeting 2026"
  acronym?: string;                  // "AACR"
  year?: number;                     // 2026

  // Dates
  startDate: string;                 // ISO date "2026-04-06"
  endDate: string;                   // ISO date "2026-04-10"
  timezone?: string;                 // "America/New_York"

  // Location
  location?: string;                 // "Chicago, IL"
  venue?: string;                    // "McCormick Place"

  // Source
  sourceUrl?: string;                // Original conference program URL
  sourceType: 'url' | 'manual';     // How sessions were imported

  // Classification
  therapeuticAreas?: string[];       // ["Oncology", "Hematology"]
  status: ConferenceStatus;

  // Metadata
  createdAt: string;                 // ISO timestamp
  updatedAt: string;                 // ISO timestamp
  sessionCount: number;              // Denormalized count for quick display
}

export interface Session {
  id: string;                        // UUID
  conferenceId: string;              // FK to Conference

  // Identity
  title: string;
  abstractNumber?: string;           // "Abstract #1234"

  // Schedule
  date: string;                      // ISO date "2026-04-07"
  startTime: string;                 // "8:00 am" or "08:00"
  endTime: string;                   // "9:30 am" or "09:30"

  // Classification
  type: SessionType;
  track?: string;                    // "Radiopharmaceuticals"
  subTrack?: string;                 // "Theranostics"
  location?: string;                 // "Room E75"

  // Content
  speakers?: string[];               // ["Dr. Jane Smith", "Dr. John Doe"]
  description?: string;              // Abstract or description text

  // CI-Relevant
  companiesMentioned?: string[];
  drugsMentioned?: string[];

  // Priority & Assignment
  priority: Priority;
  status: CoverageStatus;
  assignedTo: User[];                // Assigned analysts
  matchScore?: number;               // AI relevance score (0-100)

  // Coverage
  notes?: string;                    // Captured notes (rich text or plain)
  keyTakeaways?: string[];           // Bullet point takeaways
  aiSummary?: string;                // AI-generated summary

  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;                    // URL to avatar image
  role: 'Admin' | 'Lead' | 'Analyst' | 'Viewer';
  email?: string;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  action: string;                    // "submitted coverage for"
  target: string;                    // Session title or object name
  conferenceId: string;              // Which conference this activity belongs to
  timestamp: string;                 // ISO timestamp
  type: 'update' | 'assignment' | 'alert' | 'upload' | 'complete' | 'extraction';
}

export interface DateTab {
  label: string;                     // "Apr 7"
  date: string;                      // "2026-04-07"
  isActive: boolean;
}

// ═══════════════════════════════════════════════════
// EXTRACTION TYPES
// ═══════════════════════════════════════════════════

export interface ExtractionResult {
  conference: Partial<Conference>;   // Extracted conference metadata
  sessions: Partial<Session>[];      // Extracted sessions (may need user review)
  dates: string[];                   // All dates found in the program
  rawHtml?: string;                  // Original HTML for reference
  extractionMethod: 'ai' | 'manual';
  confidence: number;                // 0-100 extraction confidence
  warnings?: string[];               // Any issues during extraction
}

export interface ExtractionStep {
  step: number;
  label: string;
  status: 'pending' | 'active' | 'complete' | 'error';
}
```

#### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Interfaces | PascalCase | `Conference`, `Session`, `User` |
| Enums | PascalCase with SCREAMING_SNAKE values | `SessionType.LATE_BREAKING` |
| Type aliases | PascalCase | `View`, `ConferenceView` |
| Type parameters | Single uppercase letter | `T`, `K` |
| Props interfaces | PascalCase + `Props` suffix | `SessionCardProps` |

### 6.2 Strict Mode Requirements

```json
// tsconfig.json - Required settings
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "target": "ES2022",
    "module": "ESNext",
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### 6.3 Type Safety Rules

```typescript
// ALWAYS type function parameters and return types
function filterSessions(sessions: Session[], status: CoverageStatus): Session[] {
  return sessions.filter(s => s.status === status);
}

// ALWAYS type state
const [sessions, setSessions] = useState<Session[]>([]);
const [activeId, setActiveId] = useState<string | null>(null);

// NEVER use `any` — use `unknown` and narrow
function parseResponse(data: unknown): Conference {
  if (typeof data === 'object' && data !== null && 'name' in data) {
    return data as Conference; // Only after validation
  }
  throw new Error('Invalid conference data');
}

// USE optional chaining for nullable access
const trackName = session?.track ?? 'General';

// PREFER const assertions for literal types
const STORAGE_KEYS = {
  CONFERENCES: 'conferiq_conferences',
  SESSIONS: 'conferiq_sessions',
} as const;
```

---

## 7. React Component Standards

### 7.1 Component Template

```typescript
import React, { useState, useMemo, useCallback } from 'react';
import { cn } from '../ui/UIComponents';

// ── Props ──────────────────────────────────────────────
interface SessionCardProps {
  session: Session;
  isSelected?: boolean;
  onSelect?: (sessionId: string) => void;
  onStatusChange?: (sessionId: string, status: CoverageStatus) => void;
}

// ── Component ──────────────────────────────────────────
export const SessionCard: React.FC<SessionCardProps> = ({
  session,
  isSelected = false,
  onSelect,
  onStatusChange,
}) => {
  // 1. Local state
  const [isExpanded, setIsExpanded] = useState(false);

  // 2. Derived/memoized values
  const priorityColor = useMemo(() => {
    return getPriorityColor(session.priority);
  }, [session.priority]);

  // 3. Callbacks
  const handleClick = useCallback(() => {
    onSelect?.(session.id);
  }, [onSelect, session.id]);

  // 4. Render
  return (
    <div
      className={cn(
        "p-4 rounded-xl border transition-all duration-200",
        isSelected ? "border-indigo-500 bg-indigo-50" : "border-slate-200 bg-white",
        "hover:shadow-md cursor-pointer"
      )}
      onClick={handleClick}
    >
      {/* Component content */}
    </div>
  );
};
```

### 7.2 Component Categories & Naming

| Category | Location | Naming | Example |
|----------|----------|--------|---------|
| UI Primitives | `components/ui/` | PascalCase | `Button.tsx`, `Badge.tsx` |
| Layout | `components/layout/` | PascalCase | `Sidebar.tsx`, `Header.tsx` |
| Page Views | `components/{module}/` | PascalCase + `View` | `PlannerView.tsx` |
| Feature Components | `components/{module}/` | PascalCase | `SessionTable.tsx` |
| Shared Components | `components/shared/` | PascalCase | `EmptyState.tsx` |

### 7.3 Component Size Guidelines

| Component Type | Max Lines | Action if Exceeded |
|----------------|-----------|-------------------|
| Page View | 400 | Extract sub-sections into child components |
| Feature Component | 300 | Split into smaller composable components |
| UI Primitive | 150 | Keep simple; extract variants if complex |
| Utility Component | 100 | Should be very focused |

### 7.4 Props Patterns

```typescript
// Callback props: on + Action verb
interface Props {
  onSelect: (id: string) => void;
  onStatusChange: (id: string, status: CoverageStatus) => void;
  onClose: () => void;
}

// Internal handlers: handle + Action
const handleSelect = useCallback(() => {
  onSelect(session.id);
}, [onSelect, session.id]);

// Always provide defaults for optional boolean props
interface Props {
  isLoading?: boolean;    // default false in destructuring
  isCompact?: boolean;    // default false in destructuring
}

// Use children for composition
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
```

### 7.5 Hook Ordering Inside Components

```typescript
// Strict ordering:
// 1. Context hooks
const { activeConference } = useApp();
const { sessions, updateSession } = useConference();

// 2. State hooks
const [filter, setFilter] = useState<string>('all');

// 3. Refs
const tableRef = useRef<HTMLDivElement>(null);

// 4. Derived state / memoized values
const filteredSessions = useMemo(() => { ... }, [sessions, filter]);

// 5. Effects
useEffect(() => { ... }, [dependency]);

// 6. Callbacks
const handleFilter = useCallback(() => { ... }, [deps]);

// 7. Render
return ( ... );
```

---

## 8. State Management

### 8.1 State Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                       STATE HIERARCHY                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  AppContext (Global Application State)                         │  │
│  │  ├── activeConferenceId: string | null                        │  │
│  │  ├── currentView: View                                        │  │
│  │  ├── conferences: Conference[]  (all conferences)             │  │
│  │  ├── settings: AppSettings                                    │  │
│  │  └── notifications: Notification[]                            │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  ConferenceContext (Active Conference Data)                    │  │
│  │  ├── sessions: Session[]  (for active conference)             │  │
│  │  ├── users: User[]                                            │  │
│  │  ├── activityFeed: Activity[]                                 │  │
│  │  ├── dateTabs: DateTab[]                                      │  │
│  │  └── recentUpdates: string[]                                  │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Component Local State (useState)                             │  │
│  │  ├── UI state (expanded/collapsed, selected tab, etc.)        │  │
│  │  ├── Form state (input values, validation errors)             │  │
│  │  ├── Modal state (open/closed)                                │  │
│  │  └── Temporary state (search query, filter selections)        │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  localStorage (Persistence Layer)                             │  │
│  │  ├── conferiq_conferences → Conference[]                      │  │
│  │  ├── conferiq_sessions_{confId} → Session[]                   │  │
│  │  ├── conferiq_settings → AppSettings                          │  │
│  │  └── conferiq_users → User[]                                  │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 8.2 Context Pattern

```typescript
// contexts/AppContext.tsx
interface AppContextType {
  // Navigation
  activeConferenceId: string | null;
  currentView: View;
  setActiveConference: (id: string | null) => void;
  navigateTo: (view: View) => void;

  // Conferences (all)
  conferences: Conference[];
  addConference: (conference: Conference) => void;
  updateConference: (id: string, updates: Partial<Conference>) => void;
  deleteConference: (id: string) => void;

  // Settings
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
}

// Usage in components:
const { activeConferenceId, conferences, navigateTo } = useApp();
```

```typescript
// contexts/ConferenceContext.tsx
interface ConferenceContextType {
  // Data for the active conference
  sessions: Session[];
  users: User[];
  activityFeed: Activity[];
  dateTabs: DateTab[];
  recentUpdates: string[];

  // Actions
  updateSession: (id: string, updates: Partial<Session>) => void;
  addSessions: (sessions: Session[]) => void;
  deleteSessions: (ids: string[]) => void;
  bulkUpdateSessions: (ids: string[], updates: Partial<Session>) => void;
}

// Usage in components:
const { sessions, updateSession, addSessions } = useConference();
```

### 8.3 State Rules

| Rule | Description |
|------|-------------|
| **Single source of truth** | Each piece of data lives in exactly one place |
| **Context for shared data** | Data needed by 2+ components goes in Context |
| **Local state for UI** | UI-only state (modals, toggles, form inputs) stays in component |
| **Persist on change** | Whenever Context state changes, sync to localStorage |
| **Load on mount** | On app mount, hydrate Context from localStorage |
| **Optimistic updates** | Update UI immediately, persist async |
| **Memoize context values** | Always wrap context value in `useMemo` to prevent unnecessary re-renders |

### 8.4 State Persistence Flow

```
User Action
    │
    ▼
Update Context State (optimistic)
    │
    ▼
Re-render UI (instant)
    │
    ▼
Debounced Save to localStorage (500ms)
    │
    ▼
Confirm persistence (silent)
```

---

## 9. Data Management & Persistence

### 9.1 localStorage Schema

All data is stored in browser `localStorage` with the `conferiq_` prefix.

#### Storage Keys

```typescript
const STORAGE_KEYS = {
  // Core data
  CONFERENCES: 'conferiq_conferences',              // Conference[]
  SESSIONS_PREFIX: 'conferiq_sessions_',             // Session[] (per conference: conferiq_sessions_{confId})
  USERS: 'conferiq_users',                           // User[]
  ACTIVITIES_PREFIX: 'conferiq_activities_',          // Activity[] (per conference)

  // Settings
  SETTINGS: 'conferiq_settings',                     // AppSettings
  API_KEY: 'conferiq_api_key',                       // Encrypted API key string

  // UI State
  NAVIGATION: 'conferiq_navigation',                 // NavigationState
  LAST_VIEW: 'conferiq_last_view',                   // Record<conferenceId, View>
} as const;
```

#### Storage Utilities

```typescript
// services/storage.ts

const STORAGE_PREFIX = 'conferiq_';

/**
 * Type-safe localStorage write with error handling.
 */
export function saveToStorage<T>(key: string, data: T): boolean {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`[Storage] Failed to save "${key}":`, error);
    // Handle quota exceeded
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn('[Storage] localStorage quota exceeded. Consider cleanup.');
    }
    return false;
  }
}

/**
 * Type-safe localStorage read with fallback.
 */
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`[Storage] Failed to load "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Remove a specific key from localStorage.
 */
export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`[Storage] Failed to remove "${key}":`, error);
  }
}

/**
 * Clear all ConferiQ data from localStorage.
 */
export function clearAllData(): void {
  const keys = Object.keys(localStorage).filter(k => k.startsWith(STORAGE_PREFIX));
  keys.forEach(key => localStorage.removeItem(key));
}

/**
 * Get approximate storage usage for ConferiQ data.
 */
export function getStorageUsage(): { usedBytes: number; keys: number } {
  let totalBytes = 0;
  let keyCount = 0;
  for (const key in localStorage) {
    if (key.startsWith(STORAGE_PREFIX)) {
      totalBytes += (localStorage.getItem(key)?.length ?? 0) * 2; // UTF-16
      keyCount++;
    }
  }
  return { usedBytes: totalBytes, keys: keyCount };
}
```

### 9.2 Data Lifecycle

#### Conference Creation Flow

```
1. User provides URL or manual info
2. Extraction service parses data → ExtractionResult
3. User reviews/edits extracted sessions
4. Save Conference to localStorage (conferiq_conferences)
5. Save Sessions to localStorage (conferiq_sessions_{confId})
6. Generate DateTabs from session dates
7. Update AppContext → re-render sidebar + home page
```

#### Session Update Flow

```
1. User changes session (priority, status, assignment, notes)
2. Update ConferenceContext (optimistic)
3. Debounced save to localStorage (500ms)
4. If status changed → create Activity entry
5. If notes changed → auto-save draft
```

#### Data Deletion Flow

```
1. User deletes conference
2. Remove from conferences array in localStorage
3. Remove conferiq_sessions_{confId}
4. Remove conferiq_activities_{confId}
5. If was active conference → navigate to Home
6. Update AppContext
```

### 9.3 Data Size Limits & Considerations

| Item | Estimated Size | Notes |
|------|---------------|-------|
| Single Conference | ~500 bytes | Metadata only |
| Single Session | ~1 KB | Title, description, speakers, notes |
| 500 Sessions | ~500 KB | Typical large conference |
| Activity Log (50 items) | ~25 KB | Per conference |
| **Total per conference** | **~600 KB** | Well within localStorage limits |
| **localStorage limit** | **~5-10 MB** | Browser-dependent |
| **Practical limit** | **~8 conferences** | With 500 sessions each |

#### Quota Management

```typescript
// Check before large saves
const MAX_STORAGE_BYTES = 4 * 1024 * 1024; // 4 MB safety threshold

function canSaveData(dataSize: number): boolean {
  const current = getStorageUsage();
  return (current.usedBytes + dataSize) < MAX_STORAGE_BYTES;
}
```

### 9.4 ID Generation

```typescript
// Use crypto.randomUUID() for all IDs (available in modern browsers)
function generateId(): string {
  return crypto.randomUUID(); // e.g., "550e8400-e29b-41d4-a716-446655440000"
}

// Fallback for older browsers
function generateIdFallback(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}
```

---

## 10. Conference Data Extraction

### 10.1 Overview

The most complex feature in the demo is extracting structured session data from a conference agenda URL. Conference websites typically have:
- **Multiple dates** on a single page (3-5 day conferences)
- **Many sessions per date** (20-100+ per day)
- **Nested structure** (tracks → time slots → sessions)
- **Varied HTML structures** across different conferences

### 10.2 Extraction Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    EXTRACTION PIPELINE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Step 1: FETCH                                                  │
│  ├── Input: Conference agenda URL                               │
│  ├── Method: fetch() via CORS proxy (for demo)                  │
│  ├── Output: Raw HTML string                                    │
│  └── Error: Show manual entry fallback                          │
│                                                                 │
│  Step 2: AI EXTRACTION                                          │
│  ├── Input: Raw HTML (or relevant text subset)                  │
│  ├── Method: Gemini AI with structured prompt                   │
│  ├── Output: JSON array of extracted sessions                   │
│  └── Handles: Multi-date parsing, session type detection        │
│                                                                 │
│  Step 3: VALIDATION & NORMALIZATION                             │
│  ├── Validate required fields (title, date, time)               │
│  ├── Normalize time formats ("8:00 AM" → "8:00 am")            │
│  ├── Normalize date formats → ISO dates                         │
│  ├── Detect and assign session types                            │
│  ├── Generate unique IDs                                        │
│  └── Calculate confidence scores                                │
│                                                                 │
│  Step 4: USER REVIEW                                            │
│  ├── Show extracted sessions in editable table                  │
│  ├── Highlight low-confidence extractions                       │
│  ├── Allow inline editing of all fields                         │
│  ├── Allow adding missing sessions manually                     │
│  └── Bulk operations (set track, assign priority)               │
│                                                                 │
│  Step 5: SAVE                                                   │
│  ├── Create Conference record                                   │
│  ├── Save all Sessions to localStorage                          │
│  ├── Generate DateTabs from session dates                       │
│  └── Navigate to Planner view                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 10.3 AI Extraction Prompt Strategy

```typescript
// services/extraction.ts

const EXTRACTION_PROMPT = `
You are a data extraction specialist for biopharma conference agendas.

Given the following HTML content from a conference program page, extract ALL sessions into a structured JSON format.

CRITICAL RULES:
1. Extract EVERY session, presentation, poster, keynote, symposium, workshop, and panel
2. Handle MULTIPLE DATES — conferences span several days
3. For each session, extract: date, start time, end time, title, track/category, room/location, speakers, session type
4. If a time slot contains multiple sub-sessions, extract each one separately
5. Normalize all dates to YYYY-MM-DD format
6. Normalize all times to "h:mm am/pm" format
7. Detect session type from context clues (poster, oral, keynote, symposium, etc.)
8. If information is missing, use null (don't guess)

OUTPUT FORMAT (JSON array):
[
  {
    "date": "2026-04-07",
    "startTime": "8:00 am",
    "endTime": "9:30 am",
    "title": "Session Title",
    "track": "Track/Category Name",
    "location": "Room Name",
    "speakers": ["Speaker 1", "Speaker 2"],
    "type": "oral|poster|keynote|symposium|workshop|panel|booth|plenary|other",
    "abstractNumber": "#1234 or null",
    "description": "Brief description if available or null"
  }
]

HTML CONTENT:
{htmlContent}
`;
```

### 10.4 Handling Large HTML Content

Conference pages can be very large (100KB+). Strategy:

```typescript
// Chunk strategy for large HTML
function prepareHtmlForExtraction(html: string): string[] {
  // 1. Strip non-content elements (scripts, styles, nav, footer)
  const cleaned = stripNonContent(html);

  // 2. If cleaned HTML < 30KB, send as single prompt
  if (cleaned.length < 30000) {
    return [cleaned];
  }

  // 3. Otherwise, split by date sections
  // Look for date headers/separators and split there
  const dateChunks = splitByDateSections(cleaned);

  return dateChunks;
}

// Process each chunk and merge results
async function extractFromChunks(chunks: string[]): Promise<Session[]> {
  const allSessions: Session[] = [];

  for (const chunk of chunks) {
    const chunkSessions = await extractSessionsFromHtml(chunk);
    allSessions.push(...chunkSessions);
  }

  // Deduplicate by title + date + time
  return deduplicateSessions(allSessions);
}
```

### 10.5 Extraction Error Handling

| Error | User Impact | Recovery |
|-------|-------------|----------|
| URL fetch fails (CORS) | Cannot extract | Show manual entry form + option to paste HTML |
| AI extraction fails | No sessions parsed | Retry with simplified prompt; fallback to manual |
| Partial extraction | Some sessions missing | Show what was extracted + allow manual additions |
| Malformed times/dates | Data quality issue | Highlight for user review; auto-normalize where possible |
| Very large page | AI token limit | Chunk processing (see 10.4) |

### 10.6 Extraction Wizard UX Flow

```
Step 1: INPUT
┌──────────────────────────────────────┐
│  Paste Conference Program URL        │
│  ┌──────────────────────────────┐   │
│  │  https://conference.org/...  │   │
│  └──────────────────────────────┘   │
│  [Extract Sessions →]               │
│                                      │
│  — OR —                              │
│                                      │
│  [Create Manually]                   │
└──────────────────────────────────────┘

Step 2: PROCESSING
┌──────────────────────────────────────┐
│  Extracting sessions...              │
│  ┌──────────────────────────────┐   │
│  │  ✅ Fetching page content    │   │
│  │  ✅ Analyzing structure      │   │
│  │  ⏳ Extracting sessions...   │   │
│  │  ○ Validating data           │   │
│  └──────────────────────────────┘   │
│  Found 156 sessions across 5 days   │
└──────────────────────────────────────┘

Step 3: REVIEW
┌──────────────────────────────────────┐
│  Review Extracted Sessions           │
│  ┌──────────────────────────────┐   │
│  │  Conference: AACR 2026       │   │
│  │  Dates: Apr 6-10, 2026      │   │
│  │  Sessions: 156               │   │
│  │  Confidence: 94%             │   │
│  └──────────────────────────────┘   │
│                                      │
│  [Date tabs: Apr 6 | Apr 7 | ...]   │
│                                      │
│  Editable table of sessions...       │
│  (inline edit any field)             │
│                                      │
│  ⚠ 3 sessions need review           │
│  (highlighted in yellow)             │
│                                      │
│  [← Back] [Save Conference →]       │
└──────────────────────────────────────┘
```

---

## 11. AI Integration Standards

### 11.1 AI Service Architecture

```typescript
// services/ai.ts
import { GoogleGenAI } from "@google/genai";

// Initialize with environment variable
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || ''
});

const MODEL = 'gemini-2.0-flash';  // Use stable model, avoid preview
```

### 11.2 AI Use Cases

| Use Case | Input | Output | Temperature |
|----------|-------|--------|-------------|
| **Session Extraction** | HTML content | Structured JSON of sessions | 0.1 (deterministic) |
| **Daily Executive Brief** | Day's sessions + coverage | Markdown report | 0.3 (controlled creative) |
| **Session Summary** | Session notes + takeaways | Concise summary paragraph | 0.3 |
| **Topic Draft Report** | Topic + related sessions | Field intelligence report | 0.5 (more creative) |
| **Priority Suggestion** | Session title + track | Suggested priority level | 0.1 |
| **Cross-Conference Insight** | Sessions across conferences | Trend analysis | 0.5 |

### 11.3 AI Service Pattern

```typescript
// Standard AI call pattern
export async function aiGenerate(options: {
  prompt: string;
  temperature?: number;
  maxTokens?: number;
  responseFormat?: 'text' | 'json';
}): Promise<string> {
  const { prompt, temperature = 0.3, maxTokens = 1000 } = options;

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        temperature,
        maxOutputTokens: maxTokens,
      }
    });

    const text = response.text;
    if (!text) throw new Error('Empty AI response');

    return text;
  } catch (error) {
    console.error('[AI] Generation error:', error);

    // Provide user-friendly error messages
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Invalid API key. Please check your Gemini API key in Settings.');
      }
      if (error.message.includes('quota')) {
        throw new Error('API quota exceeded. Please try again later or check your billing.');
      }
    }

    throw new Error('AI generation failed. Please try again.');
  }
}
```

### 11.4 AI Response Parsing

```typescript
// For JSON responses from AI
function parseAIJsonResponse<T>(response: string): T {
  // AI sometimes wraps JSON in markdown code blocks
  let cleaned = response.trim();

  // Remove markdown code blocks
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }

  cleaned = cleaned.trim();

  try {
    return JSON.parse(cleaned) as T;
  } catch (error) {
    console.error('[AI] JSON parse error:', error);
    console.error('[AI] Raw response:', response.substring(0, 500));
    throw new Error('Failed to parse AI response as JSON');
  }
}
```

### 11.5 AI Safety Rules

| Rule | Implementation |
|------|---------------|
| **Never expose API key in UI** | Key stored in env var, never in component state |
| **Rate limit calls** | Max 10 AI calls per minute (client-side throttle) |
| **Handle failures gracefully** | Always show fallback UI when AI fails |
| **Never block UI on AI** | All AI calls are async with loading indicators |
| **Validate AI output** | Always validate/parse AI responses before using |
| **Log errors, not content** | Log error types, never log prompts or responses containing user data |
| **Allow manual fallback** | Every AI feature must have a manual alternative |

---

## 12. UI/UX Standards

### 12.1 Design Philosophy

ConferiQ follows a **modern enterprise dashboard** aesthetic:
- **Professional**: Suitable for biopharma corporate environments
- **Data-dense but clean**: Show lots of information without visual clutter
- **Action-oriented**: Every screen has clear primary actions
- **Status-aware**: Coverage status is visible at a glance everywhere

Visual inspiration: Linear meets Notion meets Bloomberg Terminal — adapted for Pharma CI.

### 12.2 Color System

#### Brand Colors

```css
/* Primary - Purple/Indigo (brand identity) */
--brand-primary: #7C3AED;           /* Violet 600 */
--brand-primary-light: #8B5CF6;     /* Violet 500 */
--brand-primary-dark: #6D28D9;      /* Violet 700 */
--brand-primary-soft: rgba(124, 58, 237, 0.1);

/* Secondary - Indigo (accent) */
--brand-secondary: #6366F1;         /* Indigo 500 */
--brand-secondary-soft: rgba(99, 102, 241, 0.1);
```

#### App Background & Surfaces

```css
/* Light theme (current implementation) */
--bg-app: #F3F4F6;                  /* Gray 100 - main app background */
--bg-card: #FFFFFF;                 /* White - card/panel backgrounds */
--bg-sidebar: #1E1B2E;             /* Deep purple-dark - sidebar */
--bg-elevated: #FFFFFF;            /* Elevated surfaces */

--text-primary: #1E293B;           /* Slate 800 */
--text-secondary: #64748B;         /* Slate 500 */
--text-muted: #94A3B8;             /* Slate 400 */
--text-on-dark: #FFFFFF;           /* Text on dark backgrounds */

--border-default: #E2E8F0;         /* Slate 200 */
--border-subtle: rgba(148, 163, 184, 0.1); /* Very subtle borders */
```

#### Status Colors

```css
/* Coverage Status */
--status-complete: #10B981;         /* Emerald 500 */
--status-in-progress: #6366F1;     /* Indigo 500 */
--status-assigned: #3B82F6;        /* Blue 500 */
--status-partial: #F59E0B;         /* Amber 500 */
--status-missed: #EF4444;          /* Red 500 */
--status-unassigned: #94A3B8;      /* Slate 400 */

/* Priority */
--priority-critical: #EF4444;      /* Red 500 */
--priority-high: #F59E0B;          /* Amber 500 */
--priority-medium: #3B82F6;        /* Blue 500 */
--priority-low: #94A3B8;           /* Slate 400 */

/* Session Types */
--type-oral: #8B5CF6;              /* Violet */
--type-poster: #0EA5E9;            /* Sky */
--type-keynote: #F59E0B;           /* Amber */
--type-symposium: #10B981;         /* Emerald */
--type-workshop: #EC4899;          /* Pink */
--type-booth: #14B8A6;             /* Teal */
--type-panel: #6366F1;             /* Indigo */

/* Semantic */
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;
```

### 12.3 Typography

```css
/* Font Families */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;

/* Font Scale */
--text-xs: 0.75rem;      /* 12px - Badges, metadata */
--text-sm: 0.875rem;     /* 14px - Body text, table cells */
--text-base: 1rem;       /* 16px - Default */
--text-lg: 1.125rem;     /* 18px - Subheadings */
--text-xl: 1.25rem;      /* 20px - Section titles */
--text-2xl: 1.5rem;      /* 24px - Page titles */
--text-3xl: 1.875rem;    /* 30px - Hero headings */

/* Font Weights */
--font-normal: 400;      /* Body text */
--font-medium: 500;      /* Labels, subtitles */
--font-semibold: 600;    /* Headings, emphasis */
--font-bold: 700;        /* Page titles, strong emphasis */
```

### 12.4 Spacing & Layout

```css
/* Spacing Scale (Tailwind default) */
/* Use Tailwind classes: p-1, p-2, p-3, p-4, p-5, p-6, p-8, p-10, p-12 */

/* Layout Constants */
--sidebar-width-collapsed: 80px;     /* Icon-only sidebar */
--sidebar-width-expanded: 260px;    /* Full sidebar */
--header-height: 64px;              /* Top header bar */
--content-max-width: 1400px;        /* Max width for content area */

/* Border Radius */
--radius-sm: 0.375rem;   /* 6px - Small elements */
--radius-md: 0.5rem;     /* 8px - Cards, inputs */
--radius-lg: 0.75rem;    /* 12px - Panels, modals */
--radius-xl: 1rem;       /* 16px - Large cards */
--radius-2xl: 1.5rem;    /* 24px - Feature cards */
--radius-full: 9999px;   /* Avatars, pills */
```

### 12.5 Component Patterns

#### Buttons

```typescript
// Primary action
<button className="px-4 py-2 bg-violet-600 text-white rounded-lg
  hover:bg-violet-700 transition-colors font-medium text-sm
  disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
  Primary Action
</button>

// Secondary / Ghost
<button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg
  hover:bg-slate-200 transition-colors font-medium text-sm">
  Secondary
</button>

// Danger
<button className="px-4 py-2 bg-red-600 text-white rounded-lg
  hover:bg-red-700 transition-colors font-medium text-sm">
  Delete
</button>
```

#### Cards

```typescript
// Standard card
<div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm
  hover:shadow-md transition-shadow">
  {/* Card content */}
</div>

// Interactive card
<div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm
  hover:shadow-md hover:border-violet-300 transition-all cursor-pointer">
  {/* Clickable card content */}
</div>
```

#### Form Inputs

```typescript
<input
  type="text"
  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg
    bg-white text-slate-900 placeholder-slate-400
    focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
    transition-colors"
  placeholder="Enter value..."
/>
```

### 12.6 Loading States

```typescript
// Skeleton loading (for cards, text blocks)
<div className="animate-pulse">
  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
  <div className="h-4 bg-slate-200 rounded w-1/2" />
</div>

// Spinner (for buttons, inline loading)
<svg className="animate-spin h-5 w-5 text-violet-600" viewBox="0 0 24 24">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
</svg>

// Progress bar (for extraction, report generation)
<div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
  <div
    className="h-full bg-violet-600 rounded-full transition-all duration-300"
    style={{ width: `${progress}%` }}
  />
</div>
```

### 12.7 Empty States

Every page/section must have a meaningful empty state:

```typescript
// Standard empty state pattern
<div className="flex flex-col items-center justify-center py-16 text-center">
  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
    <Icons.Calendar className="w-8 h-8 text-slate-400" />
  </div>
  <h3 className="text-lg font-semibold text-slate-700 mb-2">No Conferences Yet</h3>
  <p className="text-sm text-slate-500 mb-6 max-w-sm">
    Create your first conference by importing an agenda URL or setting one up manually.
  </p>
  <Button variant="primary" onClick={handleCreate}>
    Create Conference
  </Button>
</div>
```

### 12.8 Notifications / Toasts

```typescript
// Toast notification pattern
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // ms, default 4000
}

// Auto-dismiss: 4s for success/info, 6s for warning, 8s for error
// Position: Top-right corner, stacked
// Animation: Slide in from right, fade out
```

### 12.9 Accessibility Requirements

| Requirement | Implementation |
|-------------|---------------|
| Keyboard navigation | All interactive elements reachable via Tab |
| Focus indicators | `focus:ring-2 focus:ring-violet-500 focus:ring-offset-2` |
| ARIA labels | All icon-only buttons have `aria-label` |
| Semantic HTML | Use `<main>`, `<nav>`, `<header>`, `<section>`, `<article>` |
| Color contrast | WCAG AA minimum (4.5:1 for text, 3:1 for large text) |
| Screen reader text | Use `sr-only` class for visually hidden but accessible text |

### 12.10 Responsive Design

```
Desktop (≥1280px):  Full sidebar + full content
Tablet (768-1279):  Collapsed sidebar (icons only) + full content
Mobile (<768px):    Hidden sidebar (hamburger menu) + full-width content
```

**Note for demo**: Desktop-first. Mobile responsiveness is P2 but basic layout should not break on tablet.

---

## 13. Security Standards

### 13.1 Input Validation

```typescript
// URL validation (REQUIRED for conference URLs)
export function validateUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url.trim());
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

// Text input sanitization
export function sanitizeText(input: string, maxLength: number = 10000): string {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Strip scripts
    .replace(/on\w+="[^"]*"/gi, ''); // Strip event handlers
}
```

### 13.2 API Key Security

```typescript
// API key is stored via environment variable, NOT in localStorage
// Environment: GEMINI_API_KEY in .env file
// Access: process.env.GEMINI_API_KEY (injected by Vite at build time)

// NEVER do this:
// localStorage.setItem('api_key', key);  ← INSECURE
// console.log('Key:', apiKey);           ← INSECURE

// If we need user-entered API key for demo:
// Store in sessionStorage (cleared on tab close) + encrypt if possible
```

### 13.3 Content Security

```typescript
// Never render raw HTML from external sources without sanitization
// For AI-generated markdown content, use a safe markdown renderer
// For user-entered notes, escape HTML entities

export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, char => map[char]);
}
```

### 13.4 External Links

```typescript
// All external links must use rel="noopener noreferrer"
<a
  href={externalUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="text-violet-600 hover:text-violet-700 underline"
>
  {linkText}
</a>
```

---

## 14. Error Handling

### 14.1 Error Handling Pattern

```typescript
// Service level: catch, log, throw user-friendly error
export async function extractSessions(url: string): Promise<ExtractionResult> {
  try {
    const html = await fetchConferencePage(url);
    const sessions = await parseWithAI(html);
    return { sessions, confidence: 0.9 };
  } catch (error) {
    console.error('[Extraction] Failed:', error);

    // Map technical errors to user-friendly messages
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to access the conference URL. Please check the URL and try again.');
    }
    if (error instanceof Error && error.message.includes('AI')) {
      throw new Error('AI extraction failed. You can try again or add sessions manually.');
    }

    throw new Error('Something went wrong during extraction. Please try again.');
  }
}

// Component level: catch and display to user
const handleExtract = async () => {
  setIsLoading(true);
  setError(null);

  try {
    const result = await extractSessions(url);
    setSessions(result.sessions);
  } catch (error) {
    setError(error instanceof Error ? error.message : 'An unexpected error occurred.');
  } finally {
    setIsLoading(false);
  }
};
```

### 14.2 Error Display Rules

| Error Type | Display Method | User Action |
|------------|---------------|-------------|
| Network error | Inline error message + retry button | Retry or manual entry |
| AI error | Toast notification + fallback UI | Try again or manual |
| Validation error | Inline field-level error | Fix input and retry |
| Storage error | Toast warning | Acknowledge; data may not persist |
| Unknown error | Generic error card | Contact support or retry |

### 14.3 Error Message Guidelines

```typescript
// DO: Specific, actionable, non-technical
"Unable to extract sessions from this URL. The page may require authentication. Try pasting the HTML content directly."

// DON'T: Technical, vague, alarming
"Error: CORS policy blocked fetch. TypeError: NetworkError when attempting to fetch resource."
```

---

## 15. Performance Standards

### 15.1 React Optimization

```typescript
// Memoize expensive computations
const filteredSessions = useMemo(() => {
  return sessions
    .filter(s => filter.date ? s.date === filter.date : true)
    .filter(s => filter.track ? s.track === filter.track : true)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}, [sessions, filter.date, filter.track]);

// Memoize callbacks passed to children
const handleStatusChange = useCallback((id: string, status: CoverageStatus) => {
  updateSession(id, { status });
}, [updateSession]);

// Memoize context values
const value = useMemo(() => ({
  sessions, users, activityFeed, updateSession
}), [sessions, users, activityFeed, updateSession]);

// Use React.memo for pure display components rendered in lists
const SessionCard = React.memo(({ session, onSelect }: SessionCardProps) => {
  // ... render
});
```

### 15.2 Data Loading Patterns

```typescript
// Debounce saves to localStorage
const SAVE_DEBOUNCE_MS = 500;

function useDebouncedSave<T>(data: T, key: string) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      saveToStorage(key, data);
    }, SAVE_DEBOUNCE_MS);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [data, key]);
}
```

### 15.3 List Rendering

```typescript
// For large lists (100+ sessions), consider windowing
// For demo: standard rendering is fine for <500 items

// Always provide stable keys
{sessions.map(session => (
  <SessionCard key={session.id} session={session} />
))}

// NEVER use index as key for dynamic lists
// BAD: key={index}
// GOOD: key={session.id}
```

### 15.4 Bundle Size Guidelines

| Metric | Target | Action if Exceeded |
|--------|--------|-------------------|
| Initial JS bundle | < 500 KB (gzip) | Code-split heavy components |
| Largest component file | < 400 lines | Split into sub-components |
| Total localStorage usage | < 5 MB | Warn user; offer cleanup |

---

## 16. Testing Standards

### 16.1 Test Philosophy (Demo Phase)

For the demo phase, testing is lightweight but focused on critical paths:

| Test Type | Coverage | When to Write |
|-----------|----------|---------------|
| Manual Testing | All features | Before every demo |
| Type Safety | All code | TypeScript strict mode handles this |
| AI Response Parsing | Extraction service | Unit tests for JSON parsing |
| localStorage I/O | Storage service | Unit tests for save/load/clear |

### 16.2 Critical Test Paths

1. **Conference creation** — Create from URL, create manually, verify in localStorage
2. **Session extraction** — Parse known HTML structures, handle malformed HTML
3. **Session CRUD** — Add, edit, delete sessions; verify persistence
4. **Navigation** — Switch conferences, switch views, verify correct data loads
5. **AI generation** — Handle API errors, parse responses, display fallbacks

### 16.3 Test File Pattern

```typescript
// services/extraction.test.ts
import { describe, it, expect } from 'vitest';
import { parseAIJsonResponse, normalizeTime } from './extraction';

describe('parseAIJsonResponse', () => {
  it('should parse clean JSON', () => {
    const input = '[{"title": "Test Session"}]';
    const result = parseAIJsonResponse(input);
    expect(result).toEqual([{ title: 'Test Session' }]);
  });

  it('should handle markdown-wrapped JSON', () => {
    const input = '```json\n[{"title": "Test"}]\n```';
    const result = parseAIJsonResponse(input);
    expect(result).toEqual([{ title: 'Test' }]);
  });
});
```

---

## 17. Code Quality

### 17.1 Import Order

```typescript
// 1. React core
import React, { useState, useEffect, useMemo, useCallback } from 'react';

// 2. Third-party libraries
import { GoogleGenAI } from '@google/genai';
import { clsx } from 'clsx';

// 3. Internal contexts/hooks
import { useApp } from '../contexts/AppContext';
import { useConference } from '../contexts/ConferenceContext';

// 4. Internal components
import { Button, Badge, Avatar } from '../ui/UIComponents';
import { SessionCard } from './SessionCard';

// 5. Internal services/utils
import { AIService } from '../services/ai';
import { formatDate } from '../utils/dateUtils';

// 6. Types
import { Session, CoverageStatus, Priority } from '../types';

// 7. Constants
import { STORAGE_KEYS } from '../constants';
```

### 17.2 Tailwind CSS Class Order

```typescript
className="
  // 1. Layout (display, position, overflow)
  flex items-center justify-between relative

  // 2. Sizing
  w-full h-16 min-h-0

  // 3. Spacing
  px-4 py-2 gap-3

  // 4. Typography
  text-sm font-medium

  // 5. Colors
  bg-white text-slate-800

  // 6. Borders & Radius
  border border-slate-200 rounded-xl

  // 7. Effects
  shadow-sm

  // 8. Transitions
  transition-all duration-200

  // 9. Interactive states
  hover:shadow-md hover:border-violet-300

  // 10. Focus states
  focus:outline-none focus:ring-2 focus:ring-violet-500
"
```

### 17.3 Code Comments

```typescript
// File-level: Brief description of what the file does
/**
 * Conference URL extraction service.
 * Handles fetching conference agenda pages and parsing them
 * using AI to extract structured session data.
 */

// Complex logic: Explain WHY, not WHAT
// We chunk large HTML content because Gemini has a ~30K token limit
// per request. By splitting on date boundaries, we ensure each chunk
// has complete session data for that date.
const chunks = splitByDateSections(html);

// TODO comments: Include context
// TODO(demo): Replace CORS proxy with server-side fetch in production
// TODO(v2): Add support for PDF program extraction
```

### 17.4 File Length Guidelines

| File Type | Max Lines | Action if Exceeded |
|-----------|-----------|-------------------|
| Page View Component | 400 | Extract sub-sections into child components |
| Feature Component | 300 | Split into composable parts |
| Service | 250 | Split into focused sub-services |
| Utility | 150 | Group by domain (dateUtils, sessionUtils) |
| Types | 200 | Split by domain if needed |

---

## 18. Version Control

### 18.1 Branch Strategy

```
main                         # Stable, demo-ready code
├── develop                  # Integration branch
├── feature/home-page        # New feature
├── feature/extraction       # New feature
├── fix/session-persist      # Bug fix
└── refactor/state-mgmt      # Refactoring
```

### 18.2 Commit Message Format

```
type(scope): concise description

Types: feat, fix, docs, style, refactor, test, chore

Examples:
feat(extraction): add URL parsing with AI-powered session extraction
feat(home): implement multi-conference home page with conference cards
fix(storage): resolve session data loss on page refresh
refactor(state): migrate from single context to AppContext + ConferenceContext
docs(standards): update SOFTWARE_STANDARDS for demo phase
chore(deps): update lucide-react to v0.563.0
```

### 18.3 Commit Scope Reference

| Scope | Covers |
|-------|--------|
| `home` | Home page, multi-conference view |
| `sidebar` | Sidebar navigation, conference list |
| `dashboard` | Individual conference dashboard |
| `planner` | Planner view, session table, timeline |
| `extraction` | URL extraction, AI parsing |
| `coverage` | Live coverage, session capture |
| `reports` | Reports hub, daily briefs |
| `team` | Team management |
| `settings` | Settings page |
| `ai` | AI service, Gemini integration |
| `storage` | localStorage persistence |
| `state` | Context, state management |
| `ui` | UI components, design system |
| `types` | TypeScript type definitions |

### 18.4 Pull Request Checklist

- [ ] Code follows established standards in this document
- [ ] TypeScript types are properly defined (no `any`)
- [ ] Error handling is comprehensive (try/catch + user-friendly messages)
- [ ] Loading states are implemented for async operations
- [ ] Empty states are implemented for lists/views
- [ ] No `console.log` statements (only `console.error` and `console.warn`)
- [ ] localStorage persistence is working for affected data
- [ ] Accessibility basics met (aria-labels, keyboard nav, focus indicators)
- [ ] Component is responsive (doesn't break on smaller screens)

---

## 19. Deployment Standards

### 19.1 Build Configuration

```bash
# Development
npm run dev          # Start Vite dev server on port 3000

# Production build
npm run build        # Output to dist/

# Preview production
npm run preview      # Serve dist/ locally
```

### 19.2 Environment Variables

```bash
# .env (local development — NOT committed to git)
GEMINI_API_KEY=your_api_key_here

# Accessed in code via Vite's define:
# process.env.GEMINI_API_KEY (injected at build time)
```

### 19.3 Build Output Requirements

| Metric | Target |
|--------|--------|
| Build succeeds | Zero errors |
| Type checking | Zero TypeScript errors |
| Bundle size (gzip) | < 500 KB initial |
| Lighthouse Performance | > 80 |

### 19.4 Deployment Targets

| Platform | Configuration | Notes |
|----------|--------------|-------|
| **Vercel** (Primary) | Auto-detected Vite config | Preferred for demo |
| **Netlify** | `[build] command = "npm run build"`, `publish = "dist"` | Alternative |
| **Local Demo** | `npm run build && npm run preview` | For offline demos |

### 19.5 Pre-Demo Checklist

- [ ] Build completes without errors
- [ ] All views render correctly
- [ ] Conference creation (URL extraction) works end-to-end
- [ ] Session data persists across page refreshes (localStorage)
- [ ] AI features work with valid API key
- [ ] AI features degrade gracefully without API key
- [ ] Empty states display properly for new users
- [ ] No console errors in browser dev tools
- [ ] Looks good at 1440px width (primary demo resolution)

---

## Appendix A: Quick Reference

### File Naming Cheat Sheet

```
Components:       PascalCase.tsx          → ConferenceDashboard.tsx
Page Views:       PascalCase + View.tsx   → PlannerView.tsx
Contexts:         PascalCase + Context    → AppContext.tsx
Services:         camelCase.ts            → extraction.ts
Hooks:            use + PascalCase.ts     → useConference.ts
Utilities:        camelCase.ts            → dateUtils.ts
Types:            camelCase.ts            → types.ts
Tests:            source + .test.ts       → extraction.test.ts
```

### Storage Key Quick Reference

```
conferiq_conferences              → Conference[]
conferiq_sessions_{id}            → Session[]
conferiq_activities_{id}          → Activity[]
conferiq_users                    → User[]
conferiq_settings                 → AppSettings
conferiq_navigation               → NavigationState
```

### Color Quick Reference

```
Brand:       violet-600 (#7C3AED)
Sidebar:     #1E1B2E
Background:  gray-100 (#F3F4F6)
Cards:       white (#FFFFFF)
Text:        slate-800, slate-500, slate-400
Success:     emerald-500 (#10B981)
Warning:     amber-500 (#F59E0B)
Error:       red-500 (#EF4444)
Info:        blue-500 (#3B82F6)
```

### Priority Color Map

```
Critical → red-500 (#EF4444)
High     → amber-500 (#F59E0B)
Medium   → blue-500 (#3B82F6)
Low      → slate-400 (#94A3B8)
```

### Session Type Color Map

```
Oral        → violet-500 (#8B5CF6)
Poster      → sky-500 (#0EA5E9)
Keynote     → amber-500 (#F59E0B)
Symposium   → emerald-500 (#10B981)
Workshop    → pink-500 (#EC4899)
Booth       → teal-500 (#14B8A6)
Panel       → indigo-500 (#6366F1)
```

---

## Appendix B: Component Template

### New Page View Template

```typescript
import React, { useState, useMemo } from 'react';
import { useApp } from '../../contexts/AppContext';
import { useConference } from '../../contexts/ConferenceContext';
import { Button } from '../ui/UIComponents';

interface NewViewProps {
  // Props if needed
}

export const NewView: React.FC<NewViewProps> = () => {
  const { activeConferenceId } = useApp();
  const { sessions } = useConference();

  const [isLoading, setIsLoading] = useState(false);

  // Render empty state if no data
  if (!activeConferenceId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-slate-500">Select a conference to get started.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-800">Page Title</h1>
        <Button variant="primary">Action</Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Page content */}
      </div>
    </div>
  );
};
```

### New Service Template

```typescript
/**
 * @fileoverview Description of what this service does.
 */

import { Session, Conference } from '../types';

/**
 * Brief description of function purpose.
 * @param param - Description of parameter
 * @returns Description of return value
 * @throws {Error} When something goes wrong
 */
export async function serviceFunctionName(
  param: ParamType
): Promise<ReturnType> {
  try {
    // Implementation
    return result;
  } catch (error) {
    console.error('[ServiceName] Operation failed:', error);
    throw new Error('User-friendly error message');
  }
}
```

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Dec 2024 | Initial release (BioPulse standards) |
| 2.0.0 | Feb 2026 | Complete rewrite for ConferiQ demo phase — new architecture, localStorage persistence, conference extraction, multi-conference management, AI integration standards |

---

**Product**: ConferiQ — Biopharma Conference Intelligence Platform

**Phase**: Demo / Prototype

**Maintainers**: ConferiQ Development Team

**Review Schedule**: Before each major feature milestone or demo
