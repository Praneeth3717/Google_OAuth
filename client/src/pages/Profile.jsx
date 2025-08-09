import {jwtDecode} from "jwt-decode";

export default function Profile() {
  const token = localStorage.getItem("token");

  if (!token) return <p>Not logged in</p>;

  const decoded = jwtDecode(token); // { userId, name, iat, exp }

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome, {decoded.name} 👋</h1>
      <p>User ID: {decoded.userId}</p>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}
