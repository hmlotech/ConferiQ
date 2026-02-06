# ConferiQ — Product Requirements Document

> **Version 1.0** | February 2026
>
> AI-Powered Biopharma Conference Intelligence Platform
>
> **Classification**: Internal | **Status**: Living Document

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision & Strategy](#2-product-vision--strategy)
3. [Market Context & Competitive Landscape](#3-market-context--competitive-landscape)
4. [User Personas & Journeys](#4-user-personas--journeys)
5. [Technology & Design Overview](#5-technology--design-overview)
6. [Information Architecture & Navigation](#6-information-architecture--navigation)
7. [Feature Specifications by Page](#7-feature-specifications-by-page)
8. [Conference Data Extraction Engine](#8-conference-data-extraction-engine)
9. [AI & Intelligence Features](#9-ai--intelligence-features)
10. [Data Architecture](#10-data-architecture)
11. [Multi-User Collaboration & SaaS](#11-multi-user-collaboration--saas)
12. [Integration Requirements](#12-integration-requirements)
13. [Mobile & Offline Experience](#13-mobile--offline-experience)
14. [Non-Functional Requirements](#14-non-functional-requirements)
15. [Analytics & Success Metrics](#15-analytics--success-metrics)
16. [Development Roadmap](#16-development-roadmap)
17. [Risk Assessment & Mitigation](#17-risk-assessment--mitigation)
18. [Glossary](#18-glossary)

---

## 1. Executive Summary

### 1.1 The Problem

Biopharma competitive intelligence (CI) teams attend 15-30 major medical/scientific conferences per year. Each conference involves hundreds of sessions, multiple analysts, and days of intensive data capture. Yet the process remains largely manual:

- **Pre-conference**: Teams spend 8-12 hours manually parsing conference programs, copying session titles into spreadsheets, and assigning analysts via email chains
- **During conference**: Notes are captured in personal notebooks, photos live in camera rolls, voice memos in phone recordings — all disconnected
- **Post-conference**: Assembling a comprehensive report takes 2-4 weeks, by which time the intelligence is stale and competitors have already acted
- **Across conferences**: Institutional knowledge is lost; there is no way to see how a competitor's narrative or pipeline has evolved across ASCO, ESMO, and AACR

The result: **$2-5M in annual conference spend** per large pharma company, with significant intelligence value left on the table.

### 1.2 The Solution

**ConferiQ** is an AI-powered conference intelligence platform purpose-built for biopharma CI teams. It transforms the entire conference lifecycle — pre, during, and post — into a streamlined, collaborative, AI-augmented workflow.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CONFERIQ VALUE CHAIN                           │
│                                                                         │
│   PRE-CONFERENCE          DURING CONFERENCE         POST-CONFERENCE     │
│   ──────────────          ─────────────────         ────────────────    │
│                                                                         │
│   Auto-extract agenda     Real-time team            Same-day AI         │
│   AI priority scoring     coordination              executive briefs    │
│   Smart assignments       Session capture           Cross-conference    │
│   Watchlist setup         Live progress             trend detection     │
│   Briefing package        Booth intelligence        Impact tracking     │
│   Abstract pre-analysis   Conflict alerts           Knowledge archive   │
│                                                                         │
│   ─────────────────────────────────────────────────────────────────     │
│   CONTINUOUS: AI insights, competitive signals, institutional memory    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Key Differentiators

| Differentiator | Description |
|----------------|-------------|
| **Biopharma-Native** | Understands therapeutic areas, drug names, company pipelines, conference types — not a generic project tool adapted for pharma |
| **AI-First Architecture** | AI is not a bolt-on; it powers extraction, prioritization, summarization, signal detection, and cross-conference insights from day one |
| **End-to-End Lifecycle** | Covers the full journey from program import to post-conference impact assessment — not just one phase |
| **Team Coordination at Scale** | Built for 5-20 analysts covering 200-500 sessions simultaneously with real-time visibility |
| **Institutional Memory** | Every conference builds the knowledge base; cross-conference intelligence compounds over time |

### 1.4 Target Outcome

| Metric | Current State | With ConferiQ |
|--------|--------------|---------------|
| Program parsing time | 8-12 hours | 15-30 minutes |
| Post-conference report delivery | 2-4 weeks | Same day / next day |
| Coverage visibility during conference | None (email updates) | Real-time dashboard |
| Cross-conference trend detection | Manual quarterly review | Automatic, continuous |
| Institutional knowledge retention | Lost when analysts leave | Permanently captured |

---

## 2. Product Vision & Strategy

### 2.1 Vision Statement

> **ConferiQ transforms conference chaos into competitive intelligence** — enabling biopharma CI teams to plan faster, capture smarter, and synthesize deeper, turning every conference into a compounding strategic asset.

### 2.2 Strategic Positioning

```
                    HIGH INTELLIGENCE VALUE
                           │
                           │    ConferiQ
                           │    ┌──────────┐
                           │    │ AI-first  │
                           │    │ CI-native │
                           │    │ End-to-end│
                           │    └──────────┘
        NARROW ────────────┼──────────────── BROAD
        (single phase)     │                  (full lifecycle)
                           │
             Existing      │
             Tools         │
             ┌─────┐       │
             │Excel│       │
             │Asana│       │
             └─────┘       │
                           │
                    LOW INTELLIGENCE VALUE
```

### 2.3 Product Principles

1. **Intelligence over data** — Don't just collect notes; generate actionable competitive intelligence
2. **Speed is the feature** — Every hour delay reduces intelligence value; optimize for same-day delivery
3. **Team-first design** — A single analyst's notes are useful; a team's coordinated coverage is transformative
4. **AI as co-analyst** — AI should augment human judgment, not replace it; always allow manual override
5. **Compounding value** — Each conference should make the next one more valuable through accumulated knowledge
6. **Field-ready UX** — Must work in conference halls with poor WiFi, on phones between sessions, with one hand

### 2.4 SaaS Business Model

| Tier | Users | Conferences/Year | Key Features | Target |
|------|-------|-------------------|--------------|--------|
| **Starter** | Up to 5 | Up to 5 | Core extraction, planner, basic coverage, local AI | Small CI teams, boutique consultancies |
| **Professional** | Up to 20 | Up to 20 | Full coverage, reports, team coordination, API integrations | Mid-size pharma CI teams |
| **Enterprise** | Unlimited | Unlimited | SSO, audit trail, custom integrations, advanced analytics, dedicated support | Top-20 pharma companies |

---

## 3. Market Context & Competitive Landscape

### 3.1 Target Market

**Primary**: Competitive Intelligence teams within pharmaceutical and biotechnology companies (Top 50 pharma + biotech companies)

**Secondary**: Medical affairs teams, strategic consulting firms (McKinsey Health, ZS Associates, IQVIA), independent CI consultants

**Market Size Estimate**:
- ~500 pharma/biotech companies with CI teams globally
- Average 3-10 CI professionals per company
- 15-30 conferences covered per company per year
- Total addressable market: ~$200-500M annually for conference intelligence tooling

### 3.2 Major Biopharma Conferences Served

| Conference | Acronym | Therapeutic Area | Sessions | Typical Team Size |
|-----------|---------|-----------------|----------|------------------|
| American Society of Clinical Oncology | ASCO | Oncology | 5,000+ | 8-15 |
| European Society for Medical Oncology | ESMO | Oncology | 3,000+ | 6-12 |
| American Society of Hematology | ASH | Hematology | 4,000+ | 5-10 |
| American Association for Cancer Research | AACR | Oncology/Research | 6,000+ | 5-10 |
| JP Morgan Healthcare Conference | JPM | All (Business) | 400+ | 3-8 |
| American Diabetes Association | ADA | Endocrinology | 2,500+ | 4-8 |
| European Association for Study of Liver | EASL | Hepatology | 1,500+ | 3-6 |
| American College of Rheumatology | ACR | Immunology | 2,000+ | 3-6 |
| Society for Nuclear Medicine | SNMMI | Nuclear/Radiopharm | 1,500+ | 3-6 |
| World Congress of Cardiology | ESC | Cardiology | 4,000+ | 5-10 |

### 3.3 Competitive Landscape

| Competitor | What They Do | Gap ConferiQ Fills |
|-----------|-------------|-------------------|
| **Excel + SharePoint** | Manual tracking in spreadsheets | No AI, no collaboration, no extraction, no real-time |
| **Trello / Asana** | Generic project management | Not pharma-native, no extraction, no intelligence layer |
| **Veeva CRM Events** | CRM-centric event management | Focused on commercial events, not CI conference coverage |
| **AlphaSense** | Financial/CI search platform | Great for search, but no conference workflow management |
| **FirstWord / Clarivate** | News and data feeds | Content aggregation, not conference coverage management |
| **Custom in-house tools** | Bespoke solutions | Expensive to maintain, usually only cover one phase |

**ConferiQ's white space**: No existing tool covers the full pre-during-post conference lifecycle with AI-native intelligence specifically for biopharma CI teams.

### 3.4 What Makes Biopharma Conferences Unique

Understanding these unique characteristics is essential to building the right product:

1. **Abstract-Driven**: Sessions are presentations of clinical/scientific data with structured endpoints (efficacy, safety, biomarkers). This data moves markets.
2. **Competitive Surveillance**: Companies closely watch each other's clinical data. A Phase 3 readout at ASCO can change a competitive landscape overnight.
3. **Regulatory Implications**: Data presented can accelerate or delay regulatory submissions (FDA, EMA). Analysts must capture regulatory signals.
4. **Multi-Track Parallelism**: Major conferences run 10-15 parallel tracks. No single analyst can cover everything — team coordination is essential.
5. **Poster Halls**: Hundreds of posters requiring systematic coverage, each potentially containing significant data.
6. **Exhibition Intelligence**: Company booth presence, messaging, and featured products reveal strategic priorities.
7. **KOL Access**: Conferences are opportunities to observe and interact with key opinion leaders whose views shape treatment paradigms.
8. **Time Pressure**: Leadership expects same-day intelligence. A 2-week report cycle is unacceptable in today's competitive environment.
9. **Recurring Cycle**: The same conferences happen annually, creating opportunities for year-over-year analysis and institutional memory.
10. **Late-Breaking Data**: The most impactful data is often presented as "late-breaking" abstracts, requiring rapid-response coverage.

---

## 4. User Personas & Journeys

### 4.1 Persona Definitions

#### P1: The CI Lead (Primary Power User)

```
Name:        Dr. Sarah Martinez
Title:       Director, Competitive Intelligence — Oncology
Company:     Top-10 Pharma
Team Size:   8 analysts
Conferences: 12-15 per year
```

**Goals**: Maximize intelligence yield from every conference; demonstrate CI team value to leadership; deliver insights that influence pipeline decisions

**Pain Points**: Herding cats across time zones; no single view of team progress; report generation is a multi-week nightmare; knowledge walks out the door when analysts leave

**Key Actions in ConferiQ**:
- Create conferences and extract programs
- Define competitive watchlists and priorities
- Assign analysts and balance workload
- Monitor live coverage progress in real-time
- Review and distribute daily briefs
- Generate post-conference reports
- Access cross-conference trend intelligence

#### P2: The Field Analyst (Primary Content Creator)

```
Name:        Jake Wilson
Title:       Senior CI Analyst
Company:     Top-10 Pharma
Role:        Field coverage at 6-8 conferences/year
Device:      iPhone + iPad during conference, laptop at hotel
```

**Goals**: Capture complete, high-quality intelligence from assigned sessions; keep team informed in real-time; get recognized for thoroughness

**Pain Points**: Running between sessions; poor WiFi at conference venues; typing notes on phone is slow; photos get lost in camera roll; voice memos never get transcribed

**Key Actions in ConferiQ**:
- View daily assignments and schedule
- Navigate between sessions on the venue map
- Capture notes (text, voice, photo) during/after sessions
- Mark sessions as complete/partial/missed
- Quick-capture booth intelligence
- Review AI summaries and add context

#### P3: The Remote Analyst (Support & Synthesis)

```
Name:        Priya Sharma
Title:       CI Analyst
Company:     Top-10 Pharma
Role:        Remote support during conferences, planner work pre-conference
```

**Goals**: Ensure all extracted session data is clean and properly categorized; support field team with real-time context; begin synthesis while conference is ongoing

**Key Actions in ConferiQ**:
- Work on planner: clean extracted data, assign priorities
- Monitor live coverage dashboard
- Begin drafting session summaries from field notes
- Run AI analysis on captured content
- Prepare daily brief drafts for CI Lead review

#### P4: The Business Stakeholder (Intelligence Consumer)

```
Name:        Dr. Michael Chen
Title:       VP, Oncology Strategy
Company:     Top-10 Pharma
Role:        Consumes CI output; makes pipeline decisions
```

**Goals**: Stay informed on competitive landscape changes; receive relevant intelligence without information overload; have easy access to historical context

**Key Actions in ConferiQ**:
- Subscribe to specific drugs, companies, or therapeutic areas
- Receive targeted notifications when relevant coverage is submitted
- Read daily briefs and executive summaries
- Search across conferences for specific topics
- Access cross-conference trend reports

### 4.2 User Journey: End-to-End Conference Lifecycle

```
WEEKS BEFORE                 CONFERENCE WEEK                    WEEKS AFTER
─────────────               ────────────────                   ─────────────

CI Lead:                     CI Lead:                           CI Lead:
┌─────────────────┐         ┌─────────────────┐               ┌─────────────────┐
│ Create conference│         │ Monitor coverage │               │ Review reports   │
│ Extract program  │         │ Real-time dash   │               │ Distribute       │
│ Set watchlists   │──────▶ │ Adjust assigns   │──────────▶   │ Track impact     │
│ Assign analysts  │         │ Review briefs    │               │ Archive          │
│ Generate briefing│         │ Handle conflicts │               │ Cross-conf intel │
└─────────────────┘         └─────────────────┘               └─────────────────┘

Field Analyst:               Field Analyst:                     Field Analyst:
┌─────────────────┐         ┌─────────────────┐               ┌─────────────────┐
│ Review assigns   │         │ Attend sessions  │               │ Refine notes     │
│ Sync calendar    │──────▶ │ Capture notes    │──────────▶   │ Review AI summs  │
│ Study abstracts  │         │ Upload media     │               │ Add context      │
│ Plan route       │         │ Mark status      │               │ Contribute to    │
│                  │         │ Booth captures   │               │   final report   │
└─────────────────┘         └─────────────────┘               └─────────────────┘

Stakeholder:                 Stakeholder:                       Stakeholder:
┌─────────────────┐         ┌─────────────────┐               ┌─────────────────┐
│ Set subscriptions│         │ Receive alerts   │               │ Read final report│
│ Review priorities│──────▶ │ Read daily briefs│──────────▶   │ Strategic debrief│
│                  │         │ Ask questions    │               │ Pipeline impact  │
│                  │         │ Flag interests   │               │   decisions      │
└─────────────────┘         └─────────────────┘               └─────────────────┘
```

---

## 5. Technology & Design Overview

### 5.1 Tech Stack Summary

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Frontend** | React 19 + TypeScript + Vite | Demo: SPA with state-based navigation |
| **Styling** | Tailwind CSS v3 | CDN for demo; build-integrated for production |
| **Icons** | Lucide React | Consistent, lightweight icon system |
| **AI** | Google Gemini API (`@google/genai`) | Extraction, summarization, signals, Q&A |
| **State** | React Context API | Demo: AppContext + ConferenceContext |
| **Persistence** | localStorage (demo) / Supabase PostgreSQL (production) | `conferiq_` prefixed keys |
| **Real-Time** | Mock intervals (demo) / Supabase Realtime (production) | WebSocket-based in production |
| **Auth** | Simulated (demo) / Supabase Auth + SSO (production) | JWT + refresh tokens |
| **File Storage** | In-memory (demo) / Supabase Storage (production) | Images, audio, documents |
| **Export** | jsPDF + pptxgenjs | PDF and PowerPoint generation |
| **Calendar** | Google Calendar API + Microsoft Graph | Production integration |
| **Search** | Client-side (demo) / Supabase Full-Text + pgvector (production) | Semantic search via embeddings |

> Full technical implementation standards are defined in `Standards/SOFTWARE_STANDARDS.md`.

### 5.2 Design System Brief

**Theme**: Dark mode throughout (matching the brainstorm vision). Enterprise dashboard aesthetic: Professional, data-dense, action-oriented, status-aware.

**Visual Identity**: "Notion meets Linear meets Bloomberg Terminal for Pharma"

| Element | Specification |
|---------|--------------|
| **Primary Brand** | Indigo #6366F1 / Violet #7C3AED |
| **Backgrounds** | Dark: Slate 900 #0F172A, Slate 800 #1E293B |
| **Cards** | Slate 800 with subtle borders |
| **Text** | Primary: #F8FAFC, Secondary: #94A3B8, Muted: #64748B |
| **Typography** | Inter (body), Cal Sans (display), JetBrains Mono (data) |
| **Status Colors** | Complete: Emerald, In Progress: Indigo, Partial: Amber, Missed: Red, Unassigned: Slate |
| **Priority Colors** | Critical: Red, High: Amber, Medium: Blue, Low: Gray |
| **Session Type Colors** | Oral: Purple, Poster: Sky, Keynote: Amber, Symposium: Emerald, Booth: Teal |
| **Border Radius** | Cards: 12px, Buttons: 8px, Badges: full |
| **Animations** | Subtle: 200ms transitions, skeleton loading, slide-in notifications |

> Full design system tokens and specifications are defined in `Standards/PRD_Brainstorm.md` Section 3.

---

## 6. Information Architecture & Navigation

### 6.1 Application Hierarchy

```
ConferiQ (Root)
│
├── 🏠 HOME — Conference Hub
│   ├── Active Conferences Overview
│   ├── Upcoming Conferences Calendar
│   ├── Quick Stats Across All Conferences
│   ├── Recent Activity (Global Feed)
│   └── [+ Create New Conference]
│
├── 📋 SIDEBAR — Persistent Navigation
│   ├── Home (always visible)
│   ├── Conference List (with status badges)
│   │   ├── Conference A (Active)
│   │   ├── Conference B (Planning)
│   │   └── Conference C (Completed)
│   ├── [+ Add Conference]
│   ├── Cross-Conference Intelligence
│   ├── Notifications
│   └── Settings
│
├── 📊 CONFERENCE DASHBOARD — Per-Conference Overview
│   ├── Conference Header (name, dates, status, location)
│   ├── Sub-navigation: Dashboard | Planner | Coverage | Reports | Team | Insights
│   ├── KPI Cards (sessions, assigned, covered, missed)
│   ├── Coverage Progress Visualization
│   ├── Competitive Watchlist Matches
│   ├── Today's Schedule
│   └── Activity Feed (this conference)
│
├── 📋 PLANNER — Pre-Conference Data Management
│   ├── Extraction Wizard (URL/PDF/Manual import)
│   ├── Session Data Table (sortable, filterable, editable)
│   │   ├── Table View (primary)
│   │   ├── Timeline View (visual schedule)
│   │   ├── Calendar View (day/week)
│   │   └── Assignment Matrix
│   ├── Filter Panel (date, track, type, priority, status, assignee, watchlist)
│   ├── Bulk Actions (assign, prioritize, tag, delete)
│   ├── AI Priority Scoring Panel
│   ├── Competitive Watchlist Configuration
│   └── Abstract Browser (if abstracts imported)
│
├── 🔴 LIVE COVERAGE — During Conference
│   ├── LIVE Status Badge + Day Selector
│   ├── Coverage KPI Cards (complete, in-progress, partial, missed)
│   ├── Overall Progress Bar
│   ├── Team Status Panel (per-analyst activity)
│   ├── Session Capture Interface
│   │   ├── Session Info Header
│   │   ├── Coverage Status Toggle
│   │   ├── Notes Editor (text + voice + photo)
│   │   ├── Key Takeaways
│   │   ├── Competitive Signals Tagging
│   │   └── Save / Submit Controls
│   ├── Booth Capture Interface
│   ├── Conflict Alerts
│   └── Upcoming Sessions Timeline
│
├── 📄 SESSION DETAIL — Per-Session Deep Dive
│   ├── Full Session Metadata
│   ├── Abstract / Description
│   ├── Speaker / KOL Information
│   ├── Priority & Watchlist Matches
│   ├── Assignment Details
│   ├── Coverage Content (notes, takeaways, quotes)
│   ├── Uploads (photos, audio, documents)
│   ├── AI Summary
│   ├── Competitive Signals Detected
│   ├── Related Sessions
│   └── Activity Log
│
├── 📊 REPORTS HUB — Intelligence Output
│   ├── Daily Executive Briefs (AI-generated per day)
│   ├── Session Summaries (AI + human)
│   ├── Full Conference Report Builder
│   ├── Competitive Landscape Update
│   ├── Booth Intelligence Report
│   ├── Custom Report Templates
│   └── Export Options (PDF, PPT, DOCX, Email)
│
├── 🔍 CROSS-CONFERENCE INTELLIGENCE
│   ├── Trend Analysis (drug, company, target across conferences)
│   ├── Company Spotlight (activity evolution)
│   ├── Drug / Target Tracker
│   ├── KOL Activity Map
│   ├── Ask AI (natural language cross-conference queries)
│   └── Conference Comparison (year-over-year)
│
├── 👥 TEAM MANAGEMENT
│   ├── Team Roster (roles, departments)
│   ├── Assignment Overview (per conference)
│   ├── Workload Balancing
│   ├── Analyst Performance Metrics
│   └── Activity Audit Log
│
├── 🔔 NOTIFICATIONS CENTER
│   ├── Real-Time Notifications
│   ├── Subscription Management
│   ├── Email Digest Configuration
│   └── Alert Rules
│
├── 🔍 GLOBAL SEARCH
│   ├── Search Across Conferences
│   ├── Search Sessions, Notes, Reports
│   ├── Semantic Search (AI-powered)
│   └── Saved Searches
│
└── ⚙️ SETTINGS & ADMIN
    ├── Profile Management
    ├── Organization Settings
    ├── AI Configuration
    ├── Master Data Management
    │   ├── Companies (CRUD)
    │   ├── Drugs / Products (CRUD)
    │   ├── Targets / Mechanisms (CRUD)
    │   ├── Therapeutic Areas (CRUD)
    │   └── Conference Templates
    ├── Integration Configuration
    ├── Notification Preferences
    ├── Data Management (import, export, cleanup)
    └── Audit Log
```

### 6.2 Navigation Model

ConferiQ uses a **two-level navigation** model:

**Level 1 — Sidebar**: Global navigation + conference switching
**Level 2 — Content Tabs**: Sub-navigation within a selected conference

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ┌─────────┐ ┌─────────────────────────────────────────────────────┐    │
│ │ SIDEBAR │ │  HEADER: Conference Name + Search + Notifications    │    │
│ │         │ ├─────────────────────────────────────────────────────┤    │
│ │ Home    │ │  TABS: Dashboard | Planner | Coverage | Reports...  │    │
│ │ ─────── │ ├─────────────────────────────────────────────────────┤    │
│ │ AACR ●  │ │                                                     │    │
│ │ ASCO ○  │ │                                                     │    │
│ │ ESMO ○  │ │              MAIN CONTENT AREA                      │    │
│ │ + Add   │ │                                                     │    │
│ │ ─────── │ │                                                     │    │
│ │ Intel   │ │                                                     │    │
│ │ Search  │ │                                                     │    │
│ │ ─────── │ │                                                     │    │
│ │ Settings│ └─────────────────────────────────────────────────────┘    │
│ │ 🔔 👤  │                                                            │
│ └─────────┘                                                            │
└─────────────────────────────────────────────────────────────────────────┘
```

**Navigation Rules**:
1. **Home** is the default landing page showing all conferences
2. Clicking a conference in the sidebar opens it and shows the **Dashboard** tab
3. The system remembers the last tab per conference (e.g., if you were on Planner for ASCO, going back to ASCO takes you to Planner)
4. **Cross-Conference Intelligence**, **Search**, and **Settings** are global — they don't require a conference to be selected
5. The sidebar collapses to icon-only on narrow viewports; expands with conference names and labels on wide viewports

---

## 7. Feature Specifications by Page

### 7.0 AUTHENTICATION & ONBOARDING (Production)

**Login Page**:
- Centered card on dark gradient/mesh background
- Email + password fields
- "Sign In" primary button
- SSO buttons: "Continue with Google" / "Continue with Microsoft"
- "Forgot Password" link
- Tagline: "Transform conference chaos into competitive intelligence"

**Registration / Sign Up**:
- Name, email, password, organization name
- Invite-based: users can only join an existing organization via email invitation, or create a new one
- Email verification flow

**Onboarding Wizard** (first login):
- Step 1: Welcome + role selection (CI Lead / Analyst / Viewer)
- Step 2: Set up competitive watchlist (select companies, drugs, TAs of interest)
- Step 3: Invite team members (optional, skip for now)
- Step 4: Create first conference or explore demo data
- Estimated time: < 3 minutes

> Note: For the demo phase, authentication is simulated with mock user data. The user is auto-logged-in as a CI Lead.

### 7.1 HOME PAGE — Conference Hub

**Purpose**: Central hub for managing all conferences. First thing users see after login.

**Data Displayed**:
- Quick stats: Total conferences, active, upcoming this quarter, completed this year
- Conference cards (one per conference) showing:
  - Name, acronym, dates, location
  - Status badge (Planning / Active / Completed / Archived)
  - Session count, assigned count, coverage percentage
  - Progress bar
  - Therapeutic area tags
  - Days until start (for upcoming) or days remaining (for active)
- Recent activity feed across all conferences
- Upcoming conference calendar (next 6 months)

**User Actions**:
- Create new conference (opens extraction wizard)
- Click conference card to open it
- Filter conferences by status, therapeutic area, date range
- Sort conferences by date, name, or completion
- Archive completed conferences
- Duplicate a conference template for year-over-year reuse

**Empty State**: First-time user sees onboarding illustration with "Create your first conference" CTA.

### 7.2 SIDEBAR — Conference Navigation

**Purpose**: Persistent left-side navigation for switching between conferences and accessing global features.

**Structure**:

| Section | Items | Behavior |
|---------|-------|----------|
| Brand | ConferiQ logo | Click → Home |
| Home | Home icon + label | Click → Home page |
| Conferences | List of all conferences | Click → Conference Dashboard; active conference highlighted |
| Add Conference | "+" button | Click → Extraction Wizard |
| Divider | — | — |
| Cross-Intelligence | Globe/trend icon | Click → Cross-Conference page |
| Search | Search icon | Click → Global Search |
| Divider | — | — |
| Settings | Gear icon | Click → Settings |
| Notifications | Bell icon + badge count | Click → Notification Center |
| User Profile | Avatar + status | Click → Profile menu |

**Conference List Behavior**:
- Shows conference name + status dot (green=active, yellow=planning, gray=completed)
- Active (selected) conference has highlighted background
- Conferences ordered by: Active first, then by start date descending
- Max 10 visible without scrolling; scrollable list for more
- Each conference shows a mini progress indicator (thin colored bar)

**Sidebar States**:
- **Expanded** (default on desktop ≥1280px): Shows icons + labels, ~260px wide
- **Collapsed** (tablet 768-1279px): Icons only, ~80px wide
- **Hidden** (mobile <768px): Off-screen, revealed via hamburger menu

### 7.3 CONFERENCE DASHBOARD — Per-Conference Overview

**Purpose**: At-a-glance overview of a single conference's status. The "command center" for the CI Lead.

**Header**:
- Conference name, full name, dates (with countdown/day indicator)
- Location and venue
- Status badge (editable by Lead)
- Source URL link
- Quick actions: Edit conference, Export data, Archive

**Sub-Navigation Tabs**:
`Dashboard` | `Planner` | `Coverage` | `Reports` | `Team` | `Insights`

**Dashboard Content**:

| Section | Content |
|---------|---------|
| **KPI Cards Row** | Total sessions, Assigned (%), Covered (%), In Progress, Missed, AI Summaries Generated |
| **Coverage Progress** | Donut chart or segmented bar showing status distribution |
| **Watchlist Alerts** | Sessions matching competitive watchlist, with match count and highlights |
| **Today's Schedule** | Timeline of today's sessions with status indicators and analyst avatars |
| **Coverage by Track** | Horizontal bars showing coverage % per track/therapeutic area |
| **Coverage by Type** | Breakdown by session type (oral, poster, keynote, etc.) |
| **Activity Feed** | Real-time feed of team actions for this conference |
| **AI Quick Insights** | 3-5 AI-generated insight cards (e.g., "3 sessions mention your watchlist drug Pluvicto") |

### 7.4 PLANNER — Pre-Conference Data Management

**Purpose**: The analyst's primary workspace for managing session data. Where extraction results are reviewed, sessions are prioritized, and analysts are assigned.

This is the most data-dense page in the application.

#### 7.4.1 Extraction Wizard (New Conference Creation)

**Trigger**: Click "Create Conference" or "Add Conference"

**Step 1 — Source Selection**:
- Option A: **Import from URL** — Paste conference program URL
- Option B: **Import from PDF** — Upload conference program PDF (future)
- Option C: **Manual Setup** — Enter conference details manually and add sessions one by one
- Option D: **From Template** — Clone a previous year's conference

**Step 2 — Extraction Processing** (for URL path):
- Show real-time progress: Fetching page → Analyzing structure → Extracting sessions → Validating data
- Display extraction stats: "Found 156 sessions across 5 days"
- Show confidence score
- If extraction fails: offer to paste HTML directly, or fall back to manual

**Step 3 — Conference Details**:
- Auto-populated from extraction (editable):
  - Conference name, full name, acronym
  - Start date, end date, timezone
  - Location, venue
  - Website URL
- Manual fields:
  - Therapeutic areas (multi-select tags)
  - Conference type (Major / Regional / Specialized)
  - Competitive watchlist selection (from master data)

**Step 4 — Review & Edit Sessions**:
- Full data table of extracted sessions
- Columns: Date | Time | Title | Track | Type | Location | Speakers | Confidence
- Low-confidence rows highlighted in yellow
- Inline editing for all fields
- Bulk actions: select multiple → set type, set track, delete
- Add missing sessions manually via inline row
- Date tabs for multi-day navigation

**Step 5 — Confirm & Create**:
- Summary: X sessions across Y days
- "Create Conference" button
- On success: navigate to Planner view

#### 7.4.2 Planner Views

**Table View** (Primary):
- Sortable columns: Date, Time, Title, Track, Type, Priority, Status, Assigned To, AI Score, Watchlist Match
- Filterable by all columns
- Inline editing: priority dropdown, status dropdown, assignee picker
- Row selection for bulk actions
- Bulk actions toolbar: Assign to, Set Priority, Set Status, Add Tag, Delete
- Pagination or virtual scrolling for large datasets
- Column visibility toggle (show/hide columns)
- Export to CSV/Excel

**Timeline View**:
- Horizontal timeline per day
- Rooms/tracks as rows
- Sessions as colored blocks (color = session type or priority)
- Analyst avatar chips on assigned sessions
- Hover for details popup
- Click to open session detail
- Day navigation tabs

**Calendar View**:
- Day view (default for active conferences)
- Week view (for planning phase)
- Sessions as events, color-coded by type
- Drag-and-drop reassignment (Lead role only)

**Assignment Matrix**:
- Grid: Sessions as rows, Analysts as columns
- Checkmarks showing assignments
- Color coding: green (complete), blue (assigned), yellow (in progress), gray (unassigned)
- Click cell to assign/unassign
- Shows conflict indicators (overlapping sessions for same analyst)

#### 7.4.3 Filter Panel

Shared across all planner views:

| Filter | Type | Options |
|--------|------|---------|
| Date | Date picker / tabs | Per conference day |
| Track | Multi-select dropdown | Auto-populated from sessions |
| Session Type | Checkbox group | Oral, Poster, Keynote, Symposium, etc. |
| Priority | Checkbox group | Critical, High, Medium, Low |
| Coverage Status | Checkbox group | Unassigned, Assigned, In Progress, Complete, Missed |
| Assigned To | Multi-select dropdown | Team members |
| Watchlist Match | Toggle | Show only watchlist matches |
| AI Score Range | Slider | 0-100 |
| Search | Text input | Search by title, abstract number, speaker |
| Custom Tags | Multi-select | User-defined tags |

#### 7.4.4 AI Priority Scoring

Automated priority suggestion for each session based on configurable criteria:

| Factor | Weight (Default) | Description |
|--------|-------------------|-------------|
| Watchlist company match | 30% | Session mentions a watched company |
| Watchlist drug match | 25% | Session mentions a watched drug/product |
| Therapeutic area alignment | 15% | Session is in a priority therapeutic area |
| Session type importance | 10% | Late-breaking > Keynote > Oral > Poster |
| KOL presenter | 10% | Speaker is a known key opinion leader |
| Historical priority | 10% | Similar sessions were prioritized in past years |

**Output**: AI Score (0-100) per session + suggested priority level (Critical/High/Medium/Low)

### 7.5 LIVE COVERAGE — During Conference

**Purpose**: Real-time command center during the conference. Shows what's happening now, who's covering what, and where gaps exist.

**Header**: Conference name + "LIVE" badge (pulsing red dot) + Day selector tabs

**Layout (Three Zones)**:

```
┌──────────────────────────────────────────────────────────────────┐
│  [KPI Cards]  Complete: 24 (61%) | In Prog: 8 | Partial: 3 | Missed: 2  │
│  [Progress Bar]  ████████████████████░░░░░░░░░░░░  52% (24/46)          │
├────────────────────────┬─────────────────────────────────────────┤
│                        │                                         │
│  TEAM STATUS           │  SESSION SCHEDULE                       │
│  ──────────────        │  ──────────────────                     │
│  👤 Sarah   🟢 Active │  ▼ Current (10:00 - 11:00)              │
│    ⏳ Covering: ADC..  │    [Session card with capture button]   │
│    ✅ Done: 3 today    │    [Session card with capture button]   │
│                        │                                         │
│  👤 Mike    🟢 Active │  ▼ Upcoming (11:00 - 12:00)             │
│    📷 Uploading...     │    [Session card]                       │
│    ✅ Done: 5 today    │    [Session card]                       │
│                        │                                         │
│  👤 Priya   🟡 Remote │  ▼ Completed                            │
│    📝 Drafting summary │    [Session card with ✅]               │
│                        │                                         │
│  CONFLICT ALERTS       │                                         │
│  ⚠ Jake has overlap   │                                         │
│    at 14:00            │                                         │
│                        │                                         │
└────────────────────────┴─────────────────────────────────────────┘
```

**Key Features**:
- **Conflict Detection**: Highlights when an analyst is assigned to overlapping sessions
- **Coverage Gap Alerts**: Shows unassigned sessions happening soon
- **Quick Reassign**: One-click reassignment when conflicts or absences are detected
- **Session Quick-Capture**: Click any session to open inline capture (notes, status, takeaways)
- **Booth Capture Mode**: Quick-access button for exhibition hall intelligence

### 7.6 BOOTH CAPTURE — Exhibition Intelligence

**Purpose**: Structured capture of competitive intelligence from company exhibition booths.

**Trigger**: "Booth Capture" button in Live Coverage, or from a dedicated Booth Capture mode accessible from the sidebar.

**Fields**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Company Name | Searchable dropdown (from master data) | Yes | The exhibiting company |
| Booth Number | Text input | No | Booth location identifier |
| Booth Size/Presence | Select (Small / Medium / Large / Major) | No | Scale of exhibition presence |
| Focus Areas | Tag input (add/remove) | No | What the company is emphasizing |
| Key Messages | Bullet list (add/remove) | No | Core messaging points |
| Products Featured | Tag input (from drug master data) | No | Drugs/products being showcased |
| Personnel Notes | Textarea | No | Key people present, conversations had |
| Competitive Assessment | Textarea | No | Analyst's assessment of competitive positioning |
| Voice Recording | Audio recorder widget | No | Record booth walk-through narration |
| Photos | Photo capture/upload (multiple) | No | Booth setup, displays, posters |

**AI Processing**:
- After submission, AI generates a concise booth summary
- AI extracts entities (companies, drugs, targets) for watchlist matching
- Photos are processed with OCR/vision to extract text from booth displays
- Audio recordings are transcribed and key points extracted

**Booth Intelligence Dashboard** (aggregate view):
- All booth captures for the conference in a sortable grid
- Company comparison table: presence, focus areas, messaging
- Heat map of booth activity by therapeutic area
- Photo gallery by company

### 7.7 SESSION DETAIL — Per-Session Deep Dive

**Purpose**: Complete view of a single session — all metadata, all captured content, all AI analysis.

**Sections**:

| Section | Content |
|---------|---------|
| **Header** | Title, abstract number, session type badge, priority badge, time, room |
| **Speakers** | Names, affiliations, presenter indicator, KOL badge if applicable |
| **Abstract / Description** | Full abstract text (expandable), keywords |
| **Watchlist Matches** | Which watchlist items this session matches (companies, drugs, targets) |
| **Assignment** | Assigned analysts with avatars, backup assignee |
| **Coverage Status** | Status toggle: Unassigned → Assigned → In Progress → Complete / Partial / Missed |
| **Notes** | Rich text editor with formatting, auto-save |
| **Key Takeaways** | Bullet point list (add/remove/reorder) |
| **Notable Quotes** | Quote text + speaker attribution |
| **Competitive Signals** | AI-detected or manually tagged signals with categories |
| **Uploads** | Grid of photos, audio recordings, documents with processing status |
| **AI Summary** | Auto-generated summary from notes + uploads + takeaways |
| **Related Sessions** | AI-suggested related sessions at this or other conferences |
| **Activity Log** | Timeline of all changes (who edited what, when) |

### 7.8 REPORTS HUB — Intelligence Output

**Purpose**: Generate, view, and distribute intelligence outputs.

**Report Types**:

| Report Type | Generation | Content | When |
|-------------|-----------|---------|------|
| **Daily Executive Brief** | AI-generated, human-reviewed | Executive summary, key highlights, coverage stats, notable quotes, competitive signals | End of each conference day |
| **Session Summary** | AI-generated from notes | Concise 1-2 paragraph summary of each covered session | After session coverage is submitted |
| **Competitive Landscape Update** | AI-generated from all data | Company-by-company analysis of conference presence and messaging | Post-conference |
| **Full Conference Report** | AI-generated, heavily customizable | Comprehensive report with all sections, configurable content | Post-conference |
| **Booth Intelligence Report** | AI-generated from booth captures | Exhibition hall intelligence summary | Post-conference |
| **Flash Alert** | Manual + AI assistance | Urgent competitive signal notification | Real-time during conference |

**Daily Brief Structure**:
1. Executive Summary (2-3 paragraphs)
2. Critical Alerts & Competitive Signals
3. Key Session Highlights (top 5-10)
4. Coverage Statistics (sessions covered, gaps, team productivity)
5. Notable Quotes
6. Booth Intelligence Highlights
7. Tomorrow's Priority Sessions
8. Recommended Actions for Leadership

**Export Options**: PDF (branded), PowerPoint, Word/DOCX, Email, Clipboard (for pasting into other tools)

### 7.9 CROSS-CONFERENCE INTELLIGENCE

**Purpose**: The "big picture" view that connects dots across multiple conferences over time.

**Features**:

1. **Trend Tracker**: Track how a topic (drug, mechanism, therapeutic approach) evolves across conferences
   - Mention frequency over time (bar chart / line chart)
   - Key narrative shifts
   - Related sessions from each conference

2. **Company Spotlight**: Deep dive into a specific competitor
   - Presentation count across conferences
   - Topics covered (word cloud or list)
   - Key message evolution
   - Booth presence and messaging comparison

3. **Drug / Target Tracker**: Follow a specific drug or molecular target
   - Clinical data readout timeline
   - Conference-to-conference data evolution
   - Competing drugs in same indication

4. **KOL Activity Map**: Track key opinion leaders
   - Which conferences they presented at
   - What topics they spoke on
   - Affiliation changes
   - Presentation frequency

5. **Ask AI**: Natural language query interface
   - "What were the key ADC data points across ASCO and ESMO last year?"
   - "How has Novartis's conference strategy changed over the past 3 conferences?"
   - "What are the emerging competitive threats in NSCLC?"

### 7.10 TEAM MANAGEMENT

**Purpose**: Manage team composition, roles, and workload.

**Features**:
- Team member roster: name, email, role, department, avatar
- Role management: Admin, CI Lead, Analyst, Viewer (with permissions)
- Per-conference assignment overview: who is assigned to what
- Workload visualization: bar chart of assignment count per analyst per conference
- Historical coverage stats: sessions covered, on-time rate, quality scores
- Invite new members (email invitation flow)
- Calendar integration status per user

### 7.11 NOTIFICATIONS CENTER

**Purpose**: Keep all users informed about relevant events.

**Notification Types**:

| Type | Recipient | Trigger |
|------|-----------|---------|
| New Assignment | Analyst | CI Lead assigns them to a session |
| Assignment Reminder | Analyst | 30min before assigned session starts |
| Coverage Submitted | CI Lead | Analyst submits session coverage |
| AI Summary Ready | CI Lead, Analyst | AI finishes generating a summary |
| Daily Brief Ready | All | Daily brief is generated/approved |
| Watchlist Alert | Subscribers | New coverage matches watchlist item |
| Coverage Gap | CI Lead | Unassigned session starting within 1 hour |
| Conflict Detected | Analyst, CI Lead | Analyst has overlapping assignments |
| Report Ready | Subscribers | A report has been published |

**Subscription Management**: Users can subscribe to specific topics, companies, drugs, or conferences and configure what triggers they want notifications for.

### 7.12 GLOBAL SEARCH & COMMAND PALETTE

**Purpose**: Find anything across all conferences instantly. Two access points: dedicated search page and quick command palette.

**Command Palette (Cmd+K / Ctrl+K)**:
- Quick-access overlay triggered by keyboard shortcut
- Actions: Navigate to any page, switch conference, search sessions, create conference, run AI commands
- Recent actions history
- Fuzzy matching on titles, conference names, session names
- Shows results grouped by category (Conferences, Sessions, Reports, Actions)

**Search Page — Full Search Capabilities**:
- **Text search**: Session titles, notes, speaker names, abstract content
- **Filters**: Conference, date range, session type, track, company, drug
- **Semantic search** (AI): "sessions about CAR-T resistance mechanisms" — finds relevant results even if exact words don't match
- **Saved searches**: Save frequently used queries for quick access
- **Search results**: Grouped by type (Sessions, Notes, Reports, Booth Captures) with relevance scoring
- **Cross-conference**: Search spans all conferences in the organization

### 7.13 SETTINGS & ADMIN

**General Settings**: App theme preferences, default views, date/time format

**AI Configuration**: API key management, model selection, AI feature toggles

**Master Data Management** (Admin only):
- **Companies**: CRUD for biopharma companies (name, ticker, headquarters, therapeutic focus)
- **Drugs / Products**: CRUD for drug names (name, company, mechanism, indication, development phase)
- **Targets / Mechanisms**: CRUD for molecular targets (name, class, related drugs)
- **Therapeutic Areas**: CRUD for TA taxonomy
- **Conference Templates**: Pre-configured templates for recurring conferences

**Organization Settings** (Admin only):
- Organization name, branding
- Default competitive watchlist
- User provisioning settings
- Data retention policies

---

## 8. Conference Data Extraction Engine

### 8.1 The Challenge

Conference program extraction is the hardest technical problem in ConferiQ. Conference websites vary enormously:

| Challenge | Detail |
|-----------|--------|
| **Multi-date layouts** | Single page contains 3-7 days of sessions |
| **Nested structures** | Day → Track → Time Slot → Session → Sub-session |
| **100s of sessions** | A single page may list 200+ individual sessions |
| **Varied HTML** | Every conference website has different markup |
| **Dynamic content** | Some sites use JavaScript rendering |
| **Large pages** | 50-200KB of HTML content |
| **Inconsistent formatting** | Times as "8:00 AM", "08:00", "8am", "Morning" |
| **Multi-page programs** | Program may span multiple URLs |

### 8.2 Extraction Pipeline

```
URL Input → Fetch HTML → Clean HTML → Chunk if needed → AI Extract → Validate → Normalize → Review
```

**Step 1: Fetch**
- Client-side fetch via CORS proxy (demo) or server-side fetch (production)
- Handle redirects, authentication-required pages, JavaScript-rendered content
- Fallback: Allow user to paste HTML directly

**Step 2: Clean**
- Strip `<script>`, `<style>`, `<nav>`, `<footer>`, `<header>` tags
- Remove comments, whitespace, hidden elements
- Extract main content area if identifiable

**Step 3: Chunk** (for large pages)
- If cleaned HTML > 30KB, split by date section boundaries
- Process each chunk independently
- Merge and deduplicate results

**Step 4: AI Extract**
- Send HTML to Gemini with structured extraction prompt
- Request JSON output with defined schema
- Temperature: 0.1 (maximum determinism)

**Step 5: Validate**
- Required fields present: title, date, time
- Valid date format (parseable)
- Valid time format
- No duplicate sessions (same title + date + time)
- Reasonable data (not extracting navigation links as sessions)

**Step 6: Normalize**
- Dates → ISO format (YYYY-MM-DD)
- Times → "h:mm am" format
- Session types → standardized enum values
- Generate unique IDs

**Step 7: User Review**
- Present in editable table
- Highlight low-confidence items
- Allow corrections before saving

### 8.3 Extraction Quality Targets

| Metric | Target |
|--------|--------|
| Session detection rate | > 90% of actual sessions found |
| Data accuracy (title) | > 95% correctly extracted |
| Data accuracy (time) | > 90% correctly extracted |
| Data accuracy (type) | > 80% correctly classified |
| Processing time | < 60 seconds for typical conference |
| Failure rate | < 10% of URLs fail completely |

---

## 9. AI & Intelligence Features

### 9.1 AI Feature Matrix

| Feature | Phase | Input | Output | Model | Value |
|---------|-------|-------|--------|-------|-------|
| **Program Extraction** | Pre | HTML content | Structured sessions JSON | Gemini | Saves 8+ hours |
| **Priority Scoring** | Pre | Session title + context | Score (0-100) + rationale | Gemini | Focuses analyst time |
| **Abstract Pre-Analysis** | Pre | Abstract text | Key findings, competitive relevance | Gemini | Preparation advantage |
| **Pre-Conference Briefing** | Pre | All session data + watchlists | Briefing document (MD) | Gemini | Team alignment |
| **Session Summary** | During/Post | Notes + takeaways + uploads | Concise summary paragraph | Gemini | Faster synthesis |
| **Daily Executive Brief** | During | Day's covered sessions | Executive briefing (MD) | Gemini | Same-day intelligence |
| **Competitive Signal Detection** | During | Notes content | Tagged signals with categories | Gemini | Proactive alerting |
| **Slide/Photo Intelligence** | During | Uploaded images | Extracted text, data points | Gemini Vision | Data capture from slides |
| **Audio Transcription** | During | Voice recordings | Transcribed text | Whisper | Hands-free capture |
| **Full Conference Report** | Post | All coverage data | Comprehensive report | Gemini | Report generation |
| **Cross-Conference Trends** | Post | Sessions across conferences | Trend analysis | Gemini | Strategic intelligence |
| **Natural Language Q&A** | Any | User question | Answer with citations | Gemini + RAG | On-demand intelligence |
| **Entity Extraction (NER)** | Continuous | All text content | Companies, drugs, targets | Gemini | Structured intelligence |

### 9.2 Competitive Signal Detection

One of ConferiQ's most valuable AI features — automatically detecting competitive intelligence signals in analyst notes.

**Signal Categories**:

| Category | Examples | Priority |
|----------|---------|----------|
| **Efficacy Data** | "Overall survival improved by 6 months", "ORR was 45%" | High |
| **Safety Signal** | "Grade 3+ adverse events in 18% of patients", "treatment-related deaths" | High |
| **Regulatory Signal** | "Filing expected Q4 2026", "FDA breakthrough designation" | Critical |
| **Commercial Signal** | "First-line positioning", "pricing strategy discussed" | High |
| **Pipeline Update** | "Phase 3 enrollment complete", "new indication under study" | Medium |
| **Partnership/M&A** | "Collaboration with Company X announced", "licensing deal" | High |
| **Competitive Threat** | "Head-to-head data vs. our Drug Y", "superior efficacy vs. standard" | Critical |
| **Market Access** | "Reimbursement challenges in EU", "value-based contract model" | Medium |

**Implementation**: After an analyst submits notes, AI scans the text and tags relevant signals. CI Leads receive notifications for Critical and High priority signals.

### 9.3 Pre-Conference Briefing Package

AI-generated document that prepares the team before the conference begins.

**Contents**:
1. Conference Overview (dates, location, expected attendance, key themes)
2. Competitive Landscape Summary (which competitors are presenting, expected data)
3. Priority Sessions (top 20-30, with rationale for each)
4. Watchlist Matches (sessions matching competitive watchlist)
5. KOL Presenters (notable speakers and their track record)
6. Historical Context (what happened at this conference last year)
7. Team Coverage Plan (who's covering what, schedule overview)
8. Logistics Notes (venue info, wifi availability, session format notes)

### 9.4 Media Intelligence (Photo & Audio Processing)

**Photo/Slide Intelligence**:
- Analysts upload photos of presentation slides, posters, and booth displays
- AI Vision processes images to:
  - Extract all text via OCR
  - Identify data tables, charts (Kaplan-Meier curves, waterfall plots, forest plots)
  - Extract key data points (endpoints, p-values, hazard ratios)
  - Summarize the visual content in text form
- Extracted data is attached to the session and searchable

**Audio/Voice Intelligence**:
- Analysts record voice memos during or after sessions
- Audio is transcribed using speech-to-text (Whisper API)
- AI processes transcript to:
  - Extract key data points and quotes
  - Identify speaker statements vs analyst commentary
  - Generate structured notes from free-form narration
- Transcription is attached to the session and editable

**Processing Pipeline**:
```
Upload → Queue → Process (OCR/Transcription) → AI Analysis → Attach to Session → Notify
```

All media processing is asynchronous. Users see processing status indicators on each upload.

### 9.5 Entity Extraction & Annotation System

**Automatic Entity Extraction (NER)**:
AI continuously scans all text content (session titles, notes, abstracts, transcriptions) to extract and tag:

| Entity Type | Examples | Action |
|-------------|---------|--------|
| Companies | "Novartis", "Pfizer", "BioNTech" | Auto-link to company master data, trigger watchlist alerts |
| Drugs/Products | "Pluvicto", "Keytruda", "trastuzumab" | Auto-link to drug master data, track across conferences |
| Targets/Mechanisms | "PSMA", "PD-L1", "ADC", "bispecific" | Auto-tag, enable cross-conference trend tracking |
| Indications | "mCRPC", "NSCLC", "triple-negative breast cancer" | Auto-categorize sessions by indication |
| Clinical Data | "ORR 45%", "mOS 18.2 months", "HR 0.67" | Extract structured data points for analysis |
| Regulatory | "FDA approval", "breakthrough therapy", "filing Q4" | Flag for regulatory intelligence |

**Manual Annotation/Tagging**:
- Users can add custom tags to any session, note, or report
- Predefined tag categories: Competitive Threat, Opportunity, Pipeline Update, Regulatory, Commercial, Follow-Up
- Tags are searchable and filterable across the planner and search views
- Tag taxonomy is configurable per organization in Settings

### 9.6 Natural Language Q&A (Ask AI)

Users can ask questions about any conference data in natural language:

**Example Queries**:
- "What were the key ADC data readouts at ASCO this year?"
- "Which companies had the largest booth presence?"
- "Summarize all sessions about PSMA-targeting therapies"
- "How did Novartis's messaging change between ASCO and ESMO?"
- "What safety signals were reported for radioligand therapies?"

**Implementation**: RAG (Retrieval-Augmented Generation) over conference notes, sessions, and reports.

---

## 10. Data Architecture

### 10.1 Core Entities

```
┌─────────────────┐     ┌─────────────────┐
│   Organization   │────│      User        │
└────────┬────────┘     └────────┬────────┘
         │                       │
         │              ┌────────┴────────┐
         │              │   Assignment     │
         │              └────────┬────────┘
         │                       │
┌────────┴────────┐     ┌────────┴────────┐
│   Conference     │────│    Session       │
└────────┬────────┘     └────────┬────────┘
         │                       │
         │              ┌────────┴────────┐
         │              │    Coverage      │
         │              └────────┬────────┘
         │                       │
┌────────┴────────┐     ┌────────┴────────┐
│  BoothCapture    │     │     Upload      │
└─────────────────┘     └─────────────────┘

Additional Entities:
├── Report            (conference_id, type, content)
├── Notification      (user_id, type, reference)
├── Subscription      (user_id, scope_type, scope_id)
├── WatchlistItem     (organization_id, type, name)
├── CompetitiveSignal (session_id, category, description)
├── Tag               (entity_id, entity_type, name)
└── AuditLog          (user_id, action, entity, timestamp)
```

### 10.2 Key Entity Relationships

| Relationship | Cardinality | Description |
|-------------|-------------|-------------|
| Organization → Conference | 1:many | An org manages many conferences |
| Organization → User | 1:many | An org has many team members |
| Conference → Session | 1:many | A conference has many sessions |
| Session → Coverage | 1:many | A session can have multiple coverage entries (from different analysts) |
| Session → Upload | 1:many | A session can have many uploaded files |
| Session → Assignment | 1:many | A session can be assigned to multiple analysts |
| User → Assignment | 1:many | A user can be assigned to many sessions |
| Conference → BoothCapture | 1:many | A conference has many booth captures |
| Conference → Report | 1:many | A conference has many reports |
| User → Notification | 1:many | A user receives many notifications |

### 10.3 Competitive Watchlist Data Model

```typescript
interface WatchlistItem {
  id: string;
  organizationId: string;
  type: 'company' | 'drug' | 'target' | 'mechanism' | 'indication';
  name: string;                    // "Novartis", "Pluvicto", "PSMA"
  aliases: string[];               // ["NVS", "Novartis AG", "Novartis Pharma"]
  priority: 'critical' | 'high' | 'medium';
  notes?: string;
  createdBy: string;
  createdAt: string;
}

interface WatchlistMatch {
  sessionId: string;
  watchlistItemId: string;
  matchType: 'title' | 'abstract' | 'speaker_affiliation' | 'notes';
  matchText: string;               // The specific text that matched
  confidence: number;              // 0-100
}
```

### 10.4 Demo Phase Persistence (localStorage)

For the demo/prototype phase, all data is stored in browser localStorage. See `SOFTWARE_STANDARDS.md` Section 9 for the complete localStorage schema, storage utilities, and quota management.

**Production migration path**: localStorage → Supabase PostgreSQL (see Section 15, Roadmap).

---

## 11. Multi-User Collaboration & SaaS

### 11.1 Collaboration Features

| Feature | Description | Phase |
|---------|-------------|-------|
| **Shared Conference Workspace** | All team members see the same conference data | Demo (simulated) |
| **Real-Time Status Updates** | Coverage status changes are visible to all in real-time | Demo (simulated), Prod (WebSocket) |
| **Assignment Notifications** | Analysts receive instant notifications when assigned | Demo (in-app), Prod (+ email) |
| **Activity Feed** | Real-time feed showing what team members are doing | Demo (simulated) |
| **Session Comments** | Thread-based discussion per session | Production |
| **@Mentions** | Tag team members in notes and comments | Production |
| **Shared vs Private Notes** | Analyst can mark notes as draft/private until ready to share | Production |
| **Approval Workflow** | CI Lead reviews and approves coverage before distribution | Production |
| **Conflict Resolution** | Handle concurrent edits to same session gracefully | Production |
| **Audit Trail** | Full history of who changed what, when | Production |

### 11.2 Role-Based Access Control (RBAC)

| Permission | Admin | CI Lead | Analyst | Viewer |
|-----------|-------|---------|---------|--------|
| Create conference | Yes | Yes | No | No |
| Delete conference | Yes | No | No | No |
| Edit conference settings | Yes | Yes | No | No |
| Import/extract program | Yes | Yes | Yes | No |
| Edit session data | Yes | Yes | Yes (assigned only) | No |
| Assign analysts | Yes | Yes | No | No |
| Set priorities | Yes | Yes | Yes (suggestions) | No |
| Capture session coverage | Yes | Yes | Yes | No |
| Submit booth capture | Yes | Yes | Yes | No |
| View coverage | Yes | Yes | Yes | Yes |
| Generate reports | Yes | Yes | No | No |
| View reports | Yes | Yes | Yes | Yes |
| Manage team | Yes | Yes (own team) | No | No |
| Manage master data | Yes | No | No | No |
| Configure integrations | Yes | Yes | No | No |
| View audit log | Yes | Yes | No | No |
| Manage subscriptions | Yes | Yes | Yes (own) | Yes (own) |

### 11.3 Multi-Tenant Architecture (Production)

```
┌─────────────────────────────────────────────────────────────┐
│                     CONFERIQ SAAS                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Org: Pfizer  │  │ Org: Novartis│  │  Org: Roche  │      │
│  │              │  │              │  │              │      │
│  │ Users: 15    │  │ Users: 8     │  │ Users: 12    │      │
│  │ Conf: 12     │  │ Conf: 8      │  │ Conf: 10     │      │
│  │ Sessions:2000│  │ Sessions:1500│  │ Sessions:1800│      │
│  │              │  │              │  │              │      │
│  │ DATA IS      │  │ DATA IS      │  │ DATA IS      │      │
│  │ ISOLATED     │  │ ISOLATED     │  │ ISOLATED     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
│  Shared Infrastructure:                                     │
│  ├── Supabase (PostgreSQL with Row-Level Security)          │
│  ├── AI Services (Gemini / Claude with per-org billing)     │
│  ├── File Storage (Supabase Storage with org prefixes)      │
│  └── Real-time (Supabase Channels per org)                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 12. Integration Requirements

### 12.1 Calendar Integration

| Platform | Functionality | Priority |
|----------|--------------|----------|
| **Google Calendar** | Sync session assignments as calendar events; accept/decline from calendar | P1 |
| **Microsoft Outlook** | Same as Google Calendar, via Microsoft Graph API | P1 |
| **Apple Calendar** | iCal export for manual import | P2 |

**Calendar Sync Behavior**:
- When a session is assigned to an analyst, a calendar event is created
- Event includes: session title, time, location, priority, link back to ConferiQ
- When assignment changes, calendar event updates
- Conflict detection: warn if analyst has existing calendar conflicts

### 12.2 Communication Integration

| Platform | Functionality | Priority |
|----------|--------------|----------|
| **Email (Resend/SendGrid)** | Daily digest emails, report distribution, invitation emails | P1 |
| **Slack** | Channel notifications for coverage updates, watchlist alerts, daily briefs | P2 |
| **Microsoft Teams** | Same as Slack, via Teams webhooks/connectors | P2 |

### 12.3 Export Integration

| Format | Use Case | Priority |
|--------|----------|----------|
| **PDF** | Reports, daily briefs, executive summaries (branded) | P1 |
| **PowerPoint** | Slide decks from session summaries, photo galleries | P1 |
| **Excel/CSV** | Session data export for custom analysis | P1 |
| **Word/DOCX** | Editable report documents | P2 |
| **Email** | Direct email distribution of reports | P1 |

### 12.4 Future Integrations (Production Roadmap)

| Integration | Purpose |
|-------------|---------|
| **Veeva CRM** | Sync KOL interactions and conference meetings |
| **AlphaSense** | Enrich sessions with external intelligence |
| **Evaluate / Clarivate** | Pipeline data enrichment |
| **Custom API** | Enterprise customers build their own integrations |
| **SSO (SAML/OIDC)** | Enterprise authentication via Okta, Azure AD, etc. |

---

## 13. Mobile & Offline Experience

### 13.1 Mobile Strategy

Conference venues have notoriously poor WiFi. The mobile experience is critical for field analysts.

**Approach**: Progressive Web App (PWA) — works in browser, installable on home screen, supports offline capabilities.

### 13.2 Mobile-Optimized Pages

| Page | Mobile Priority | Key Adaptations |
|------|----------------|-----------------|
| **Session Capture** | Critical (P0) | Large touch targets, simplified layout, camera integration, voice recording |
| **My Schedule / Today** | Critical (P0) | Timeline of today's assignments with navigation to capture |
| **Booth Capture** | High (P1) | Simplified form, prominent voice recorder, photo capture |
| **Coverage Status Update** | High (P1) | One-tap status changes |
| **Notifications** | High (P1) | Standard mobile notification UX |
| **Session Detail** | Medium (P2) | Scrollable detail view |
| **Dashboard** | Low (P3) | Simplified stats (mostly used on desktop) |

### 13.3 Offline Capabilities

| Action | Offline Behavior |
|--------|-----------------|
| View today's schedule | Cached locally |
| View session details | Cached locally |
| Update coverage status | Queued, synced when online |
| Write notes | Saved locally, synced when online |
| Take photos | Saved locally, uploaded when online |
| Record audio | Saved locally, uploaded when online |
| View notifications | Last-fetched shown; new ones when online |

**Sync Strategy**: Service Worker caches key data. All write operations go to a local queue. When connectivity returns, queue is processed in order. Conflict resolution: last-write-wins with audit trail.

---

## 14. Non-Functional Requirements

### 14.1 Performance

| Metric | Target |
|--------|--------|
| Time to first meaningful paint | < 2 seconds |
| Session list rendering (500 sessions) | < 500ms |
| Session search response | < 200ms |
| AI extraction (full conference) | < 90 seconds |
| AI daily brief generation | < 30 seconds |
| Real-time update latency | < 2 seconds |
| Page navigation | < 300ms |

### 14.2 Scalability

| Dimension | Target |
|-----------|--------|
| Concurrent users per conference | 50 |
| Sessions per conference | 10,000 |
| Conferences per organization | 100 |
| Total sessions in system | 500,000 |
| File uploads per conference | 5,000 |
| Concurrent AI operations | 20 per org |

### 14.3 Reliability

| Metric | Target |
|--------|--------|
| Uptime SLA | 99.9% (excluding planned maintenance) |
| Data durability | 99.999% |
| Backup frequency | Daily automated backups |
| Recovery time objective (RTO) | < 4 hours |
| Recovery point objective (RPO) | < 1 hour |

### 14.4 Security

| Requirement | Implementation |
|-------------|---------------|
| Data encryption at rest | AES-256 |
| Data encryption in transit | TLS 1.3 |
| Authentication | JWT + refresh tokens; SSO (SAML/OIDC) for enterprise |
| Authorization | Row-Level Security in PostgreSQL |
| API key management | Server-side only; never exposed to client |
| Input validation | All inputs validated server-side |
| Content sanitization | HTML sanitized before rendering |
| Audit logging | All data mutations logged with user, timestamp, before/after |
| GDPR compliance | Data export, deletion on request, consent management |
| SOC 2 Type II | Target for enterprise customers |

### 14.5 Accessibility

| Standard | Target |
|----------|--------|
| WCAG compliance | Level AA |
| Keyboard navigation | Full support |
| Screen reader support | ARIA labels on all interactive elements |
| Color contrast | 4.5:1 minimum for text |
| Focus indicators | Visible on all interactive elements |

---

## 15. Analytics & Success Metrics

### 15.1 Product Success Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| **Time to First Conference** | Time from signup to first conference created | < 30 minutes |
| **Extraction Success Rate** | % of URL extractions that produce usable results | > 85% |
| **Coverage Completion Rate** | % of assigned sessions that get covered | > 90% |
| **Report Delivery Time** | Time from conference end to final report | < 48 hours |
| **Daily Active Users** (during conference) | Team members using ConferiQ each day | > 80% of assigned analysts |
| **Cross-Conference Usage** | % of users accessing cross-conference intelligence | > 40% |
| **Return Usage** | % of conferences using ConferiQ again the next year | > 90% |

### 15.2 In-App Analytics Dashboard (for CI Leads)

**Team Productivity Metrics**:
- Sessions covered per analyst per day
- Average time from session end to coverage submission
- Notes quality score (length, takeaways count, signal tags)
- Coverage completion rate by analyst

**Conference Coverage Metrics**:
- Overall coverage rate (assigned vs covered)
- Coverage by track/therapeutic area
- Coverage by session type
- Gap analysis (high-priority sessions missed)
- Time-to-coverage distribution

**Intelligence Output Metrics**:
- Reports generated per conference
- AI summaries generated and approved
- Competitive signals detected
- Cross-conference insights generated
- Stakeholder report views

---

## 16. Development Roadmap

### 16.1 Phase Overview

```
PHASE 0: DEMO          PHASE 1: MVP           PHASE 2: GROWTH        PHASE 3: ENTERPRISE
(Current)               (Q2 2026)              (Q3-Q4 2026)           (2027)
─────────────          ─────────────          ─────────────          ─────────────
localStorage           Supabase backend       Full AI suite          SSO / SAML
Mock multi-user        Real auth (Supabase)   Cross-conference       Audit trail
AI extraction          Real-time (WebSocket)  Calendar integration   Custom API
Basic planner          Full RBAC              Email distribution     Advanced analytics
Basic coverage         File upload/storage    Slack/Teams            Multi-language
Basic reports          Assignment workflow    Offline PWA            White-labeling
Single conference      Multi-conference       Report templates       Enterprise support
Mock data              Production data        Semantic search
```

### 16.2 Demo Phase Breakdown (Current — 4-6 Weeks)

| Week | Focus | Deliverables |
|------|-------|-------------|
| **Week 1** | Foundation | Home page, sidebar with conference list, conference creation, extraction wizard |
| **Week 2** | Planner | Session data table, filter panel, timeline view, inline editing, bulk actions |
| **Week 3** | Coverage | Live coverage dashboard, session capture, status tracking, mock real-time |
| **Week 4** | Intelligence | AI daily briefs, session summaries, competitive signal tagging |
| **Week 5** | Reports & Polish | Reports hub, export, cross-conference view, UI polish |
| **Week 6** | Demo Prep | End-to-end testing, demo script preparation, edge case handling |

### 16.3 Priority Framework

Features are prioritized using **ICE scoring**:

- **I**mpact (1-10): How much does this move the needle for users?
- **C**onfidence (1-10): How sure are we this will work as expected?
- **E**ase (1-10): How quickly can we build this?

| Feature | Impact | Confidence | Ease | ICE | Phase |
|---------|--------|-----------|------|-----|-------|
| URL extraction | 10 | 7 | 5 | 350 | Demo |
| Session data table | 9 | 9 | 7 | 567 | Demo |
| Live coverage dashboard | 9 | 8 | 6 | 432 | Demo |
| AI daily briefs | 9 | 7 | 6 | 378 | Demo |
| Multi-conference home | 8 | 9 | 8 | 576 | Demo |
| Competitive watchlist | 8 | 8 | 5 | 320 | Demo/MVP |
| AI priority scoring | 7 | 6 | 5 | 210 | MVP |
| Calendar integration | 7 | 8 | 4 | 224 | Growth |
| Cross-conference intel | 8 | 6 | 4 | 192 | Growth |
| Offline PWA | 7 | 7 | 3 | 147 | Growth |
| SSO / SAML | 6 | 9 | 4 | 216 | Enterprise |

---

## 17. Risk Assessment & Mitigation

### 17.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| **Conference URL extraction fails** (varied HTML) | High | High | Multiple fallbacks: paste HTML, manual entry, PDF upload. Continuously improve AI prompts. |
| **AI hallucination** in extraction | Medium | High | User review step is mandatory. Confidence scoring highlights uncertain data. |
| **localStorage limits** for demo | Low | Medium | Quota management + cleanup. Warn user before limit reached. |
| **AI API rate limits / costs** | Medium | Medium | Client-side throttling. Cache AI responses. Allow model selection. |
| **Poor WiFi at conferences** (mobile) | High | High | Offline-first architecture. Queue + sync. Local caching. |
| **Large conference programs** (5000+ sessions) | Medium | Medium | Chunked extraction. Virtual scrolling in UI. Pagination. |

### 17.2 Product Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| **User adoption resistance** | Medium | High | Beautiful UX, clear onboarding, demo impressive results fast. |
| **Not enough differentiation** from Excel | Medium | High | AI features (extraction, summarization, signals) provide undeniable value over spreadsheets. |
| **Conference programs change format** | High | Medium | AI-based extraction adapts to varying formats. Template library for known conferences. |
| **Compliance concerns** (pharma data) | Medium | High | SOC 2 compliance. Data residency options. Enterprise security features. |

### 17.3 Business Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| **Competitor enters market** | Medium | High | Move fast. Build moat through conference templates, institutional data, and cross-conference intelligence. |
| **Pricing sensitivity** | Medium | Medium | Freemium tier for small teams. Clear ROI demonstration. |
| **Long enterprise sales cycle** | High | Medium | Product-led growth. Free trials with real value. Bottom-up adoption. |

---

## 18. Glossary

| Term | Definition |
|------|-----------|
| **Abstract** | A short summary of scientific research presented at a conference, usually submitted months before the event |
| **CI** | Competitive Intelligence — the practice of monitoring and analyzing competitor activities |
| **Coverage** | The process of attending and documenting a conference session's content |
| **Coverage Status** | The state of a session: Unassigned, Assigned, In Progress, Complete, Partial, Missed |
| **Daily Brief** | An executive summary document generated at the end of each conference day |
| **Extraction** | The process of automatically parsing a conference program URL to extract structured session data |
| **Field Analyst** | A CI team member physically present at the conference venue |
| **Flash Alert** | An urgent competitive intelligence notification sent in real-time |
| **KOL** | Key Opinion Leader — an influential medical professional whose views shape treatment paradigms |
| **Late-Breaking** | Data or abstracts submitted shortly before the conference, often containing the most impactful findings |
| **NER** | Named Entity Recognition — AI technique for extracting structured entities (companies, drugs, targets) from text |
| **Planner** | The pre-conference workspace for organizing sessions, assignments, and priorities |
| **Poster** | A visual presentation displayed in the exhibition hall; a common format for presenting research data |
| **RAG** | Retrieval-Augmented Generation — combining search with AI generation for more accurate responses |
| **Satellite Symposium** | A company-sponsored session at a conference, often promoting specific products |
| **Session** | An individual presentation, talk, poster, or workshop at a conference |
| **Signal** | A piece of competitive intelligence indicating a strategic change or development |
| **Therapeutic Area (TA)** | A medical specialty (e.g., Oncology, Cardiology, Immunology) |
| **Track** | A thematic grouping of sessions at a conference (e.g., "Breast Cancer", "Cell Therapy") |
| **Watchlist** | A configurable list of companies, drugs, or targets that the CI team is actively monitoring |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 (Brainstorm) | Jan 2026 | — | Initial brainstorm document (PRD_Brainstorm.md) |
| 1.0 | Feb 2026 | — | Full PRD: comprehensive feature specs, biopharma-specific features (watchlists, signals, KOL tracking, abstract analysis), SaaS architecture, multi-user collaboration, integration requirements, mobile/offline strategy, analytics, roadmap, risk assessment |

---

**Document Status**: Living document. Updated as features are specified, built, and refined.

**Related Documents**:
- `Standards/SOFTWARE_STANDARDS.md` — Technical implementation standards
- `Standards/UI_UX_STANDARDS.md` — Design system and UI guidelines
- `Standards/PRD_Brainstorm.md` — Original brainstorm (archived reference)
