import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import "../Components_css/Supplier.css"
import "../Components_css/ShowSupplier.css"
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const userDataString = localStorage.getItem('user');
    // Parse the JSON string to an object
    const userData = JSON.parse(userDataString);
    const [suppliers, setSuppliers] = useState([]);
    const handleInputChange = (e) => {
        //setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        //setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        loadSupplierData();
        if (localStorage.getItem("user") == null) {
            navigate("/")

        }
    }, [])
    const logout=()=>{
        localStorage.removeItem("user");
        navigate("/")
    }

    const loadSupplierData = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8080/pharmacy/supplier/getSupplier/"+userData.id,
            {
              headers: {
                'Authorization':  'Bearer ' + userData.accessToken,
              }
            }
          );
    
    
          if (res.status === 200) {
            const datta = res.data;
            console.log(JSON.stringify(res.data));
            setSuppliers(res.data);
           // alert(suppliers);
           
          } else {
            // Handle other response statuses (e.g., 4xx or 5xx errors)
            console.error("Request failed with status:", res.status.toUpperCase());
          }
        } catch (error) {
          // Handle network errors or exceptions here
          console.error("An error occurred:", error);
        }
      }

      const rowStyle = {
        backgroundImage: 'url("h1.jpg")', // Path to your image file
        backgroundSize: 'cover', // Adjust the background size as needed
        backgroundPosition: 'center', // Center the background image
        height: '100px', // Set the height of the table row
      };
    
      const divStyle = {
        backgroundImage: 'url("h1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '24px',
    }
    //const userDataString = localStorage.getItem('user');

    // Parse the JSON string to an object
    //const userData = JSON.parse(userDataString);
    //alert(userData.id);
    return (
        <>
        <div id="supplier"  >
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
                            <th colSpan="4"><h5>WELCOME Dashboard PAGE </h5></th>
                            
                        </tr>
                        

                    </thead>
                    <tbody style={rowStyle}>
                        
        
                        
                          




                        {/* <tr>
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
                        </tr> */}

                    </tbody>

                </table>
            </form>
        </div>

        </>
            
            
    )
}

export default Dashboard