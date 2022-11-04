import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import LevelSelector from "./component/LevelSelector/LevelSelector";
import PlayScreen from "./component/PlayScreen/PlayScreen";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LevelSelector />} />
          <Route path="/PlayScreen" element={<PlayScreen />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
