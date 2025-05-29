import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const urlAPI = "https://backend-ex-0yg7.onrender.com/employee/list";
const EmployeeList = () => {
  const [dataEmployee, setdataEmployee] = useState([]);
  useEffect(() => {
    LoadEmployee();
  }, []);
  function LoadEmployee() {
    const url = "https://backend-ex-0yg7.onrender.com/employee/list";
    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setdataEmployee(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }
  
  
  function OnDelete(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You will not be able to recover this imaginary file!",
    type: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, keep it",
  }).then((result) => {
    if (result.value) {
      SendDelete(id);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
    }
  });
}
function SendDelete(userId) {
  // url do backend
  const baseUrl = "https://backend-ex-0yg7.onrender.com/employee/delete";
  // network
  axios
    .post(baseUrl, {
      id: userId,
    })
    .then((response) => {
      if (response.data.success) {
        Swal.fire("Deleted!", "Your employee has been deleted.", "success");
        LoadEmployee();
      }
    })
    .catch((error) => {
      alert("Error 325 ");
    });
}


  return (
    <table className="table table-hover table-striped">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Role</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Address</th>
          <th scope="col">Phone</th>
          <th colSpan="2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>1</th>
          <td>Admin</td>
          <td>Nuno Costa</td>
          <td>ncosta@estgv.ipv.pt</td>
          <td>Viseu</td>
          <td>232480533</td>
          <td>
            <button className="btn btn-outline-info "> Edit </button>
          </td>
          <td>
            <button className="btn btn-outline-danger "> Delete </button>
          </td>
        </tr>
        <LoadFillData />
      </tbody>
    </table>
  );
  function LoadFillData() {
    return dataEmployee.map((data, index) => {
      return (
        <tr key={index}>
          <th>{data.id}</th>
          <td>{data.role.role}</td>
          <td>{data.name}</td>
          <td>{data.email}</td>
          <td>{data.address}</td>
          <td>{data.phone}</td>
          <td>
            <Link class="btn btn-outline-info " to={"employee/edit/" + data.id}>
              Edit
            </Link>
          </td>
          <td>
            <button
              className="btn btn-outlinedanger"
              onClick={() => OnDelete(data.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }
};

export default EmployeeList;
