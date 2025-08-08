import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
export default function LoginRegister({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    fetch(`${API_URL}/api/user/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Error");
        }
        return res.json();
      })
      .then(() => {
        onLogin(username); 
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  return (
    <div className="login-bg-center">
      <div className="login-box">
        <img
          src="https://pngimg.com/uploads/hello_kitty/hello_kitty_PNG12.png"
          alt="Hello Kitty"
          className="hello-avatar"
        />
        <h2>
          {mode === "login" ? "Iniciar Sesión" : "Registrar Usuario"}
        </h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
          />
          <button type="submit">
            {mode === "login" ? "Entrar" : "Registrar"}
          </button>
        </form>
        <button
          className="mode-toggle"
          type="button"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login"
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}
