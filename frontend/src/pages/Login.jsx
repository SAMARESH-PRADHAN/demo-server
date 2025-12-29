import { useState } from "react";
import { loginApi, signupApi } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [mode, setMode] = useState("home"); // home | login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    if (!email || !password) return alert("All fields required");

    const res =
      mode === "login"
        ? await loginApi({ email, password })
        : await signupApi({ email, password });

    if (res.message?.includes("successful")) {
      if (mode === "login") {
        // ✅ SAVE USER
        localStorage.setItem("user", JSON.stringify(res.data));

        navigate("/success");
      } else {
        alert("Signup successful, now login");
        setMode("login");
      }
    } else {
      alert(res.message || "Error");
    }
  };

  return (
    <div className="auth-container">
      {mode === "home" && (
        <>
          <h1>Welcome</h1>
          <p>Please login or signup</p>
          <button onClick={() => setMode("login")}>Login</button>
          <button className="secondary" onClick={() => setMode("signup")}>
            Signup
          </button>
        </>
      )}

      {mode !== "home" && (
        <>
          <h2>{mode === "login" ? "Login" : "Signup"}</h2>

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={submit}>
            {mode === "login" ? "Login" : "Signup"}
          </button>

          <p className="link" onClick={() => setMode("home")}>
            ← Back
          </p>
        </>
      )}
    </div>
  );
}
