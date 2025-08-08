import { formatCurrency } from "../utils/formatCurrency";

export default function Summary({ transactions = [] }) {
  // Totales generales
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income + expenses;

  // Agrupa totales por categoría
  const categoryTotals = {};
  transactions.forEach((t) => {
    if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
    categoryTotals[t.category] += t.amount;
  });

  // Ordena categorías por el total absoluto más alto (opcional)
  const sortedCategories = Object.entries(categoryTotals).sort(
    (a, b) => Math.abs(b[1]) - Math.abs(a[1])
  );

  return (
    <div className="summary-container">
      <h2>Resumen</h2>
      <div className="summary-box">
        <p>
          <strong>Ingresos:</strong> {formatCurrency(income)}
        </p>
        <p>
          <strong>Egresos:</strong> {formatCurrency(Math.abs(expenses))}
        </p>
        <p>
          <strong>Balance:</strong> {formatCurrency(balance)}
        </p>
        <hr style={{margin: "12px 0"}} />
        <h3 style={{marginBottom: 6}}>Por Categoría:</h3>
        <ul style={{ paddingLeft: 16, margin: 0 }}>
          {sortedCategories.map(([cat, total]) => (
            <li key={cat} style={{ color: total < 0 ? "#fd618e" : "#77c680" }}>
              <strong>{cat}:</strong> {formatCurrency(total)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
