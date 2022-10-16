import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Output from "./components/Output";

function App() {
  return (
    <div className="App">
      <SearchBar placeholder="Enter a Product..." />
      <Output></Output>
    </div>
  );
}

export default App;
