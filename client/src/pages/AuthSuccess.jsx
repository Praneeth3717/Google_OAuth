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

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/profile", { replace: true });  // Use replace to avoid back-button issues
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate, params]);

  return <p>Logging you in...</p>;
}

