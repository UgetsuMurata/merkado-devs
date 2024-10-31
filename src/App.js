import { BrowserRouter, Route, Routes } from "react-router-dom";
import Bugs from "./webpage/bugs";
import VersionControl from "./webpage/versionControl";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Bugs/>} />
            <Route path="/index.html" element={<Bugs/>} />
            <Route path="/version-control" element={<VersionControl/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
