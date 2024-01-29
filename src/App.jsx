import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Deptlisting from "./pages/Deptlisting";
import Mainpage from "./pages/Mainpage";
import Layout from "./components/common/Layout";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Workshop from "./pages/Workshop";
import Competition from "./pages/Competition";
import Report from "./pages/Report";
import Support from "./pages/Support";
import About from "./pages/About";

function App() {
  const listing = [
    {
      id: 1,
      name: "CSE",
    },
    {
      id: 2,
      name: "IT",
    },
    {
      id: 3,
      name: "ECE",
    },
    {
      id: 4,
      name: "EEE",
    },
    {
      id: 5,
      name: "AERO",
    },
    {
      id: 6,
      name: "EIE",
    },
    {
      id: 7,
      name: "R&A",
    },
    {
      id: 8,
      name: "BIOMED",
    },
    {
      id: 9,
      name: "AIDS",
    },
    {
      id: 10,
      name: "MECH",
    },
    {
      id: 11,
      name: "CIVIL",
    },
  ];
  return (
    <>
      {
        <Router>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="Layout" element={<Layout />}>
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="Events" element={<Events />} />
              <Route path="Workshop" element={<Workshop />} />
              <Route path="competition" element={<Competition />} />
              <Route path="report" element={<Report />} />
              <Route path="support" element={<Support />} />
              <Route path="about" element={<About />} />
            </Route>
          </Routes>
        </Router>
      }
    </>
  );
}

export default App;
