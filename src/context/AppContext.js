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