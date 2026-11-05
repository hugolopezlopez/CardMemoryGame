import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./App.css";
import LevelSelector from "./routes/LevelSelector/LevelSelector";
import PlayScreen from "./routes/PlayScreen/PlayScreen";
import { setColumns, setRows } from "./store/actions";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = (route, params) => {
    navigate(route, params);
  };

  const setRowsAndColumns = (rows, columns) => {
    dispatch(setRows(rows));
    dispatch(setColumns(columns));
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <LevelSelector
            handleNavigation={handleNavigation}
            setRowsAndColumns={setRowsAndColumns}
          />
        }
      />
      <Route
        path="/PlayScreen"
        exact
        element={<PlayScreen handleNavigation={handleNavigation} />}
      />
    </Routes>
  );
}

export default App;
