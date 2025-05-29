import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import EmployeeList from "./view/EmployeeList";
import EmployeeAdd from "./view/EmployeeAdd";
import EmployeeEdit from "./view/EmployeeEdit";
function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bgdark">
          <a
            className="navbar-brand text-danger"
            href="https://www.estgv.ipv.pt/"
          >
            {" "}
            www.estgv.ipv.pt{" "}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            datatoggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-
            expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Link className="btn btn-success " to="/employee/add">
              Add Employee
            </Link>
          </div>
        </nav>
        <div className="container py-4">
          <div className="row">
            <Routes>
              <Route path="/" element={<EmployeeList />} />
              <Route path="/employee/add" element={<EmployeeAdd />} />
              <Route
                path="/employee/edit/:employeeId"
                element={<EmployeeEdit />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;
