export default function Home() {
  const handleLogin = () => {
    window.location.href = "https://google-oauth-tiok.onrender.com/auth/google";
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Google OAuth Demo</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}
