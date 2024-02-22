import React from "react";
import StarWarsCharacters from "./component/StarWarsCharacters";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CharacterDetailsPage from "./component/CharacterDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StarWarsCharacters />} />
        <Route path="/characters/:id" element={<CharacterDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
