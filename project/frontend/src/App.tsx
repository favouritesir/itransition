import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/Auth.page";
import HomePage from "./pages/Home.page";
import NotFoundPage from "./pages/NotFound.page";
import LandingPage from "./pages/Landing.page";
import UILang from "./components/application/UILang";

function App() {
  return (
    <div className="h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/documents" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      {import.meta.env.DEV && <UILang />}
    </div>
  );
}

export default App;
