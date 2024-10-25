import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/Auth.page";
import HomePage from "./pages/Home.page";
import useAxios from "./hooks/useAxios.hook";
import NotFoundPage from "./pages/NotFound.page";
import useApp from "./hooks/useApp.hook";
import Header from "./components/application/Header";

function App() {
  const [appLoad, setAppLoad] = useState<boolean>(true);
  const { user, api, setUser, setApi } = useApp();
  const { res } = useAxios("/api/");

  useEffect(() => {
    if (res) {
      if (!user) setUser(res.data.user);
      if (!api) setApi(res.data.api);
      setTimeout(() => {
        setAppLoad(false);
      }, 3000);
    }
  }, [res]);

  return (
    <div className="h-screen">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage appLoad={appLoad} />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
