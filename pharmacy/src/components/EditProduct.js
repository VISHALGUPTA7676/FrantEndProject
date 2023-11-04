import React, { useState, useEffect } from 'react';
import "../Components_css/Supplier.css"

import axios from 'axios'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const EditProduct = () => {
  const navigate = useNavigate();
    const userDataString = localStorage.getItem('user');
  // Parse the JSON string to an object
  const userData = JSON.parse(userDataString);
  const [options, setOptions] = useState([]);
  const [option1, setOption1] = useState([]);
  const [option2, setOption2] = useState([]);
  const { id } = useParams();
  
  useEffect(() => {
    fetchProduct();
    fillProductGroup();
    fillProductManufacturer();
    fillProductCategory();
    if (localStorage.getItem("user") == null) {
      navigate("/")
  }
  }, [])

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/pharmacy/product/updateProduct/"+id+"/"+userData.id ,
        {
          headers: {
            'Authorization':  'Bearer ' + userData.accessToken,
          }
        }
      );


      if (res.status === 200) {
        const response = res.data;
        console.log(JSON.stringify(res.data) + "!!!!!!!!!!!!!!!!!!");
        
        setFormData({
    id:response.id,
    productName:response.productName,
    productDescription: response.productDescription,
    productGroup: response.productGroup,
    productCategory:response.productCategory,
    productManufacturer: response.productManufacturer,
    setMinProductQuantity: response.setMinProductQuantity,
    setMaxProductQuantity: response.setMaxProductQuantity,
    productPackaging: response.productPackaging,
    productHSNCode: response.productHSNCode,
    productCGST: response.productCGST,
    productSGST: response.productSGST,
    productStoreRackNumber: response.productStoreRackNumber,
    productGenericCode: response.productGenericCode,
    productStatus: response.productStatus,
    userId: userData.id
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
  const fillProductCategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/pharmacy/product/getCategory"+"/"+userData.id,
        {
          headers: {
            'Authorization':  'Bearer ' + userData.accessToken,
          }
        }
      );


      if (res.status === 200) {
        const datta = res.data;
        console.log(JSON.stringify(res.data));
        const selectOptions = datta.map(item => ({
          value: item.categoryName,
          label: item.categoryName
        }));
        setOption1(selectOptions);
        console.log(selectOptions);
      } else {
        // Handle other response statuses (e.g., 4xx or 5xx errors)
        console.error("Request failed with status:", res.status.toUpperCase());
      }
    } catch (error) {
      // Handle network errors or exceptions here
      console.error("An error occurred:", error);
    }
  }

  const fillProductManufacturer = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/pharmacy/manufacturer/getManufacturer"+"/"+userData.id,
        {
          headers: {
            'Authorization':  'Bearer ' + userData.accessToken,
          }
        }
      );


      if (res.status === 200) {
        const datta = res.data;
        console.log(JSON.stringify(res.data));
        const selectOption2 = datta.map(item => ({
          value: item.manufacturerName,
          label: item.manufacturerName
        }));
        setOption2(selectOption2);
        console.log(selectOption2);
      } else {
        // Handle other response statuses (e.g., 4xx or 5xx errors)
        console.error("Request failed with status:", res.status.toUpperCase());
      }
    } catch (error) {
      // Handle network errors or exceptions here
      console.error("An error occurred:", error);
    }
  }

  const fillProductGroup = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/pharmacy/productGroup/getProductGroup"+"/"+userData.id,
        {
          headers: {
            'Authorization':  'Bearer ' + userData.accessToken,
          }
        }
      );


      if (res.status === 200) {
        const datta = res.data;
        console.log(JSON.stringify(res.data));
        const selectOptions = datta.map(item => ({
          value: item.groupName,
          label: item.groupName
        }));
        setOptions(selectOptions);
        console.log(selectOptions);
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


  const [formData, setFormData] = useState({
    id:"",
    productName: "",
    productDescription: "",
    productGroup: "",
    productCategory: "",
    productManufacturer: "",
    setMinProductQuantity: 0,
    setMaxProductQuantity: 0,
    productPackaging: 0,
    productHSNCode: "",
    productCGST: 0.00,
    productSGST: 0.00,
    productStoreRackNumber: 0,
    productGenericCode: "",
    productStatus: true,
    userId: userData.id

  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.put(
        "http://localhost:8080/pharmacy/product/updateProduct",
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

        <table id="supplierTab">

          <thead>
            <tr id="headingSupplier" >
              <th colSpan="2"><h5>ADD NEW PRODUCT</h5></th>
              <th colSpan="2" id="showList"><button><Link to="/product/showProduct">SHOW PRODUCT LIST</Link></button></th>
            </tr>
            <tr>
              <th colSpan="2" id="titalheader"> <span id="massage" style={{
                textAlign: 'center',
                textDecoration: 'solid',
                color: 'red',
                textShadow: '1px 1px 1px #000000' // Adding a color to the text shadow
              }}></span></th>
              <th colSpan="2" id="titalheader1"></th>
            </tr>


          </thead>
          <tbody>

            <tr>
              <td id="tital"><b>Product Name</b></td>
              <td><input
                type="text"
                className="form-control"
                name="productName"
                value={formData.productName}
                onChange={(e) => handleInputChange(e)}
                required 
                placeholder='Enter The Product Name'
                /></td>
              <td id="tital1"><b>Packaging</b></td>
              <td><input
                type="number"
                className="form-control"
                value={formData.productPackaging}
                name="productPackaging"
                onChange={(e) => handleInputChange(e)}
                required
                min={1}
              /></td>
            </tr>
            <tr>
              <td id="tital"><b>Description</b></td>
              <td>
                <textarea className="form-control" name="productDescription" cols="60" onChange={(e) => handleInputChange(e)} placeholder='Enter About product'></textarea>
              </td>
              <td id="tital1"><b>Product Generic Code</b> </td>
              <td><input
                type="text"
                className="form-control"
                name="productGenericCode"
                value={formData.productGenericCode}
                onChange={(e) => handleInputChange(e)}
                required

              /></td>
            </tr>
            <tr>
              <td id="tital"><b>Rack Number</b></td>
              <td><input
                type="number"
                className="form-control"
                name="productStoreRackNumber"
                value={formData.productStoreRackNumber}
                onChange={(e) => handleInputChange(e)}
                required 
                min={1}/></td>
              <td id="tital1"><b>Product HSN Code</b></td>
              <td><input
                type="text"
                className="form-control"
                name="productHSNCode"
                value={formData.productHSNCode}
                onChange={(e) => handleInputChange(e)}
                required
              /></td>
            </tr>
            <tr>
              <td id="tital"><b>C-GST %</b></td>
              <td><input
                type="number"
                className="form-control"
                name="productCGST"
                value={formData.productCGST}
                onChange={(e) => handleInputChange(e)}
                required /></td>
              <td id="tital1"><b>S-GST %</b></td>
              <td><input
                type="number"
                className="form-control"
                name="productSGST"
                value={formData.productSGST}
                onChange={(e) => handleInputChange(e)}
                required
              /></td>
            </tr>
            <tr>
              <td id="tital"><b>Product Min QTY</b></td>
              <td><input
                type="number"
                className="form-control"
                name="setMinProductQuantity"
                value={formData.setMinProductQuantity}
                onChange={(e) => handleInputChange(e)}
                required /></td>
              <td id="tital1"><b>Product Max QTY</b></td>
              <td><input
                type="number"
                className="form-control"
                name="setMaxProductQuantity"
                value={formData.setMaxProductQuantity}
                onChange={(e) => handleInputChange(e)}
                required
              /></td>
            </tr>
            <tr>
              <td id="tital"><b>Product Category</b></td>
              <td>

                <select id="cars" name="productCategory" className="form-control form-select" value={formData.productCategory} onChange={(e) => handleInputChange(e)}>
                <option value="" disabled selected>Select Product Category</option>
                  {option1.map(option => (
                    <option key={option.id} value={option.value}>
                        {option.label}
                    </option>
                ))}
                </select>
              </td>
              <td id="tital1"><b>Product Group</b></td>
              <td>
                <select id="cars" name="productGroup" className="form-control form-select" value={formData.productGroup} onChange={(e) => handleInputChange(e)}>
                <option value="" disabled selected>Select Product Group</option>
                  {options.map(option => (
                    <option key={option.id} value={option.value}>
                        {option.label}
                    </option>
                ))}
                </select>
              </td>
            </tr>
            <tr>
              <td id="tital"><b>Product Manufacturer</b></td>
              <td><select id="cars" name="productManufacturer" className="form-control form-select" value={formData.productManufacturer} onChange={(e) => handleInputChange(e)}>
              <option value="" disabled selected>Select Product Manufacturer</option>  
              {option2.map(name => (
                    <option key={name.id} value={name.value}>
                        {name.label}
                    </option>
                ))}
              </select></td>
              <td id="tital1"><b>STATUS</b></td>
              
                            <td id="radioButton"><input type="radio" id="html" className='HelloRadioButton' name="productStatus"
                                onChange={(e) => handleInputChange(e)} value="true" checked={formData.productStatus === true} />
                                &nbsp;<label htmlFor="html">Enable</label> &nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="radio" id="css" value="false" name="productStatus"
                                    onChange={(e) => handleInputChange(e)} checked={formData.productStatus === false} />
                                &nbsp;<label htmlFor="css">Disable</label>
                            </td>

            </tr>
            <tr id="submitTr">
              <th colSpan="4" id="actionButton"><button type="submit">UPADATE</button></th>
            </tr>

          </tbody>

        </table>
      </form>
    </div>
  )
}
