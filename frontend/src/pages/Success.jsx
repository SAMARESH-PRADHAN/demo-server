import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <h1>🎉 Login Successful</h1>
      <p>Welcome to the application</p>

      <button className="danger" onClick={() => navigate("/")}>
        Logout
      </button>
    </div>
  );
}
