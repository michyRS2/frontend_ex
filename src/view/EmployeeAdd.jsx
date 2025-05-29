import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
const EmployeeAdd = () => {
  const [dataEmployee, setdataEmployee] = useState("");
  const [campName, setcampName] = useState("");
  const [campEmail, setcampEmail] = useState("");
  const [campPhone, setcampPhone] = useState("");
  const [campAddress, setcampAddress] = useState("");
  const [stringRole, setstringRole] = useState("");
  const [selectRole, setselectRole] = useState("");
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate(); // hook para navegação

  useEffect(() => {
    axios
      .get("https://backend-ex-0yg7.onrender.com/roles/list")
      .then((response) => {
        if (response.data.success) {
          setRoles(response.data.data);
        } else {
          alert("Erro ao buscar roles");
        }
      })
      .catch((error) => {
        alert("Erro ao buscar roles: " + error);
      });
  }, []);

  return (
    <div>
      <div className="form-group row mb-3">
        <label htmlFor="name" className="col-sm-2 col-md-1 col-formlabel">
          Name
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={campName}
            onChange={(value) => setcampName(value.target.value)}
          />
        </div>
      </div>
      <div className="form-group row mb-3">
        <label htmlFor="email" className="col-sm-2 col-md-1 col-formlabel">
          Email
        </label>
        <div className="col-sm-10">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={campEmail}
            onChange={(value) => setcampEmail(value.target.value)}
          />
        </div>
      </div>
      <div className="form-group row mb-3">
        <label htmlFor="role" className="col-sm-2 col-md-1 col-formlabel">
          Role
        </label>
        <div className="col-sm-10">
          {/*<select
            id="inputState"
            className="form-control"
            onChange={(value) => setselectRole(value.target.value)}
          >
            <option defaultValue>Choose...</option>
            <option value="1">Admin...</option>
            <option value="2">Project Manager</option>
            <option value="3">Programer</option>
          </select>*/}
          <select
            id="inputState"
            className="form-control"
            onChange={(value) => setselectRole(value.target.value)}
          >
            <option defaultValue="">Escolher...</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.role}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group row mb-3">
        <label htmlFor="phone" className="col-sm-2 col-md-1 col-formlabel">
          Phone
        </label>
        <div className="col-sm-6">
          <input
            type="number"
            className="form-control"
            placeholder="Phone"
            value={campPhone}
            onChange={(value) => setcampPhone(value.target.value)}
          />
        </div>
      </div>
      <div className="form-group row mb-3">
        <label htmlFor="address" className="col-sm-2 col-md-1 colform-label">
          Address
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            value={campAddress}
            onChange={(value) => setcampAddress(value.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => SendSave(e)}
      >
        Save
      </button>
    </div>
  );
  function SendSave(e) {
    e.preventDefault();
    const baseUrl = "https://backend-ex-0yg7.onrender.com/employee/create";
    const datapost = {
      name: campName,
      email: campEmail,
      phone: campPhone,
      address: campAddress,
      role: selectRole,
    };
    axios
      .post(baseUrl, datapost)
      .then((response) => {
        if (response.data.success === true) {
          alert(response.data.message);
          navigate("/"); //apos confirmar mensagem navega para a rota principal
        } else {
          alert("Erro ao registar: " + response.data.message);
        }
      })
      .catch((error) => {
        alert("Error 34 " + error);
      });
  }
};
export default EmployeeAdd;
