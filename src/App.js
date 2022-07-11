import "./App.css";

import NoteApp from "./components/NoteApp/NoteApp";
import Read from "./components/Read/Read";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NoteApp />} />
        <Route path="/:id" element={<Read />} />
      </Routes>
    </div>
  );
}

export default App;
