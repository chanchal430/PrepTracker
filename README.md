# Interview Practice Tracker

A responsive dashboard where a student can track their weekly interview-preparation work. Add questions across DSA, Git and Technical categories, track their difficulty and status, search and filter them, and watch overall progress update in real time. All data is saved in the browser, so nothing is lost on refresh.

- **Live demo:** [`Live Demo`](https://prep-tracker-ecru.vercel.app/)
- **Demo video:** [`Click To See Video`](https://drive.google.com/file/d/1Sh7RdfnoNhmxR7GopWtLATG6Thaor879/view?usp=sharing)
- **Repository:** [`Project`](https://github.com/chanchal430/PrepTracker.git)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [How It Works](#how-it-works)
- [Assumptions](#assumptions)
- [Deployment](#deployment)
- [Known Limitations and Future Improvements](#known-limitations-and-future-improvements)

---

## Features

**Dashboard**
- Total questions tracked
- Completed DSA problems
- Completed interview questions (Git + Technical)
- Machine-coding status, changeable directly from the dashboard
- Visual progress bar showing completion percentage
- Recent questions list

**Question tracker**
- Add questions with a category (DSA / Git / Technical), difficulty (Easy / Medium / Hard) and status (Pending / In Progress / Completed)
- Edit a question inline, or delete it (with a confirmation prompt)

**Search and filters**
- Search by title
- Filter by category, status and difficulty (filters can be combined)

**Weekly view**
- "New this week" tag on questions added since the start of the week
- "Done this week" tag on questions completed since the start of the week

**UX and polish**
- Form validation with clear error messages (react-hook-form)
- Empty state when there are no questions
- No-results state when filters or search match nothing
- Responsive layout: fixed sidebar on desktop, slide-in drawer menu on mobile
- Data persisted in `localStorage`

---

## Tech Stack

| Purpose | Tool |
|---|---|
| UI library | React |
| Build tool | Vite |
| Styling | Tailwind CSS v4 |
| Forms and validation | react-hook-form |
| Routing | react-router |
| State management | React Context API |
| Icons | lucide-react |
| Notifications | react-toastify |

---

## Setup

**Prerequisites:** Node.js 18 or later and npm.

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd interview-tracker

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open the URL printed in the terminal (usually `http://localhost:5173`).

**Other scripts**

```bash
npm run build     # create a production build in /dist
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

---

## Project Structure

```text
src/
├── components/
│   ├── common/          # Shared UI: EmptyState, Sidebar, WeekTag
│   ├── dashboard/       # StatsGrid, StatsCards, ProgressBar,
│   │                    # MachineCodingStatus, RecentQuestions
│   └── questions/       # QuestionForm, QuestionModal, QuestionList,
│                        # QuestionItem, Filters
├── context/             # Question state and actions (Context API)
├── hooks/
│   └── useLocalStorage.js   # Generic hook that syncs state with localStorage
├── pages/
│   ├── Dashboard.jsx
│   └── QuestionsPage.jsx
├── router/
│   └── AppRouter.jsx
├── utils/
│   ├── constants.js     # CATEGORIES, DIFFICULTIES, STATUSES, MACHINE_CODING_STATUSES
│   ├── stats.js         # Pure functions that compute dashboard numbers
│   └── dates.js         # Week helpers
├── App.jsx              # Layout: sidebar, mobile drawer, <Outlet />
├── main.jsx
└── index.css
```

**Design principle:** components render, context holds shared state and actions, and `utils` holds pure functions that can be tested without React.

---

## Data Model

Only raw data is stored. Everything shown on the dashboard is **derived** from it.

**Question** (stored in `localStorage` under the key `questions`)

```js
{
  id: "uuid",
  title: "Two Sum",
  category: "DSA",            // "DSA" | "Git" | "Technical"
  difficulty: "Easy",         // "Easy" | "Medium" | "Hard"
  status: "Pending",          // "Pending" | "In Progress" | "Completed"
  createdAt: 1736000000000,   // timestamp (ms)
  completedAt: null           // timestamp (ms) when completed, otherwise null
}
```

**Machine coding** (stored under the key `machineCoding`)

```js
{ status: "Not Started" }     // "Not Started" | "In Progress" | "Completed"
```

---

## How It Works

- **Derived state, not stored state.** Totals, completed counts and the progress percentage are calculated from the questions array in `utils/stats.js`. Nothing is stored twice, so numbers can never go out of sync.
- **Filtering is derived too.** The filtered list is computed from the questions and the current filter values during render, with no separate `filteredQuestions` state.
- **Context exposes actions, not raw setters.** Components call `addQuestion`, `updateQuestion`, `updateStatus`, `deleteQuestion` and `updateMachineCoding`, so state can only change in controlled ways.
- **Immutable updates.** State is always updated with `map`, `filter` and object spread, never by mutation.
- **Persistence.** `useLocalStorage` reads the saved value once using a lazy initializer (with a `try/catch` for corrupted JSON) and writes it back whenever it changes.
- **Weekly tags.** Computed at render time from `createdAt` and `completedAt`, so they disappear on their own when a new week starts.
- **Forms.** react-hook-form uses uncontrolled inputs, which means fewer re-renders than controlled `useState` forms.

---

## Assumptions

- "Interview questions" means the **Git** and **Technical** categories. DSA is counted separately.
- Machine coding is treated as **one tracked project** with its own status, not a list of questions.
- Progress percentage = completed questions / total questions.
- The week starts on **Sunday**, using the user's local timezone.
- There is no backend. Data lives only in the browser's `localStorage`, so it is per-browser and per-device.
- Questions saved before the `completedAt` field was introduced will not show a "Done this week" tag.

---

## Deployment

The app is a static Vite build and can be deployed to Vercel or Netlify.

Because the app uses client-side routing, refreshing on a route like `/questions` needs a rewrite rule, otherwise it returns a 404.

**Vercel** - add `vercel.json` in the project root:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

**Netlify** - add `public/_redirects`:

```
/* /index.html 200
```

Build command: `npm run build`  |  Output directory: `dist`

---

## Known Limitations and Future Improvements

- Data is not shared across devices (no backend or account system).
- No export/import of data.
- Possible additions: sorting, due dates per question, per-week history chart.