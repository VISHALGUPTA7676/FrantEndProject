import React, { useState, useEffect, useMemo } from "react";
import "../Components_css/PurchaseDetails.css";
import axios from "axios";
import { json } from "react-router-dom";



export const Sales = () => {

  const [options, setOptions] = useState([]);
  const [product, setProduct] = useState([]);
  const userDataString = localStorage.getItem("user");
  // Parse the JSON string to an object
  const userData = JSON.parse(userDataString);

  const[sales,setSales] = useState({
    id:"",
    saleBillNumber:"",
    DoctorName:"",
    patientId:"",
    patientName:"",
    mobileNumer:"",
    Address:"",
    salesDate:new Date(),
    billType:"",
    subTotalSalesBillAmt:0.0,
    totalCgstInAmt:0.0,
    totalSgstInAmt:0.0,
    netPayableAmountForSales:0.0,
    discountInPercentageOnSales:0.0,
    discountInAmountOnSales:0.0,
    paidAmount:0.0,
    dueAmount:0.0,
    userId: userData.id
  });

  const handleInputChange = (e) => {
    setSales({ ...sales, [e.target.name]: e.target.value })
  }


  const[salesDetails,setSalesDetails] = useState([
    {
      productName:"",
      productId:"",
      productSubQnty:0,
      productHSNCode:"",
      productBatch:"",
      expiryDate:"",
      productPackaging:0,
      productQuantity:0,
      productFreeQuantity:0,
      productMRP:0.0,
      productPurchaseRate:0.0,
      productDiscount:0.0,
      productBaseAmount:0.0,
      productCGST:0.0,
      cGSTInAmount:0.0,
      productSGST:0.0,
      sGSTInAmount:0.0,
      productTotalAmtWithGST:0.0,
      userId: userData.id
    }
  ]

  )
  useEffect(() => {
    fillPaymentType();
    //findSupplier();
    findProduct();
    findPatient();
    
    

    if (userData.id === null) {
    }else{
      
    }
  }, []);

  const [patient, setpatient] = useState([]);
  const findPatient = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/pharmacy/supplier/getSupplier/" + userData.id,
        {
          headers: {
            Authorization: "Bearer " + userData.accessToken,
          },
        }
      );
      if (res.status === 200) {
        const data = res.data;
        console.log(data);
        setpatient(res.data);
        console.log("Hi  +  " + JSON.stringify(patient));

      }

    } catch (error) {
      // Handle network errors or exceptions here
      console.error("An error occurred:", error);
    }
  };


  const findProduct = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/pharmacy/getProducts/" + userData.id,
        {
          headers: {
            Authorization: "Bearer " + userData.accessToken,
          },
        }
      );
      if (res.status === 200) {
        const data = res.data;
        console.log(data);
        setProduct(res.data);
        alert("Hi  +  " + JSON.stringify(product));

      }

    } catch (error) {
      // Handle network errors or exceptions here
      console.error("An error occurred:", error);
    }
  };

  const fillPaymentType = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/pharmacy/getPaymentMode/" + userData.id,
        {
          headers: {
            Authorization: "Bearer " + userData.accessToken,
          },
        }
      );

      if (res.status === 200) {
        const datta = res.data;
        // console.log(JSON.stringify(res.data));
        const selectOptions = datta.map((item) => ({
          value: item.paymentMode,
          label: item.paymentMode,
        }));
        setOptions(selectOptions);
        // console.log(selectOptions);
      } else {
        // Handle other response statuses (e.g., 4xx or 5xx errors)
        console.error("Request failed with status:", res.status.toUpperCase());
      }
    } catch (error) {
      // Handle network errors or exceptions here
      console.error("An error occurred:", error);
    }
  };

  const autocompleteStyles = {
    position: "absolute",
    zIndex: 1,
    maxHeight: "200px",

  };
  return (
    <div className="container p-2" id="supplier">
    <div style={{display:"flex"}}>  <h5 className="text-muted">ADD NEW SALES</h5><button style={{marginLeft:"71vw"}} >SHOW SALES</button>  </div>
   

    <form >
    <span style={{
        textAlign: 'center',
        textDecoration: 'solid',
        color: 'red',
        textShadow: '1px 1px 1px #000000' // Adding a color to the text shadow
      }}><span id="massage" colSpan="1"></span></span>
      
      <div className="card" style={{ position: "inherit" }}>
        
        <h5 className="card-title  text-light p-1">SALES DETAILS</h5>
        
        <div className="card-body">
          <label className="my-2">BILL TYPE</label>

          <select
            style={{ width: "auto", paddingLeft: "12px" }}
            name="billType"
            className="my-3 mx-5 "

           // onChange={(e) => handleInputChangeBILL(e)}

          >
            <option value="" disabled selected>
              Select PAYMENT TYPE
            </option>
            {options.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <label className="my-3" style={{ marginLeft: "48px" }}>
            DOCTOR NAME
          </label>
          <input
            className="my-3 mx-2"
            type="text"
            name="purchasePONumber"
          //  onChange={(e) => handleInputChange(e)}
            placeholder="Search Doctor Name"
          />
          <label className="my-3" style={{ marginLeft: "92px" }}>
            DATE
          </label>
          <input
            className="my-3 mx-2 "
            type="date"
            name="purchaseDate"
            style={{ paddingLeft: "12px" }}
          //  value={formattedDate}
            //onChange={handleDateChange}
          />
          
          <label className="my-3">PATIENT NAME</label>
          <input
            className="my-3 mx-5"
            type="text"
            name="supplier"
            //onInput={(e) => handleInputChange(e)}

           // value={inputValue}
          //  onChange={handleInputChange11}
            placeholder="Enter Patient Name"
            id="autocomplete-input"
            autocomplete="off"

          />


          {/* {selectedManufacturer && (


            <input type="hidden" name="supplierId" value={selectedManufacturer.id} />

          )} */}


          <div
            className="autocomplete-list"
            id="autocomplete-list"
            style={autocompleteStyles}
          >
            {/* {manufacturers.length > 0 && (
              <ul style={{ listStyle: "none", width: "500px" }} className="dropdown">
                {manufacturers.map(manufacturer => (
                  <li key={manufacturer.id} onClick={() => handleSelectManufacturer(manufacturer)}>
                    {manufacturer.supplierName}

                  </li>
                ))}
              </ul>
            )} */}
          </div>
          <label className="my-3">ADDRESS</label>
          <input className="my-3 mx-5" type="text" name="billNumber"
             />
             <br></br>
          <label className="my-3">MOBILE NUMBER</label>
          <input
            className="my-3 mx-5"
            type="text"

            placeholder="Enter Moblile Number"
          />


        </div>
      </div>
      <div className="card">
        <h5 className="card-title text-light p-1">MEDICINE DETAILS</h5>
        <div className="card-body">
          <button >Add Product</button>
          <table className="table">

            <thead>
              <tr className="table-head">
                <th className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", textAlign: "center" }}>No.</th>
                <th className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", textAlign: "center" }}>PRODUCT NAME</th>
                <th className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", textAlign: "center" }}>HSN</th>
                <th className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", textAlign: "center" }}>BACTH</th>
                <th className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", textAlign: "center" }}>EXP DT.</th>
                <th className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", textAlign: "center", marginBottom: "0PX" }}>PKG</th>
                <th className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", textAlign: "center", marginBottom: "0PX" }}>QTY</th>
                <th className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", textAlign: "center", marginBottom: "0PX" }}>FREE QTY</th>
                <th className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", textAlign: "center", marginBottom: "0PX" }}>M.R.P</th>
                <th className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", textAlign: "center", marginBottom: "0PX" }}>RATE</th>

                <th className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", textAlign: "center", marginBottom: "0PX" }}>DISC</th>
                <th className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", textAlign: "center", marginBottom: "0PX" }}>BASE AMT</th>

                <th className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", textAlign: "center", marginBottom: "0PX" }}>C.GST(%)</th>
                <th className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", textAlign: "center", marginBottom: "0PX" }}>C.GST(RS)</th>
                <th className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", textAlign: "center", marginBottom: "0PX" }}>S.GST(%)</th>
                <th className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", textAlign: "center", marginBottom: "0PX" }}>S.GST(RS)</th>
                <th className="head-cell">AMT</th>
              </tr>
            </thead>
            <tbody>


              {/* {

                products.map((product, index) => (


                  <tr key={index}>

                    <td className="head-cell" style={{ padding: "0px", margin: "0px", width: "1px", textAlign: "center", fontSize: "11px" }}><button style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} onClick={() => removeProduct(index)}>-</button></td>
                    <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input type="text" autocomplete="off" name="productName" value={product.productName} onChange={(e) => handleInputChangeForProduct(e, index)} id="autocomplete-input" style={{ width: "auto", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px", fontWeight: "bold" }} /></td>


                    <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productHSNCode" value={product.productHSNCode} onChange={(e) => handleInputChange1(e, index)} type="text" style={{ width: "auto", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px", fontWeight: "bold" }} /></td>
                    <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productBatch" value={product.productBatch} onChange={(e) => handleInputChange1(e, index)} type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px", fontWeight: "bold" }} /></td>
                    <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="expiryDate" placeholder="MM/YYYY" value={product.expiryDate} onChange={(e) => handleInputChange1(e, index)} type="text" style={{ width: "60px", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px", fontWeight: "bold" }} /></td>
                    <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productPackaging" value={product.productPackaging} onChange={(e) => handleInputChange1(e, index)} type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px", fontWeight: "bold" }} /></td>
                    <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productQuantity" value={product.productQuantity} onChange={(e) => handleInputChangeproductQuantity(e, index)} type="number" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px", fontWeight: "bold" }} /></td>
                    <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productFreeQuantity" value={product.productFreeQuantity} onChange={(e) => handleInputChange1(e, index)} type="number" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px", fontWeight: "bold" }} /></td>
                    <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productMRP" value={product.productMRP} onChange={(e) => handleInputChange1(e, index)} type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px", fontWeight: "bold" }} /></td>
                    <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productPurchaseRate" value={product.productPurchaseRate} onChange={(e) => handleInputChangeproductPurchaseRate(e, index)} type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px", fontWeight: "bold" }} /></td>
                    <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productDiscount" value={product.productDiscount} onChange={(e) => handleInputChange1(e, index)} type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px", fontWeight: "bold" }} /></td>

                    <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", backgroundColor: "#ccc" }}><input name="productBaseAmount" readOnly value={product.productBaseAmount} onChange={(e) => (e, index)} type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px", backgroundColor: "#ccc", fontWeight: "bold" }} /></td>

                    <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productCGST" value={product.productCGST} onChange={(e) => handleInputChangeproductCGST(e, index)} type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px", fontWeight: "bold" }} /></td>
                    <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", backgroundColor: "#ccc" }}><input name="cGSTInAmount" readOnly value={product.cGSTInAmount} onChange={(e) => handlePurchaseDetailsChange(e, index)} type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px", backgroundColor: "#ccc", fontWeight: "bold" }} /></td>
                    <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productSGST" value={product.productSGST} onChange={(e) => handleInputChangeproductSGST(e, index)} type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px", fontWeight: "bold" }} /></td>
                    <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", backgroundColor: "#ccc" }}><input name="sGSTInAmount" readOnly value={product.sGSTInAmount} onChange={(e) => handleInputChange1(e, index)} type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px", backgroundColor: "#ccc", fontWeight: "bold" }} /></td>
                    <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px", backgroundColor: "#ccc" }}><input name="productTotalAmtWithGST" readOnly value={product.productTotalAmtWithGST} onChange={(e) => handlePurchaseDetailsChange(e, index)} type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px", backgroundColor: "#ccc", fontWeight: "bold" }} /></td>

                  </tr>


                ))}
              <div className="autocomplete-list" id="autocomplete-list" style={autocompleteStyles}    >
                {productDataInput.length > 0 && (
                  <ul style={{ listStyle: "none", width: "500px" }} className="dropdown">
                    {productDataInput.map(productDataInput => (
                      <li key={productDataInput.id} onClick={() => handleSelectProduct(productDataInput, indexForList)}>
                        {productDataInput.productName}

                      </li>
                    ))}
                  </ul>
                )}      </div> */}


            </tbody>
          </table>
          <div className="totalset">

            <label className="my-3">FREE QTY</label>
            <input
              className="my-3 mx-3 noneset"
              type="text"
              id="free"
              readOnly="true"

            />
            <label className="my-3">C.GST-% TOTAL </label>
            <input
              className="my-3 mx-3 noneset"
              type="text"
              name="totalCgst"
              readOnly="true"
             

            />
            <label className="my-3">S.GST-% TOTAL</label>
            <input
              className="my-3 mx-3 noneset"
              type="text"
              readOnly="true"
              name="totalSgst"
             
            />
            <label className="my-3">NET TOTAL AMT</label>
            <input
              className="my-3 mx-3 noneset"
              type="text"
              readOnly="true"
              name="netPurchaseAmount"
              
            />
          </div>
        </div>
      </div>
      <div className="card">
        <h5 className="card-title text-light p-1">PAYMENT DETAILS</h5>
        <div className="card-body">
          <div className="totalset">
            <label className="my-3">PURCHASE AMT</label>
            <input
              className="my-3 mx-5  noneset"
              type="number"
              name="netPurchaseAmount"
              readOnly="true"
            
            />
            <label className="my-3">DISC. TOTAL</label>
            <input
              className="my-3 mx-5  noneset"
              type="number"
              id=""
              readOnly="true"
            />
            <label className="my-3">C.GST TOTAL</label>
            <input
              className="my-3 mx-5  noneset"
              type="text"
              id="cgstamt"
            />
            <label className="my-3">S.GST TOTAL</label>
            <input
              className="my-3 mx-5  noneset"
              type="text"
              id="sgstamt"
            />
            <label className="my-3">DISC(%)</label>
            <input className="my-3 mx-5  " name="discountInPercentageOnPurchase" type="number" />
            <label className="my-3">DISC IN RS.</label>
            <input
              className="my-3 mx-5  "
              type="number"
              
              name="discountInAmountOnPurchase"
              readOnly

            />
            <label className="my-3">ROUND OFF</label>
            <input
              className="my-3 mx-5  noneset"
              type="number"
              name="roundOfOnBill"


            />
            <label className="my-3">NET PAYABLE AMT</label>
            <input
              className="my-3 mx-5  noneset"
              type="number"
              name="netPayableAmount"

              
            />
            <label className="my-3">PAID AMT</label>
            <input
              className="my-3 mx-5  "
              type="number"
              name="paidAmount"
              
              id="padi"
              


            />
            <label className="my-3">DUE AMT</label>
            <input
              className="my-3 mx-5 "
              type="number"
              
              name="dueAmount"
              id="duei"


            />
          </div>
        </div>
        <div className="buttonset">
          <button className="m-5 button bg-dark text-light" type="submit">SUBMIT</button>
          <input
            className=" button bg-dark text-light"
            type="button"
            value="CANCEL"

          />
        </div>
      </div>
    </form>
  </div>
  )
}
