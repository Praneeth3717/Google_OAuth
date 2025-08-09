import jwtDecode from "jwt-decode";

export default function Profile() {
  console.log("arrived to profile page")
  const token = localStorage.getItem("token");
  console.log("fetching token")
  if (!token) return <p>Not logged in</p>;
  console.log("got the token")
  const decoded = jwtDecode(token); // { userId, name, iat, exp }
console.log("decoding the token")
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
