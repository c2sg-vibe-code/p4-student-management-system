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