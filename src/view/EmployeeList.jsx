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
    axios
      .get(urlAPI)
      .then((res) => {
        if (res.data.success) {
          setdataEmployee(res.data.data);
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
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        SendDelete(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  }

  function SendDelete(userId) {
    axios
      .post("https://backend-ex-0yg7.onrender.com/employee/delete", { id: userId })
      .then((response) => {
        if (response.data.success) {
          Swal.fire("Deleted!", "Your employee has been deleted.", "success");
          LoadEmployee();
        }
      })
      .catch(() => {
        alert("Error 325 ");
      });
  }

  return (
    <table className="table table-hover table-striped">
      <thead className="thead-dark">
        <tr>
          <th>#</th>
          <th>Role</th>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
          <th colSpan="2">Action</th>
        </tr>
      </thead>
      <tbody>
        {dataEmployee.map((data, index) => (
          <tr key={index}>
            <th>{data.id}</th>
            <td>{data.role.role}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.address}</td>
            <td>{data.phone}</td>
            <td>
              <Link className="btn btn-outline-info" to={"employee/edit/" + data.id}>
                Edit
              </Link>
            </td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => OnDelete(data.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
