import "./App.css";

import { Card, Paper } from "@mui/material";

import Header from "./Components/Header";
import Body from "./Components/Body";

function App() {
  return (
    <Card className="App">
      <Header />

      <Body />
    </Card>
  );
}

export default App;
