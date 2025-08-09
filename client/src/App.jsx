// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import AuthSuccess from "./pages/AuthSuccess";
// import Profile from "./pages/Profile";

// export default function App() {
//   const token = localStorage.getItem("token");

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* If token exists, go straight to /profile */}
//         <Route path="/" element={token ? <Navigate to="/profile" /> : <Home />} />
//         <Route path="/auth-success" element={<AuthSuccess />} />
//         <Route path="/profile" element={token ? <Profile /> : <Navigate to="/" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AuthSuccess from "./pages/AuthSuccess";
import Profile from "./pages/Profile";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/profile" /> : <Home />} />
        <Route path="/auth-success" element={<AuthSuccess setToken={setToken} />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}


