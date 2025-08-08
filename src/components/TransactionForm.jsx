import { useState } from "react";

const CATEGORIES = [
  "Comida",
  "Transporte",
  "Entretenimiento",
  "Salud",
  "Ahorro",
  "Salario",
  "Otros"
];

export default function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;
    onAdd({
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString()
    });
    setDescription("");
    setAmount("");
    setCategory(CATEGORIES[0]);
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Agregar Transacción</h2>
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="input-wide"
      />
      <input
        type="number"
        placeholder="Monto (+ ingreso, - egreso)"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="input-wide"
      />
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="input-wide"
      >
        {CATEGORIES.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button className="btn-wide" type="submit">Agregar</button>
    </form>
  );
}
