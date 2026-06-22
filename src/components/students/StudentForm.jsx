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