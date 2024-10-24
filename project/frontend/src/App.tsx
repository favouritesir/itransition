import { useEffect, useState } from "react";
import LoginPage from "./pages/login.page";

function App() {
  const [theme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="App" data-theme="dark">
      <LoginPage></LoginPage>
    </div>
  );
}

export default App;
