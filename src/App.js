import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import store from "./store/store";
import "./App.css";
import LevelSelector from "./routes/LevelSelector/LevelSelector";
import PlayScreen from "./routes/PlayScreen/PlayScreen";

function App() {
  const navigate = useNavigate();

  const handleNavigation = (route, params) => {
    navigate(route, params);
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<LevelSelector handleNavigation={handleNavigation} />}
      />
      <Route
        path="/PlayScreen"
        exact
        element={<PlayScreen handleNavigation={handleNavigation} />}
        store={store}
      />
    </Routes>
  );
}

export default App;
