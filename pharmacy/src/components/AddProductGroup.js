import React, { useState } from 'react';
import "../Components_css/Supplier.css"
import './LoginForm.css'; // Import the CSS file
import axios from 'axios'



export const AddProductGroup = () => {
    
    
    function showMessage(message) {
        document.getElementById("massage").innerHTML = "<h5>" + message.toUpperCase() + "</h5>";
        // Set a timeout to remove the span element after 10 seconds (10000 milliseconds)
        setTimeout(function () {
          // Remove the span element after 10 seconds
          document.getElementById("massage").innerHTML = "";
        }, 5000);
      }

    const userDataString = localStorage.getItem('user');
    // Parse the JSON string to an object
    const userData = JSON.parse(userDataString);
    const [formData, setFormData] = useState({
        groupName: "",
        status: true,
        userId: userData.id

    });
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        try {
          e.preventDefault();
          const res = await axios.post(
            "http://localhost:8080/pharmacy/productGroup/addProductGroup",
            formData,
            {
              headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJWaXNoYWxfR3VwdGEiLCJpYXQiOjE2OTU5ODY2MDMsImV4cCI6MTY5NjA3MzAwM30.8PwVzU4nTWtNWTa_lk0yfk0PEfKz3rhnbN-J9hyOr0g',
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
                            <th ><h5>ADD NEW PRODUCT GROUP</h5></th>
                            <th id="showList"><button>SHOW PRODUCT GROUP LIST</button></th>
                        </tr></thead>
                    <tbody>


                        <tr>
                            <td id="tital" style={{ paddingLeft: '30vw', paddingRight: '11px' }}><b>Group&nbsp;Name</b></td>
                            <td ><input
                                type="text"
                                className="form-control"
                                name="groupName"
                                onChange={(e) => handleInputChange(e)}
                                required
                                placeholder='Enter Atleast Two Word'
                                style={{ width: '30vw' }}
                            /></td>
                        </tr>


                        <tr>

                            <td style={{ paddingLeft: '30vw', paddingRight: '11px' }} id="tital1"><b>Status</b></td>
                            <td id="radioButton"><input type="radio" id="html" name="status"
                                onChange={(e) => handleInputChange(e)} value="true" checked />
                                &nbsp;<label htmlFor="html">Enable</label> &nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="radio" id="css" value="false" name="status"
                                    onChange={(e) => handleInputChange(e)} />
                                &nbsp;<label htmlFor="css">Disable</label>
                            </td>
                        </tr>
                        <tr id="submitTr">
                            <th colSpan="2" id="actionButton"><button type="submit">SUBMIT</button></th>
                        </tr>

                    </tbody>

                </table>
            </form>
        </div>
    )
}

