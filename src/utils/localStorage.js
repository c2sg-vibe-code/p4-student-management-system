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