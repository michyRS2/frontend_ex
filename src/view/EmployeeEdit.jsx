import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

const baseUrl = "http://localhost:3000";

const EmployeeEdit = () => {
  const [dataEmployee, setdataEmployee] = useState("");
  const [campName, setcampName] = useState("");
  const [campEmail, setcampEmail] = useState("");
  const [campPhone, setcampPhone] = useState("");
  const [campAddress, setcampAddress] = useState("");
  const [stringRole, setstringRole] = useState("");
  const [selectRole, setselectRole] = useState("");
  const { employeeId } = useParams();
  const navigate = useNavigate(); // hook para navegação

  //console.log(employeeId);
  useEffect(() => {
    const url = baseUrl + "/employee/get/" + employeeId;
    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data[0];
          setdataEmployee(data);
          setcampName(data.name);
          setcampEmail(data.email);
          setcampPhone(data.phone);
          setcampAddress(data.address);
          setstringRole(data.role.role);
          setselectRole(data.roleId);
          console.log(JSON.stringify(data.role.role));
        } else {
          alert("Error web service");
        }
      })
      .catch((error) => {
        alert("Error server: " + error);
      });
  }, []);
  return (
    <div>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label htmlFor="inputPassword4">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={campName}
            onChange={(value) => setcampName(value.target.value)}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={campEmail}
            onChange={(value) => setcampEmail(value.target.value)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputState">Role</label>
          <select
            id="inputState"
            className="form-control"
            onChange={(value) => setselectRole(value.target.value)}
          >
            <option value={selectRole}>{stringRole}</option>
            <option value="1">Admin</option>
            <option value="2">Project Manager</option>
            <option value="3">Programer</option>
          </select>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Phone</label>
          <input
            type="number"
            className="form-control"
            placeholder="Phone"
            value={campPhone}
            onChange={(value) => setcampPhone(value.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inputAddress">Address</label>
        <input
          type="text"
          className="form-control"
          id="inputAddress"
          placeholder="1234 Main St"
          value={campAddress}
          onChange={(value) => setcampAddress(value.target.value)}
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        onClick={() => SendUpdate()}
      >
        Update
      </button>
    </div>
  );

  function SendUpdate() {
    // url de backend
    const url = baseUrl + "/employee/update/" + employeeId;
    const datapost = {
      name: campName,
      email: campEmail,
      phone: campPhone,
      address: campAddress,
      role: selectRole,
    };
    axios
      .post(url, datapost)
      .then((response) => {
        if (response.data.success === true) {
          alert(response.data.message);
          navigate('/');//apos confirmar mensagem navega para a rota principal

        } else {
          alert("Error");
        }
      })
      .catch((error) => {
        alert("Error 34 " + error);
      });
  }
};
export default EmployeeEdit;
