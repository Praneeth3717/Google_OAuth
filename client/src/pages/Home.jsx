export default function Home() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Google OAuth Demo</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}
