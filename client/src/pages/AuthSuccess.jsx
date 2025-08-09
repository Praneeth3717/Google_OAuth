// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// export default function AuthSuccess() {
//   const [params] = useSearchParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = params.get("token");
//     if (token) {
//       localStorage.setItem("token", token);
//       navigate("/profile"); // Go to profile
//     }
//   }, []);

//   return <p>Logging you in...</p>;
// }

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthSuccess({ setToken }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false); // track if we checked token

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setToken(token);
      navigate("/profile", { replace: true });
    } else if (token === null) {
      // token param is missing (not yet available or truly absent)
      // Only redirect to "/" if we know no token param present
      navigate("/", { replace: true });
    }

    setChecked(true); // mark that we handled token check
  }, [navigate, params, setToken]);

  // Optionally, show a loading state until token param processed
  if (!checked) return <p>Checking login...</p>;

  return null; // or a spinner, since we redirect anyway
}

