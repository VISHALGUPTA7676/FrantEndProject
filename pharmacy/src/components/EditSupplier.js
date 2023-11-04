import React, { useState ,useEffect} from 'react';
import "../Components_css/Supplier.css"

import axios from 'axios'
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';

export const EditSupplier = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const userDataString = localStorage.getItem('user');
  // Parse the JSON string to an object
  const userData = JSON.parse(userDataString);
  const [formData, setFormData] = useState({
    id:"",
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

  useEffect(() => {
    loadSupplierData();
    if (localStorage.getItem("user") == null) {
      navigate("/")
  }
}, [])

const loadSupplierData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/pharmacy/supplier/getSupplier/"+id+"/"+userData.id ,
        {
          headers: {
            'Authorization':  'Bearer ' + userData.accessToken,
          }
        }
      );


      if (res.status === 200) {
        const response1 = res.data;
        console.log(JSON.stringify(res.data));
        const response = response1[0];
        setFormData({
            id: response.id,
            supplierName: response.supplierName,
            supplierEmail: response.supplierEmail,
            supplierNumber: response.supplierNumber,
            supplierGstNumber: response.supplierGstNumber,
            drupLicenceNumber: response.drupLicenceNumber,
            address: response.address,
            open_balance: response.open_balance,
            status: response.status,
            userId: response.userId
          });
          
       
       
      } else {
        // Handle other response statuses (e.g., 4xx or 5xx errors)
        console.error("Request failed with status:", res.status.toUpperCase());
      }
    } catch (error) {
      // Handle network errors or exceptions here
      console.error("An error occurred:", error);
    }
  }



  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        "http://localhost:8080/pharmacy/supplier/updateSupplier",
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

  function showMessage(message) {
    document.getElementById("massage").innerHTML = "<h5>" + message.toUpperCase() + "</h5>";
    // Set a timeout to remove the span element after 10 seconds (10000 milliseconds)
    setTimeout(function () {
      // Remove the span element after 10 seconds
      document.getElementById("massage").innerHTML = "";
    }, 5000);
  }


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    // <div>
    //   <h2>Supplier ID: {id}</h2>
    //   {/* Rest of your component */}
    // </div>


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
              <th colSpan="2"><h5>UPADATE SUPPLIER</h5></th>
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
                value={formData.supplierName}
                onChange={(e) => handleInputChange(e)}
                required /></td>
              <td id="tital1">Contact Number </td>
              <td><input
                type="text"
                className="form-control"
                name="supplierNumber"
                value={formData.supplierNumber}
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
                value={formData.supplierGstNumber}
                onChange={(e) => handleInputChange(e)}
                required
              /></td>
              <td id="tital1">EMAIL ID </td>
              <td><input
                type="text"
                className="form-control"
                name="supplierEmail"
                value={formData.supplierEmail}
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
                value={formData.drupLicenceNumber}
                onChange={(e) => handleInputChange(e)}
                required
              /></td>
              <td id="tital1">ADDRESS</td>
              <td><input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
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
                value={formData.open_balance}
                onChange={(e) => handleInputChange(e)}

              /></td>
              <td id="tital1">STATUS</td>
              <td id="radioButton"><input type="radio" id="html" className='HelloRadioButton' name="status"
                onChange={(e) => handleInputChange(e)} value="true" checked={formData.status === true}/>
                &nbsp;<label htmlFor="html">Enable</label> &nbsp;&nbsp;&nbsp;&nbsp;
                <input type="radio" id="css" value="false" name="status"
                  onChange={(e) => handleInputChange(e)} checked={formData.status === false}/>
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
  );
}
