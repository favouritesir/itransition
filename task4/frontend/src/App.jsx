import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => 
  {
    axios.get(process.env.REACT_APP_API).then((res) => 
    {
      if (res.data.status === 'success') navigate('/', {state: res.data ||{} });
      else navigate('/' + res.data.status);
    });

  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      {/* <Route path="/blocked" element={<Blocked />} /> */}
    </Routes>
  );
}

export default App;
