import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import "../Components_css/Supplier.css"
import "../Components_css/ShowSupplier.css"
import { useNavigate } from 'react-router-dom';

export const ShowProduct = () => {
    const userDataString = localStorage.getItem('user');
    // Parse the JSON string to an object
    const userData = JSON.parse(userDataString);

    const [product, setProduct] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
       loadProdcuts();
       if (localStorage.getItem("user") === null) {
        navigate("/")
      }
    }, [])

    const loadProdcuts = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8080/pharmacy/product/showProduct/"+userData.id,
            {
              headers: {
                'Authorization':  'Bearer ' + userData.accessToken,
              }
            }
          );
    
    
          if (res.status === 200) {
            console.log(JSON.stringify(res.data) + "!!!!!");
            setProduct(res.data);
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

  return (
    <div id="supplier">
            <form >
                <span style={{
                    textAlign: 'center',
                    textDecoration: 'solid',
                    color: 'red',
                    textShadow: '1px 1px 1px #000000' // Adding a color to the text shadow
                }}><span id="massage" colSpan="1"></span></span>
                <table id="supplierTab">

                    <thead>
                        <tr id="headingSupplier" >
                            <th colSpan="4"><h5>PRODUCT LIST</h5></th>
                            <th colSpan="3" id="showList"><button><Link to="/addProduct">ADD Product</Link></button></th>
                        </tr>
                        <tr>
                            <th style={{ borderBottom: '2px solid rgb(5, 5, 5)'}}>Name</th>
                            <th style={{ borderBottom: '2px solid rgb(5, 5, 5)'}}>Packaging</th>
                            <th style={{ borderBottom: '2px solid rgb(5, 5, 5)'}}>Rack</th>
                            <th style={{ borderBottom: '2px solid rgb(5, 5, 5)'}}>Group</th>
                            <th style={{ borderBottom: '2px solid rgb(5, 5, 5)'}}>Manufacturer</th>
                            <th style={{ borderBottom: '2px solid rgb(5, 5, 5)'}}>STATUS</th>
                            <th style={{ borderBottom: '2px solid rgb(5, 5, 5)'}}>ACTION</th>

                        </tr>

                    </thead>
                    <tbody>
        
                        
                            {
                                product.map(product => (
                                    <tr style={{height:'42px'}}>
                                        
                                        <td style={{ borderBottom: '1px solid rgb(5, 5, 5)'}}>{product.productName}</td>
                                        <td style={{ borderBottom: '1px solid rgb(5, 5, 5)'}}>{product.productPackaging}</td>
                                        <td style={{ borderBottom: '1px solid rgb(5, 5, 5)'}}>{product.productStoreRackNumber}</td>
                                        <td style={{ borderBottom: '1px solid rgb(5, 5, 5)'}}>{product.productGroup}</td>
                                        <td style={{ borderBottom: '1px solid rgb(5, 5, 5)'}}>{product.productManufacturer}</td>
                                        <td style={{ borderBottom: '1px solid rgb(5, 5, 5)'}}>{product.productStatus ? 'Enable' : 'Disable'}</td>
                                        <td style={{ borderBottom: '1px solid rgb(5, 5, 5)'}}><Link to={`/product/editProduct/${product.id}`}style={{textDecoration:'none'}}>Edit</Link></td>
                                    </tr>

                                ))
                            }
                        




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
  )
}
