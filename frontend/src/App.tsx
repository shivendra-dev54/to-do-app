import { Route, Routes } from "react-router"
import { Homepage } from "./Pages/Homepage"
import { SigninPage } from "./Pages/signInPage";
import { SignupPage } from "./Pages/signUpPage";
import { MainPage } from "./Pages/Mainpage";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./utils/protectRoute";


function App() {

  return (
    <div>

      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/app" element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        } />

      </Routes>
    </div>
  );
}

export default App;
