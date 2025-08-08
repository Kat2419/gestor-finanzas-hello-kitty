import React, { useMemo } from "react";

// Función para agrupar transacciones por mes y año
function groupByMonth(transactions) {
  return transactions.reduce((acc, tx) => {
    const date = new Date(tx.date);
    // Mes en español (ej: "julio")
    const month = date.toLocaleString("es-CO", { month: "long" });
    const year = date.getFullYear();
    const key = `${month} ${year}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(tx);
    return acc;
  }, {});
}

export default function TransactionsByMonth({ transactions = [] }) {
  // Agrupa solo cuando cambian las transacciones
  const grouped = useMemo(() => groupByMonth(transactions), [transactions]);

  return (
    <div className="transactions-by-month">
      <h2>Gastos por mes</h2>
      {Object.entries(grouped).map(([month, txs]) => (
        <div key={month} className="month-group">
          <h3 style={{ color: "#ff3997" }}>
            {month.charAt(0).toUpperCase() + month.slice(1)}
          </h3>
          <ul>
            {txs
              .filter(tx => tx.amount < 0)
              .map(tx => (
                <li key={tx._id || tx.description + tx.amount + tx.date}>
                  {tx.description} — ${Math.abs(tx.amount).toLocaleString("es-CO")}
                </li>
              ))}
          </ul>
          <strong>
            Total egresos: $
            {Math.abs(
              txs.filter(tx => tx.amount < 0).reduce((sum, tx) => sum + tx.amount, 0)
            ).toLocaleString("es-CO")}
          </strong>
        </div>
      ))}
    </div>
  );
}
