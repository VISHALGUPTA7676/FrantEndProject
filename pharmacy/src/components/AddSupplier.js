import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Components_css/Supplier.css"
import './LoginForm.css'; // Import the CSS file
import axios from 'axios'
import { Link } from 'react-router-dom';


export default function AddSupplier() {

  const navigate = useNavigate();
  const userDataString = localStorage.getItem('user');
  // Parse the JSON string to an object
  const userData = JSON.parse(userDataString);
  const [formData, setFormData] = useState({
    supplierName: "",
    supplierEmail: "",
    supplierNumber: "",
    supplierGstNumber: "",
    drupLicenceNumber: "",
    address: "",
    open_balance: 0,
    status: false,
    userId: userData.id

  });



  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function showMessage(message) {
    document.getElementById("massage").innerHTML = "<h5>" + message.toUpperCase() + "</h5>";
    // Set a timeout to remove the span element after 10 seconds (10000 milliseconds)
    setTimeout(function () {
      // Remove the span element after 10 seconds
      document.getElementById("massage").innerHTML = "";
    }, 5000);
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        "http://localhost:8080/pharmacy/supplier/addSupplier",
        formData,
        {
          headers: {
            'Authorization':  'Bearer ' + userData.accessToken ,
          }
        }
      );


      if (res.status === 200) {
        console.log(res.data);
        showMessage(res.data);

      } else {
        // Handle other response statuses (e.g., 4xx or 5xx errors)
        console.error("Request failed with status:", res.status.toUpperCase());
      }
    } catch (error) {
      // Handle network errors or exceptions here
      console.error("An error occurred:", error);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/")
    }
  }, [])
  return (
    <div id="supplier">
      <form onSubmit={handleSubmit}>
        <span style={{
          textAlign: 'center',
          textDecoration: 'solid',
          color: 'red',
          textShadow: '1px 1px 1px #000000' // Adding a color to the text shadow
        }}><span id="massage" colSpan="1"></span></span>
        <table id="supplierTab">

          <thead>
            <tr id="headingSupplier" >
              <th colSpan="2"><h5>ADD NEW SUPPLIER</h5></th>
              <th colSpan="2" id="showList"><button><Link to="/supplier/showSupplier">SHOW LIST</Link></button></th>
            </tr>
            <tr>
              <th colSpan="2" id="titalheader">SUPPLIER DETAILS</th>
              <th colSpan="2" id="titalheader1">CONTECT DETAILS</th>
            </tr>


          </thead>
          <tbody>

            <tr>
              <td id="tital">Name</td>
              <td><input
                type="text"
                className="form-control"
                name="supplierName"
                onChange={(e) => handleInputChange(e)}
                required /></td>
              <td id="tital1">Contact Number </td>
              <td><input
                type="text"
                className="form-control"
                name="supplierNumber"
                onChange={(e) => handleInputChange(e)}
                required
              /></td>
            </tr>
            <tr>
              <td id="tital">GST NUMBER</td>
              <td><input
                type="text"
                className="form-control"
                name="supplierGstNumber"
                onChange={(e) => handleInputChange(e)}
                required
              /></td>
              <td id="tital1">EMAIL ID </td>
              <td><input
                type="text"
                className="form-control"
                name="supplierEmail"
                onChange={(e) => handleInputChange(e)}
                required

              /></td>
            </tr>
            <tr>
              <td id="tital">Drug License No </td>
              <td><input
                type="text"
                className="form-control"
                name="drupLicenceNumber"
                onChange={(e) => handleInputChange(e)}
                required
              /></td>
              <td id="tital1">ADDRESS</td>
              <td><input
                type="text"
                className="form-control"
                name="address"
                onChange={(e) => handleInputChange(e)}
                required
              /></td>
            </tr>
            <tr>
              <td id="tital">OPEN BALANCE </td>
              <td><input
                type="text"
                className="form-control"
                name="open_balance"
                onChange={(e) => handleInputChange(e)}

              /></td>
              <td id="tital1">STATUS</td>
              <td id="radioButton"><input type="radio" id="html" className='HelloRadioButton' name="status"
                onChange={(e) => handleInputChange(e)} value="true" checked />
                &nbsp;<label htmlFor="html">Enable</label> &nbsp;&nbsp;&nbsp;&nbsp;
                <input type="radio" id="css" value="false" name="status"
                  onChange={(e) => handleInputChange(e)} />
                &nbsp;<label htmlFor="css">Disable</label>
              </td>
            </tr>
            <tr id="submitTr">
              <th colSpan="4" id="actionButton"><button type="submit">SUBMIT</button></th>
            </tr>

          </tbody>

        </table>
      </form>
    </div>
  )
}
