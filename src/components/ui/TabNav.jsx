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