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

export default function AuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setLoading(false);
      navigate("/profile", { replace: true });
    } else {
      // Token not yet available, keep showing Loading or handle missing token scenario
      setLoading(true);
    }
  }, [params, navigate]);

  return <p>{loading ? "Loading..." : null}</p>;
}

