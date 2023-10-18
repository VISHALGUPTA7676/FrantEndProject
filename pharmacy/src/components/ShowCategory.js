import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import "../Components_css/Supplier.css"
import "../Components_css/ShowSupplier.css"


export const ShowCategory = () => {

  const userDataString = localStorage.getItem('user');
    // Parse the JSON string to an object
    const userData = JSON.parse(userDataString);

    const [category, setcategory] = useState([]);
    
    useEffect(() => {
       loadProductcategory();
        if (userData.id === null) {

        }
    }, [])


    const loadProductcategory = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8080/pharmacy/category/showCategory/"+userData.id,
            {
              headers: {
                'Authorization':  'Bearer ' + userData.accessToken,
              }
            }
          );
    
    
          if (res.status === 200) {
            
            console.log(JSON.stringify(res.data));
            setcategory(res.data);
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
                            <th colSpan="2"><h5>PRODUCT CATEGORY LIST</h5></th>
                            <th colSpan="2" id="showList"><button><Link to="/product/productCategory">ADD PRODUCT CATEGORY</Link></button></th>
                        </tr>
                        <tr>
                            <th style={{ borderBottom: '2px solid rgb(5, 5, 5)',width:'10%',textAlign:'center'}}>Sr.</th>
                            <th style={{ borderBottom: '2px solid rgb(5, 5, 5)',width:'70%'}}>Product category NAME</th>
                            <th style={{ borderBottom: '2px solid rgb(5, 5, 5)'}}>STATUS</th>
                            <th style={{ borderBottom: '2px solid rgb(5, 5, 5)'}}>ACTION</th>

                        </tr>

                    </thead>
                    <tbody>
                        {
                            category.map((category, index) => (
                                <tr style={{height:'42px'}}>
                                    <td style={{ borderBottom: '1px solid rgb(5, 5, 5)',textAlign:'center'}}>{index + 1}</td>
                                    <td style={{ borderBottom: '1px solid rgb(5, 5, 5)'}}>{category.categoryName}</td>
                                    <td style={{ borderBottom: '1px solid rgb(5, 5, 5)'}}>{category.status ? 'Enable' : 'Disable'}</td>
                                    <td style={{ borderBottom: '1px solid rgb(5, 5, 5)'}}><Link to={`/productCategory/editProductCategory/${category.id}`} style={{textDecoration:'none'}}>Edit</Link></td>
                                </tr>
                            ))
                            
                            
                        }
        
                        
                            {/* {
                                suppliers.map(supplier => (
                                    <tr style={{height:'42px'}}>
                                        <input type='hidden' name='id' value={supplier.id}/> 
                                        <td style={{ borderBottom: '1px solid rgb(5, 5, 5)'}}>{supplier.supplierName}</td>
                                        <td style={{ borderBottom: '1px solid rgb(5, 5, 5)'}}>{supplier.supplierGstNumber}</td>
                                        <td style={{ borderBottom: '1px solid rgb(5, 5, 5)'}}>{supplier.supplierEmail}</td>
                                        <td style={{ borderBottom: '1px solid rgb(5, 5, 5)'}}>{supplier.drupLicenceNumber}</td>
                                        <td style={{ borderBottom: '1px solid rgb(5, 5, 5)'}}>{supplier.supplierNumber}</td>
                                        <td style={{ borderBottom: '1px solid rgb(5, 5, 5)'}}>{supplier.status ? 'Enable' : 'Disable'}</td>
                                        <td style={{ borderBottom: '1px solid rgb(5, 5, 5)'}}><Link to={`/supplier/editSupplier/${supplier.id}`}style={{textDecoration:'none'}}>Edit</Link></td>
                                    </tr>

                                ))
                            } */}
                        




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
