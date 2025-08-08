import { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
import TransactionsByMonth from "./components/TransactionsByMonth";
import LoginRegister from "./components/LoginRegister"; // <-- Nuevo import
import "./App.css";
const API_URL = import.meta.env.VITE_API_URL;
export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [username, setUsername] = useState(() => localStorage.getItem("username") || "");

  useEffect(() => {
    if (!username) return;
    fetch(`${API_URL}/api/transactions?user=${username}`)
      .then(res => res.json())
      .then(data => setTransactions(data));
  }, [username]);

  useEffect(() => {
    if (username) localStorage.setItem("username", username);
    else localStorage.removeItem("username");
  }, [username]);

  function handleAdd(tx) {
    console.log ("agregado")
    fetch(`${API_URL}/api/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...tx, user: username }),
    })
      .then(res => res.json())
      .then(newTx => setTransactions(prev => [...prev, newTx]));
  }

  function handleDelete(index) {
    const tx = transactions[index];
    if (!tx._id) return alert("No se puede borrar, falta ID");
    fetch(`${API_URL}/api/transactions/${tx._id}`, {
      method: "DELETE",
    }).then(() => {
      setTransactions(transactions.filter((_, i) => i !== index));
    });
  }

  // Si no está logueado, muestra login/registro
  if (!username) {
    return <LoginRegister onLogin={setUsername} />;
  }

  return (
    <div className="dashboard-3col">
      {/* Columna 1: Perfil */}
      <aside className="col profile">
        <img
          src="https://pngimg.com/uploads/hello_kitty/hello_kitty_PNG12.png"
          alt="Hello Kitty"
          className="kitty-avatar"
        />
        <div
          className="username-input"
          style={{
            fontFamily: "'Quicksand', Arial, sans-serif",
            fontWeight: "bold",
            color: "#ff3997",
            fontSize: "1.25em",
            textAlign: "center",
            margin: "0.5em 0",
            border: "2px solid #ffb6df",
            borderRadius: "18px",
            padding: "4px 10px",
            background: "#fff7fa",
            outline: "none",
            boxShadow: "0 1px 8px #ffe2f5"
          }}
        >
          {username}
        </div>
        <button onClick={() => setUsername("")} style={{
          marginTop: "8px", background: "#ff3997", color: "#fff", border: "none", borderRadius: "12px", padding: "4px 14px", cursor: "pointer"
        }}>Cerrar sesión</button>
        <p style={{ color: "#e55797", textAlign: "center" }}>
          Bienvenido a tu gestor <br /><span style={{ fontSize: "1.7em" }}>🎀</span>
        </p>
      </aside>
     
      <main className="col main">
        <section className="add-section">
          <TransactionForm onAdd={handleAdd} />
        </section>
        <section className="list-section">
          <TransactionList transactions={transactions} onDelete={handleDelete} />
        </section>
        <section className="month-section">
          <TransactionsByMonth transactions={transactions} />
        </section>
      </main>
      <aside className="col summary">
        <Summary transactions={transactions} />
      </aside>
    </div>
  );
}
