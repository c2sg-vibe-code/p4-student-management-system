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