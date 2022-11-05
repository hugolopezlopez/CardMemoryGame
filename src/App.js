import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import LevelSelector from "./routes/LevelSelector/LevelSelector";
import PlayScreen from "./routes/PlayScreen/PlayScreen";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LevelSelector />} />
          <Route path="/PlayScreen/:rows/:columns" element={<PlayScreen />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
