
export function StatusBadge({ status, labels = {} }) {
  const config = labels[status] ?? {
    text: status || "غير محددة",
    style: {
      background: "var(--surface-alt)",
      color: "var(--muted)",
    },
  };

  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
      style={
        config.style ?? {
          background: "var(--surface-alt)",
          color: "var(--muted)",
        }
      }
    >
      {config.text}
    </span>
  );
}

export function Card({ children, className = "" }) {
  return (
    <div
      className={`border rounded-xl shadow-sm ${className}`}
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
    >
      {children}
    </div>
  );
}

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1
          className="text-xl font-bold"
          style={{ color: "var(--text)" }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="text-sm mt-1"
            style={{ color: "var(--muted)" }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function EmptyState({ message }) {
  return (
    <div
      className="text-center py-12 text-sm"
      style={{ color: "var(--muted)" }}
    >
      {message}
    </div>
  );
}
