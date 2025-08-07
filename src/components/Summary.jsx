
import React from "react";

export default function Summary({ transactions }) {
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income + expenses;

  return (
    <div>
      <h2>Resumen</h2>
      <p>Ingresos: ${income.toFixed(2)}</p>
      <p>Egresos: ${Math.abs(expenses).toFixed(2)}</p>
      <p><strong>Balance: ${balance.toFixed(2)}</strong></p>
    </div>
  );
}
