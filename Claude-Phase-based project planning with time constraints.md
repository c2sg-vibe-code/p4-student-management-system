# Phase-based project planning with time constraints

**Created:** 6/22/2026 21:37:51  
**Updated:** 6/22/2026 21:37:51  
**Exported:** 6/22/2026 23:21:25  
**Link:** [https://claude.ai/share/7a6d76ff-5ce7-4c7a-8c55-cddd173929ff](https://claude.ai/share/7a6d76ff-5ce7-4c7a-8c55-cddd173929ff)  

## User:

> 6/22/2026 21:14:05

Plan a phase by phase project planning for this task. Every phase may contain several steps. Since this is a time constraint task, so consider planning a rigid plan in the timeframe.  Don't start working, at first i will approve the plan, then you can start with phase 1. Remember to finish every phase at a time.

## Assistant:

> 6/22/2026 21:14:15

## Project Plan: Student Management System

**Stack choice:** React + Tailwind (in a single artifact) — fastest to iterate, no build tooling needed.

---

### Phase 1 — Foundation & Seed Data (5 min)
- Scaffold the React artifact with tab-based navigation (Students / Enrollments / Grades)
- Initialize localStorage with seed data on first run
- Set up shared state (students, courses, enrollments, grades)

### Phase 2 — Student Registration (10 min)
- Build the Add Student form with all required fields
- Student ID format validation (`YYSNNNNN` — year, shift, serial)
- Persist new students to localStorage
- Render students in a sortable, searchable, paginated table

### Phase 3 — Course Enrollment (8 min)
- Build the Enroll Student form (Enrollment ID, Student ID, Course ID, Date)
- Validate that Student ID and Course ID exist in data
- Persist to localStorage
- Render enrollments table with search + sort

### Phase 4 — Grade Submission (7 min)
- Build the Submit Grade form (Grade ID, Student ID, Course ID, Grade, Semester)
- Validate grade is 0–100; validate student/course exist
- Persist to localStorage
- Render grades table with search + sort

### Phase 5 — Bonus & Polish (10 min)
- URL state persistence (search, sort, page synced to query params via `window.history`)
- Toast notifications for success/failure
- Inline field-level error messages
- Pagination across all three tables
- Final visual polish

### Phase 6 — Buffer / QA (5 min)
- Smoke test all forms and tables
- Fix any edge cases (duplicate IDs, empty states, etc.)

---

**Total: ~45 min**

Ready to start Phase 1 on your approval — just say the word.

## User:

> 6/22/2026 21:17:00

did u acknowledged every requirements given in the project?

## Assistant:

> 6/22/2026 21:17:18

Let me re-read carefully and audit against every requirement.

---

## Requirements Audit

### Core Requirements

| # | Requirement | Acknowledged? | Notes |
|---|---|---|---|
| 1 | Student Registration form (ID, Name, Email, Program, Year) | ✅ | |
| 2 | Display students in a table | ✅ | |
| 3 | Course Enrollment form (Enrollment ID, Student ID, Course ID, Date) | ✅ | |
| 4 | Display enrollments in a table | ✅ | |
| 5 | Grade Submission form (Grade ID, Student ID, Course ID, Grade, Semester) | ✅ | |
| 6 | Grade validation: 0–100 | ✅ | |
| 7 | Display grades in a table | ✅ | |
| 8 | localStorage persistence for new records | ✅ | |
| 9 | Load seed data on first run | ✅ | |

---

### Bonus Requirements

| # | Requirement | Acknowledged in Plan? | Notes |
|---|---|---|---|
| B1 | Student ID format validation (`2620009` → YY + Shift + Serial) | ✅ | Planned Phase 2 |
| B2 | **Current year only** for admission year digits | ⚠️ **Missed** | The year digits (`26`) must match the current year. Need to dynamically derive current year and reject anything else |
| B3 | Shift validation: digit 3 must be `1` or `2` only | ⚠️ **Partially missed** | Mentioned format but didn't call out shift digit constraint explicitly |
| B4 | Serial: last 4 digits (`0009`) | ✅ | Implied in format |
| B5 | Inline field-level error messages | ✅ | Phase 5 |
| B6 | Toast notifications for success/failure | ✅ | Phase 5 |
| B7 | Table search/filtering | ✅ | Phases 2–4 |
| B8 | Table sorting on relevant columns | ✅ | Phases 2–4 |
| B9 | Pagination | ✅ | Phases 2–4 |
| B10 | URL state persistence (search, sort, page, filters) | ✅ | Phase 5 |
| B11 | Example URL format: `/students?page=2&search=ayesha&sort=name&order=asc` | ✅ | Phase 5 |

---

### What I Missed / Need to Adjust

1. **Student ID year = current year strictly** — the `26` in `2620001` represents 2026. Since registration is only for the current year, any Student ID whose first two digits don't match the last two digits of the current year should be rejected with a clear error.

2. **Shift digit must be exactly `1` or `2`** — digit 3 is not just any number; `1 = Morning`, `2 = Day`. Anything else is invalid.

3. **Seed data has students from `2026` (id starts with `26`)** — these pre-exist in storage so validation only applies to the *registration form*, not seed data.

4. **`courses` from seed data** — I had this in state but didn't explicitly call out that Course IDs in Enrollment and Grade forms should be validated against the courses list (C101, C102, C103). Need to add that clearly.

---

### Revised Phase Plan

| Phase | Work | Time |
|---|---|---|
| 1 | Foundation, seed data, localStorage init, tab nav | 5 min |
| 2 | Student form + strict ID validation (year + shift + serial) + table with search/sort/pagination | 10 min |
| 3 | Enrollment form + validation against existing students & courses + table | 8 min |
| 4 | Grade form + 0–100 validation + student/course existence check + table | 7 min |
| 5 | URL state sync, toasts, inline errors, polish | 10 min |
| 6 | QA / edge cases | 5 min |

---

Now I'm confident everything is covered. Shall I begin Phase 1?

## User:

> 6/22/2026 21:17:42

start phase 1

## Assistant:

> 6/22/2026 21:18:18

**Student Management System**

````jsx
import { useState, useEffect, createContext, useContext } from "react";

// ── Seed Data ────────────────────────────────────────────────────────────────
const seedData = {
  students: [
    { id: "2620001", name: "Ayesha Rahman",  email: "ayesha@uni.edu", program: "CSE", year: 2 },
    { id: "2620002", name: "Tanvir Hossain", email: "tanvir@uni.edu", program: "EEE", year: 3 },
    { id: "2620003", name: "Priya Das",      email: "priya@uni.edu",  program: "CSE", year: 1 },
  ],
  courses: [
    { id: "C101", name: "Data Structures",  credits: 3, instructor: "Dr. Karim",  seats: 30 },
    { id: "C102", name: "Web Engineering",  credits: 3, instructor: "Dr. Noor",   seats: 25 },
    { id: "C103", name: "Database Systems", credits: 4, instructor: "Dr. Islam",  seats: 20 },
  ],
  enrollments: [
    { id: "E001", studentId: "2620001", courseId: "C101", date: "2026-01-15" },
    { id: "E002", studentId: "2620002", courseId: "C102", date: "2026-01-16" },
  ],
  grades: [
    { id: "G001", studentId: "2620001", courseId: "C101", grade: 88, semester: "Spring 2026" },
  ],
};

// ── localStorage helpers ─────────────────────────────────────────────────────
const LS_KEYS = { students: "sms_students", courses: "sms_courses", enrollments: "sms_enrollments", grades: "sms_grades", seeded: "sms_seeded" };

function lsGet(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}
function lsSet(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function initStorage() {
  if (!lsGet(LS_KEYS.seeded)) {
    lsSet(LS_KEYS.students,    seedData.students);
    lsSet(LS_KEYS.courses,     seedData.courses);
    lsSet(LS_KEYS.enrollments, seedData.enrollments);
    lsSet(LS_KEYS.grades,      seedData.grades);
    lsSet(LS_KEYS.seeded,      true);
  }
}

// ── App Context ──────────────────────────────────────────────────────────────
const AppCtx = createContext(null);

function AppProvider({ children }) {
  const [students,    setStudentsRaw]    = useState([]);
  const [courses,     setCoursesRaw]     = useState([]);
  const [enrollments, setEnrollmentsRaw] = useState([]);
  const [grades,      setGradesRaw]      = useState([]);
  const [toasts,      setToasts]         = useState([]);

  useEffect(() => {
    initStorage();
    setStudentsRaw(lsGet(LS_KEYS.students)    || []);
    setCoursesRaw(lsGet(LS_KEYS.courses)      || []);
    setEnrollmentsRaw(lsGet(LS_KEYS.enrollments) || []);
    setGradesRaw(lsGet(LS_KEYS.grades)        || []);
  }, []);

  const setStudents = v    => { setStudentsRaw(v);    lsSet(LS_KEYS.students,    v); };
  const setCourses  = v    => { setCoursesRaw(v);     lsSet(LS_KEYS.courses,     v); };
  const setEnrollments = v => { setEnrollmentsRaw(v); lsSet(LS_KEYS.enrollments, v); };
  const setGrades  = v     => { setGradesRaw(v);      lsSet(LS_KEYS.grades,      v); };

  const addToast = (msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  };

  return (
    <AppCtx.Provider value={{ students, setStudents, courses, setCourses, enrollments, setEnrollments, grades, setGrades, addToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </AppCtx.Provider>
  );
}

// ── Toast ────────────────────────────────────────────────────────────────────
function ToastContainer({ toasts }) {
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          padding: "10px 18px", borderRadius: 8, color: "#fff", fontWeight: 500, fontSize: 14,
          background: t.type === "success" ? "#16a34a" : "#dc2626",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)", animation: "fadeIn .2s ease"
        }}>{t.msg}</div>
      ))}
    </div>
  );
}

// ── Tab Nav ──────────────────────────────────────────────────────────────────
const TABS = ["Students", "Enrollments", "Grades"];

function TabNav({ active, setActive }) {
  return (
    <div style={{ display: "flex", borderBottom: "2px solid #e5e7eb", marginBottom: 28 }}>
      {TABS.map(t => (
        <button key={t} onClick={() => setActive(t)} style={{
          padding: "10px 28px", fontWeight: 600, fontSize: 15, border: "none", cursor: "pointer",
          background: "none", borderBottom: active === t ? "2px solid #4f46e5" : "2px solid transparent",
          color: active === t ? "#4f46e5" : "#6b7280", marginBottom: -2, transition: "all .15s"
        }}>{t}</button>
      ))}
    </div>
  );
}

// ── Placeholder panels ───────────────────────────────────────────────────────
function Placeholder({ label }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af", fontSize: 16 }}>
      🚧 <strong>{label}</strong> — coming in next phase
    </div>
  );
}

// ── Root App ─────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState("Students");
  const { students, courses, enrollments, grades } = useContext(AppCtx);

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#4f46e5", color: "#fff", padding: "18px 32px" }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>🎓 Student Management System</h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, opacity: 0.8 }}>University Department Portal</p>
      </div>

      {/* Stats Bar */}
      <div style={{ display: "flex", gap: 16, padding: "16px 32px", background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
        {[
          { label: "Students",    count: students.length,    color: "#4f46e5" },
          { label: "Courses",     count: courses.length,     color: "#0891b2" },
          { label: "Enrollments", count: enrollments.length, color: "#059669" },
          { label: "Grades",      count: grades.length,      color: "#d97706" },
        ].map(s => (
          <div key={s.label} style={{ padding: "8px 20px", borderRadius: 8, background: "#f3f4f6", minWidth: 110 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        <TabNav active={activeTab} setActive={setActiveTab} />
        {activeTab === "Students"    && <Placeholder label="Student Registration" />}
        {activeTab === "Enrollments" && <Placeholder label="Course Enrollment" />}
        {activeTab === "Grades"      && <Placeholder label="Grade Submission" />}
      </div>

      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>
    </div>
  );
}

export default function Root() {
  return <AppProvider><App /></AppProvider>;
}
````

Phase 1 is done. Here's what's in place:

**✅ Completed in Phase 1:**
- `initStorage()` — seeds localStorage exactly once on first run, never overwrites existing data
- `AppContext` — shared state for `students`, `courses`, `enrollments`, `grades` with every setter auto-syncing to localStorage
- `ToastContainer` — wired and ready, just needs `addToast()` calls in later phases
- Stats bar showing live counts from state
- Tab navigation (Students / Enrollments / Grades) — placeholder panels for now
- Clean header + layout shell

**What you'll see:** The stats bar shows `3 Students`, `3 Courses`, `2 Enrollments`, `1 Grade` — confirming seed data loaded correctly from localStorage.

Ready to move to **Phase 2 (Student Registration form + table)** on your go.

## User:

> 6/22/2026 21:19:19

create proper project structure, and create every files in individual artifacts

## Assistant:

> 6/22/2026 21:19:31

Good call. Let me lay out the full project structure first, then we'll map each file to an artifact.

---

## Project Structure

```
student-management-system/
├── public/
│   └── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── data/
│   │   └── seed.js
│   ├── context/
│   │   └── AppContext.jsx
│   ├── hooks/
│   │   └── useUrlState.js
│   ├── utils/
│   │   ├── localStorage.js
│   │   └── validators.js
│   ├── components/
│   │   ├── ui/
│   │   │   ├── TabNav.jsx
│   │   │   ├── Toast.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── Modal.jsx
│   │   ├── students/
│   │   │   ├── StudentForm.jsx
│   │   │   └── StudentTable.jsx
│   │   ├── enrollments/
│   │   │   ├── EnrollmentForm.jsx
│   │   │   └── EnrollmentTable.jsx
│   │   └── grades/
│   │       ├── GradeForm.jsx
│   │       └── GradeTable.jsx
│   └── pages/
│       ├── StudentsPage.jsx
│       ├── EnrollmentsPage.jsx
│       └── GradesPage.jsx
├── package.json
└── vite.config.js
```

---

## File → Artifact Map

| Artifact | File | Purpose |
|---|---|---|
| `seed` | `src/data/seed.js` | Raw seed dataset |
| `localStorage` | `src/utils/localStorage.js` | get/set/init helpers |
| `validators` | `src/utils/validators.js` | Student ID, grade, field validators |
| `useUrlState` | `src/hooks/useUrlState.js` | URL query param sync hook |
| `AppContext` | `src/context/AppContext.jsx` | Global state + localStorage sync |
| `TabNav` | `src/components/ui/TabNav.jsx` | Tab navigation bar |
| `Toast` | `src/components/ui/Toast.jsx` | Toast notification system |
| `Table` | `src/components/ui/Table.jsx` | Reusable sortable table |
| `Pagination` | `src/components/ui/Pagination.jsx` | Reusable pagination bar |
| `Modal` | `src/components/ui/Modal.jsx` | Reusable modal wrapper |
| `StudentForm` | `src/components/students/StudentForm.jsx` | Add student form |
| `StudentTable` | `src/components/students/StudentTable.jsx` | Students data table |
| `EnrollmentForm` | `src/components/enrollments/EnrollmentForm.jsx` | Enroll student form |
| `EnrollmentTable` | `src/components/enrollments/EnrollmentTable.jsx` | Enrollments data table |
| `GradeForm` | `src/components/grades/GradeForm.jsx` | Submit grade form |
| `GradeTable` | `src/components/grades/GradeTable.jsx` | Grades data table |
| `StudentsPage` | `src/pages/StudentsPage.jsx` | Students tab page |
| `EnrollmentsPage` | `src/pages/EnrollmentsPage.jsx` | Enrollments tab page |
| `GradesPage` | `src/pages/GradesPage.jsx` | Grades tab page |
| `App` | `src/App.jsx` | Root app shell + tab routing |
| `main` | `src/main.jsx` | Entry point |
| `package` | `package.json` | Dependencies + scripts |
| `vite.config` | `vite.config.js` | Vite config |

---

That's **23 files across 23 artifacts**. Shall I go ahead and generate all of them now?

## User:

> 6/22/2026 21:19:48

so i don't have to create any file in this phase?

## Assistant:

> 6/22/2026 21:19:54

Correct — in this phase I'm just planning the structure. But once you approve, I'll generate all 23 files as individual artifacts and you'll need to:

1. **Scaffold the project** manually with:
   ```bash
   npm create vite@latest student-management-system -- --template react
   cd student-management-system
   npm install
   ```

2. **Create the folder structure:**
   ```bash
   mkdir -p src/data src/context src/hooks src/utils src/components/ui src/components/students src/components/enrollments src/components/grades src/pages
   ```

3. **Then just copy-paste** each artifact content into its corresponding file — that's all you'd need to do.

Vite already gives you `public/index.html`, `src/main.jsx`, `vite.config.js`, and `package.json` — so for those files I'll only be **replacing/updating** the generated ones, not creating from scratch.

---

**So your only manual work is:**
- Run 2 commands (scaffold + mkdir)
- Copy each artifact into the right file
- Run `npm run dev`

Want me to start generating all the files now?

## User:

> 6/22/2026 21:22:18

then next phase

## Assistant:

> 6/22/2026 21:24:10

Let's build everything out. I'll generate all 23 files now.

**package.json**

````json
{
  "name": "student-management-system",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.5"
  }
}
````

**vite.config.js**

````javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
````

**src/data/seed.js**

````javascript
export const seedData = {
  students: [
    { id: "2620001", name: "Ayesha Rahman",  email: "ayesha@uni.edu", program: "CSE", year: 2 },
    { id: "2620002", name: "Tanvir Hossain", email: "tanvir@uni.edu", program: "EEE", year: 3 },
    { id: "2620003", name: "Priya Das",      email: "priya@uni.edu",  program: "CSE", year: 1 },
  ],
  courses: [
    { id: "C101", name: "Data Structures",  credits: 3, instructor: "Dr. Karim", seats: 30 },
    { id: "C102", name: "Web Engineering",  credits: 3, instructor: "Dr. Noor",  seats: 25 },
    { id: "C103", name: "Database Systems", credits: 4, instructor: "Dr. Islam", seats: 20 },
  ],
  enrollments: [
    { id: "E001", studentId: "2620001", courseId: "C101", date: "2026-01-15" },
    { id: "E002", studentId: "2620002", courseId: "C102", date: "2026-01-16" },
  ],
  grades: [
    { id: "G001", studentId: "2620001", courseId: "C101", grade: 88, semester: "Spring 2026" },
  ],
};
````

**src/utils/localStorage.js**

````javascript
import { seedData } from "../data/seed";

export const LS_KEYS = {
  students:    "sms_students",
  courses:     "sms_courses",
  enrollments: "sms_enrollments",
  grades:      "sms_grades",
  seeded:      "sms_seeded",
};

export function lsGet(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

export function lsSet(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

export function initStorage() {
  if (!lsGet(LS_KEYS.seeded)) {
    lsSet(LS_KEYS.students,    seedData.students);
    lsSet(LS_KEYS.courses,     seedData.courses);
    lsSet(LS_KEYS.enrollments, seedData.enrollments);
    lsSet(LS_KEYS.grades,      seedData.grades);
    lsSet(LS_KEYS.seeded,      true);
  }
}
````

**src/utils/validators.js**

````javascript
/**
 * Student ID format: YYSNNNNN
 *  YY     → last 2 digits of current year (e.g. 26 for 2026)
 *  S      → shift: 1 = Morning, 2 = Day
 *  NNNN   → 4-digit zero-padded serial number
 *
 * Example: 2620001 → year=26, shift=2(Day), serial=0001
 */
export function validateStudentId(id) {
  if (!id) return "Student ID is required.";

  const trimmed = String(id).trim();

  if (!/^\d{7}$/.test(trimmed))
    return "Student ID must be exactly 7 digits.";

  const currentYY = String(new Date().getFullYear()).slice(-2); // "26"
  const idYY      = trimmed.slice(0, 2);
  const shift     = trimmed[2];
  const serial    = trimmed.slice(3);

  if (idYY !== currentYY)
    return `Admission year must be ${currentYY} (current year). Got ${idYY}.`;

  if (shift !== "1" && shift !== "2")
    return `Shift digit must be 1 (Morning) or 2 (Day). Got ${shift}.`;

  if (serial === "0000")
    return "Serial number must be between 0001 and 9999.";

  return null; // valid
}

export function validateGrade(grade) {
  const n = Number(grade);
  if (grade === "" || grade === null || grade === undefined)
    return "Grade is required.";
  if (isNaN(n))
    return "Grade must be a number.";
  if (n < 0 || n > 100)
    return "Grade must be between 0 and 100.";
  return null;
}

export function validateRequired(value, label) {
  if (!value || String(value).trim() === "")
    return `${label} is required.`;
  return null;
}

export function validateEmail(email) {
  if (!email) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Enter a valid email address.";
  return null;
}
````

**src/hooks/useUrlState.js**

````javascript
import { useState, useEffect, useCallback } from "react";

/**
 * Syncs a state object to/from URL query params.
 * Usage: const [state, setState] = useUrlState({ page: 1, search: "", sort: "name", order: "asc" });
 */
export function useUrlState(defaults) {
  const parse = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const result = { ...defaults };
    for (const key of Object.keys(defaults)) {
      const val = params.get(key);
      if (val !== null) {
        // coerce numbers
        result[key] = isNaN(val) || val === "" ? val : Number(val);
      }
    }
    return result;
  }, []); // eslint-disable-line

  const [state, setStateRaw] = useState(parse);

  const setState = useCallback((updater) => {
    setStateRaw(prev => {
      const next = typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
      const params = new URLSearchParams(window.location.search);
      for (const [k, v] of Object.entries(next)) {
        if (v !== null && v !== undefined && v !== "") {
          params.set(k, v);
        } else {
          params.delete(k);
        }
      }
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
      return next;
    });
  }, []);

  // sync on tab/back navigation
  useEffect(() => {
    const onPop = () => setStateRaw(parse());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [parse]);

  return [state, setState];
}
````

**src/context/AppContext.jsx**

````jsx
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { initStorage, lsGet, lsSet, LS_KEYS } from "../utils/localStorage";

const AppCtx = createContext(null);

export function AppProvider({ children }) {
  const [students,    setStudentsRaw]    = useState([]);
  const [courses,     setCoursesRaw]     = useState([]);
  const [enrollments, setEnrollmentsRaw] = useState([]);
  const [grades,      setGradesRaw]      = useState([]);
  const [toasts,      setToasts]         = useState([]);

  useEffect(() => {
    initStorage();
    setStudentsRaw(lsGet(LS_KEYS.students)       || []);
    setCoursesRaw(lsGet(LS_KEYS.courses)         || []);
    setEnrollmentsRaw(lsGet(LS_KEYS.enrollments) || []);
    setGradesRaw(lsGet(LS_KEYS.grades)           || []);
  }, []);

  const setStudents    = v => { setStudentsRaw(v);    lsSet(LS_KEYS.students,    v); };
  const setCourses     = v => { setCoursesRaw(v);     lsSet(LS_KEYS.courses,     v); };
  const setEnrollments = v => { setEnrollmentsRaw(v); lsSet(LS_KEYS.enrollments, v); };
  const setGrades      = v => { setGradesRaw(v);      lsSet(LS_KEYS.grades,      v); };

  const addToast = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  return (
    <AppCtx.Provider value={{
      students, setStudents,
      courses,  setCourses,
      enrollments, setEnrollments,
      grades,   setGrades,
      addToast,
    }}>
      {children}
    </AppCtx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
````

**src/components/ui/TabNav.jsx**

````jsx
const TABS = ["Students", "Enrollments", "Grades"];

export default function TabNav({ active, setActive }) {
  return (
    <div style={{ display: "flex", borderBottom: "2px solid #e5e7eb", marginBottom: 28 }}>
      {TABS.map(t => (
        <button
          key={t}
          onClick={() => setActive(t)}
          style={{
            padding: "10px 28px",
            fontWeight: 600,
            fontSize: 15,
            border: "none",
            cursor: "pointer",
            background: "none",
            borderBottom: active === t ? "2px solid #4f46e5" : "2px solid transparent",
            color: active === t ? "#4f46e5" : "#6b7280",
            marginBottom: -2,
            transition: "all .15s",
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
````

**src/components/ui/Toast.jsx**

````jsx
import { useEffect, useState } from "react";

export function ToastContainer({ toasts }) {
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24,
      zIndex: 9999, display: "flex", flexDirection: "column", gap: 8,
    }}>
      {toasts.map(t => <Toast key={t.id} toast={t} />)}
    </div>
  );
}

function Toast({ toast }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <div style={{
      padding: "10px 18px",
      borderRadius: 8,
      color: "#fff",
      fontWeight: 500,
      fontSize: 14,
      background: toast.type === "success" ? "#16a34a" : "#dc2626",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(10px)",
      transition: "opacity .2s, transform .2s",
      maxWidth: 320,
    }}>
      {toast.type === "success" ? "✅ " : "❌ "}
      {toast.msg}
    </div>
  );
}
````

**src/components/ui/Table.jsx**

````jsx
/**
 * Reusable sortable table.
 *
 * Props:
 *  columns: [{ key, label, sortable? }]
 *  data:    array of row objects
 *  sort:    { field, order }
 *  onSort:  (field) => void
 *  emptyMsg: string
 */
export default function Table({ columns, data, sort, onSort, emptyMsg = "No records found." }) {
  const arrow = (key) => {
    if (sort?.field !== key) return <span style={{ color: "#d1d5db" }}> ⇅</span>;
    return sort.order === "asc" ? " ↑" : " ↓";
  };

  return (
    <div style={{ overflowX: "auto", borderRadius: 10, border: "1px solid #e5e7eb" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => col.sortable && onSort?.(col.key)}
                style={{
                  padding: "10px 14px",
                  textAlign: "left",
                  fontWeight: 600,
                  color: "#374151",
                  cursor: col.sortable ? "pointer" : "default",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                {col.label}{col.sortable && arrow(col.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center", padding: "32px 0", color: "#9ca3af" }}>
                {emptyMsg}
              </td>
            </tr>
          ) : data.map((row, i) => (
            <tr
              key={i}
              style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 0 ? "#fff" : "#fafafa" }}
            >
              {columns.map(col => (
                <td key={col.key} style={{ padding: "10px 14px", color: "#374151" }}>
                  {row[col.key] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
````

**src/components/ui/Pagination.jsx**

````jsx
export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, marginTop: 12 }}>
      <PageBtn disabled={page <= 1} onClick={() => onPageChange(page - 1)}>‹ Prev</PageBtn>
      {pages.map(p => (
        <PageBtn key={p} active={p === page} onClick={() => onPageChange(p)}>{p}</PageBtn>
      ))}
      <PageBtn disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>Next ›</PageBtn>
    </div>
  );
}

function PageBtn({ children, onClick, disabled, active }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "5px 11px",
        borderRadius: 6,
        border: "1px solid #e5e7eb",
        background: active ? "#4f46e5" : disabled ? "#f9fafb" : "#fff",
        color: active ? "#fff" : disabled ? "#d1d5db" : "#374151",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: active ? 700 : 400,
        fontSize: 13,
      }}
    >
      {children}
    </button>
  );
}
````

**src/components/ui/Modal.jsx**

````jsx
import { useEffect } from "react";

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 12, padding: "28px 32px",
          width: "100%", maxWidth: 520, boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          maxHeight: "90vh", overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#111827" }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6b7280" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
````

**src/components/students/StudentForm.jsx**

````jsx
import { useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";
import { validateStudentId, validateEmail, validateRequired } from "../../utils/validators";

const PROGRAMS = ["CSE", "EEE", "BBA", "ME", "CE", "PHY", "MATH"];
const YEARS    = [1, 2, 3, 4];

export default function StudentForm({ onClose }) {
  const { students, setStudents, addToast } = useApp();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // duplicate ID check
    if (students.find(s => s.id === data.id.trim())) {
      addToast("Student ID already exists.", "error");
      return;
    }
    // duplicate email check
    if (students.find(s => s.email.toLowerCase() === data.email.trim().toLowerCase())) {
      addToast("Email already registered.", "error");
      return;
    }

    const newStudent = {
      id:      data.id.trim(),
      name:    data.name.trim(),
      email:   data.email.trim(),
      program: data.program,
      year:    Number(data.year),
    };

    setStudents([...students, newStudent]);
    addToast(`Student "${newStudent.name}" registered successfully.`);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label="Student ID" error={errors.id?.message}>
        <input
          {...register("id", {
            validate: v => validateStudentId(v) ?? true,
          })}
          placeholder="e.g. 2620009"
          style={inputStyle}
        />
      </Field>

      <Field label="Full Name" error={errors.name?.message}>
        <input
          {...register("name", { validate: v => validateRequired(v, "Name") ?? true })}
          placeholder="e.g. Ayesha Rahman"
          style={inputStyle}
        />
      </Field>

      <Field label="Email" error={errors.email?.message}>
        <input
          type="email"
          {...register("email", { validate: v => validateEmail(v) ?? true })}
          placeholder="e.g. ayesha@uni.edu"
          style={inputStyle}
        />
      </Field>

      <Field label="Program" error={errors.program?.message}>
        <select
          {...register("program", { validate: v => validateRequired(v, "Program") ?? true })}
          style={inputStyle}
        >
          <option value="">Select program</option>
          {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </Field>

      <Field label="Academic Year" error={errors.year?.message}>
        <select
          {...register("year", { validate: v => validateRequired(v, "Academic Year") ?? true })}
          style={inputStyle}
        >
          <option value="">Select year</option>
          {YEARS.map(y => <option key={y} value={y}>Year {y}</option>)}
        </select>
      </Field>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24 }}>
        <button type="button" onClick={onClose} style={btnSecondary}>Cancel</button>
        <button type="submit" style={btnPrimary}>Register Student</button>
      </div>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 5 }}>
        {label}
      </label>
      {children}
      {error && <p style={{ margin: "4px 0 0", fontSize: 12, color: "#dc2626" }}>{error}</p>}
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "8px 11px", borderRadius: 7,
  border: "1px solid #d1d5db", fontSize: 14, boxSizing: "border-box",
  outline: "none",
};

const btnPrimary = {
  padding: "9px 22px", borderRadius: 7, border: "none",
  background: "#4f46e5", color: "#fff", fontWeight: 600,
  fontSize: 14, cursor: "pointer",
};

const btnSecondary = {
  padding: "9px 22px", borderRadius: 7,
  border: "1px solid #d1d5db", background: "#fff",
  color: "#374151", fontWeight: 600, fontSize: 14, cursor: "pointer",
};
````

Powered by Claude Exporter (https://www.ai-chat-exporter.net)
