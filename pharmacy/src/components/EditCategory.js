import React, { useState, useEffect } from 'react';
import "../Components_css/Supplier.css"

import axios from 'axios'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const EditCategory = () => {


  const { id } = useParams();
  const userData = JSON.parse(userDataString);

  useEffect(() => {
    loadProductCategory();
    if (userData.id === null) {

    }
}, [])

const loadProductCategory = async () => {
  try {
      const res = await axios.get(
          "http://localhost:8080/pharmacy/category/showCategory/" + userData.id+ "/" + id,
          {
              headers: {
                  'Authorization': 'Bearer ' + userData.accessToken,
              }
          }
      );


      if (res.status === 200) {
          const response= res.data;
          console.log(JSON.stringify(res.data));
          
          setFormData({
              id: response.id,
              categoryName: response.categoryName,
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

const [formData, setFormData] = useState({

    id:"",
    categoryName: "",
    status: true,
    userId: userData.id

});
const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
}

const handleSubmit = async (e) => {
    try {
        console.log(formData);
        e.preventDefault();
        const res = await axios.put(
            "http://localhost:8080/pharmacy/Category/updateCategory",
            formData,
            {
                headers: {
                    'Authorization':  'Bearer ' + userData.accessToken,
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
                            <th ><h5>ADD NEW PRODUCT CATEGORY</h5></th>
                            <th id="showList"><button><Link to="/productGroup/showProductCategory">SHOW PRODUCT CATEGORY LIST</Link></button></th>
                        </tr></thead>
                    <tbody>


                        <tr>
                            <td id="tital" style={{ paddingLeft: '30vw', paddingRight: '11px' }}><b>Group&nbsp;Name</b></td>
                            <td ><input
                                type="text"
                                className="form-control"
                                name="categoryName"
                                value={formData.categoryName}
                                onChange={(e) => handleInputChange(e)}
                                required
                                placeholder='Enter Atleast Two Word'
                                style={{ width: '30vw' }}
                            /></td>
                        </tr>


                        <tr>

                        <td style={{ paddingLeft: '30vw', paddingRight: '11px' }} id="tital1"><b>Status</b></td>
                            <td id="radioButton"><input type="radio" id="html" className='HelloRadioButton' name="status"
                                onChange={(e) => handleInputChange(e)} value="true" checked={formData.status === true} />
                                &nbsp;<label htmlFor="html">Enable</label> &nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="radio" id="css" value="false" name="status"
                                    onChange={(e) => handleInputChange(e)} checked={formData.status === false} />
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
