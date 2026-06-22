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