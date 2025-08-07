
export default function TransactionList({ transactions, onDelete }) {
  return (
    <div>
      <h2>Transacciones</h2>
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>
            {tx.description}: ${tx.amount}
            <button onClick={() => onDelete(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
