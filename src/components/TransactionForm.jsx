import { useState } from "react";

export default function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;
    onAdd({ description, amount: parseFloat(amount) });
    setDescription("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Transacción</h2>
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Monto (+ ingreso, - egreso)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}
