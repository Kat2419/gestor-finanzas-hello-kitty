import { formatCurrency } from "../utils/formatCurrency";


export default function TransactionList({ transactions = [], onDelete }) {
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  const ingresos = safeTransactions.filter((tx) => tx.amount > 0);
  const egresos = safeTransactions.filter((tx) => tx.amount < 0);

  // Formatea fecha bonita 
  function formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "2-digit" });
  }

  function CategoryBadge({ category }) {
    return (
      <span className="tx-cat">
        {category}
      </span>
    );
  }

  // Reutilizable para ingresos/egresos
  function TransactionGroup({ title, items, tipo }) {
    return (
      <div className="section">
        <h3 className={`section-title ${tipo}`}>{title}</h3>
        <ul className="tx-list">
          {items.length === 0 && (
            <li className="tx-empty">No hay {tipo === "ingreso" ? "ingresos" : "egresos"} registrados.</li>
          )}
          {items.map((tx, idx) => {
            const realIndex = safeTransactions.findIndex(
              (t) =>
                t.description === tx.description &&
                t.amount === tx.amount &&
                t.category === tx.category &&
                t.date === tx.date
            );
            return (
              <li key={tx._id || realIndex + "-" + tx.description} className={`transaction-item ${tipo}`}>
                <div className="tx-main">
                  <div className="tx-desc">{tx.description}</div>
                  <div className="tx-sub">
                    {tx.category && <CategoryBadge category={tx.category} />}
                    <span className="tx-date">{formatDate(tx.date)}</span>
                  </div>
                </div>
                <div className="tx-right">
                  <div className="tx-amount">{formatCurrency(tx.amount)}</div>
                  <button className="tx-delete-btn" onClick={() => onDelete(realIndex)}>
                    Eliminar
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <h2>Transacciones</h2>
      <TransactionGroup title="Ingresos" items={ingresos} tipo="ingreso" />
      <TransactionGroup title="Egresos" items={egresos} tipo="egreso" />
    </div>
  );
}
