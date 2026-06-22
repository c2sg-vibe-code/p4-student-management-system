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