import React from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import { ThemeProvider   } from "./Context/Context"

const App = () => (
  <ThemeProvider>
    <Dashboard />
    </ThemeProvider>
);

export default App;
