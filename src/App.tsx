import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/Header";
import Consent from "./pages/Consent";
import Agree from "./pages/Agree";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agree" element={<Agree />} />
          <Route path="/consent" element={<Consent />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
