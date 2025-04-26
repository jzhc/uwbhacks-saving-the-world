
import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import SignIn from "../components/SignIn";
// import BillsDashboard from "../components/BillsDashboard"; // your protected area

function Auth() {
  return (
    <AuthProvider>
      <SignIn />
      {/* <BillsDashboard /> */}
    </AuthProvider>
  );
}

export default Auth;