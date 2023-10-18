import React, { useState, useEffect } from "react";
import "../Components_css/PurchaseDetails.css";
import axios from "axios";
import { json } from "react-router-dom";

const PurchaseDetails = () => {
  const [options, setOptions] = useState([]);

  const userDataString = localStorage.getItem("user");
  // Parse the JSON string to an object
  const userData = JSON.parse(userDataString);
  // today's date code
  const [date, setDate] = useState(new Date());
  const [supplierData, setSupplierData] = useState([]);
  const [product, setProduct] = useState([]);



  const [purchaseData,setPurchaseData] = useState({
    purchasePONumber:"",
    billType:"",
    purchaseDate:new Date(),
    supplier:"",
    supplierId:"",
    billNumber:"",
    netPurchaseAmount:0.0,
    totalCgst:0.0,
    totalSgst:0.0,
    discountInPercentageOnPurchase:0.0,
    discountInAmountOnPurchase:0.0,
    roundOfOnBill:0.0,
    netPayableAmount:0.0,
    paidAmount:0.0,
    dueAmount:0.0,
    userId:userData.id,
    PurchaseDetails:[
      {
        productName:"",
        productId:"",
        productHSNCode:"",
        productBatch:"",
        expiryDate:"",
        productPackaging:0,
        productQuantity:0,
        productFreeQuantity:0,
        productMRP:0.0,
        productPurchaseRate:0.0,
        productDiscount:0,
        productBaseAmount:0.0,
        productCGST:0.0,
        cGSTInAmount:0.0,
        productSGST:0.0,
        sGSTInAmount:0.0,
        productTotalAmtWithGST:0.0,
        userId:userData.id

      }
    ]

  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPurchaseData({
      ...purchaseData,
      [name]: value
    });
  };

  const handlePurchaseDetailsChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPurchaseDetails = [...purchaseData.PurchaseDetails];
    updatedPurchaseDetails[index] = {
      ...updatedPurchaseDetails[index],
      [name]: value
    };
    setPurchaseData({
      ...purchaseData,
      PurchaseDetails: updatedPurchaseDetails
    });
    alert(index)
   alert( JSON.stringify(purchaseData)  ) 
  };

  let index1 = 3;
  function increaseIndexNumber(){
    index1= index1+1;
  }




  useEffect(() => {
    fillPaymentType();
    findSupplier();
    findProduct();
    if (userData.id === null) {
    }
  }, []);



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
  

  const findSupplier = async () => {
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
        setSupplierData(res.data);
        console.log("Hi  +  " + JSON.stringify(supplierData));

      }

    } catch (error) {
      // Handle network errors or exceptions here
      console.error("An error occurred:", error);
    }
  };

  const [inputValue, setInputValue] = useState('');
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);

  const filterManufacturers = (input) => {
    return supplierData.filter(manufacturer =>
      //manufacturer.name.toLowerCase().includes(input.toLowerCase()) && input.length >= 3
      manufacturer.supplierName && manufacturer.supplierName.toLowerCase().includes(input.toLowerCase()) && input.length >= 3
    );
  };

  const handleInputChange11 = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setManufacturers(filterManufacturers(value));
  };

  const handleSelectManufacturer = (manufacturer) => {
    setSelectedManufacturer(manufacturer);
    setInputValue(manufacturer.supplierName);
    setManufacturers([]);
  };


  const findProduct = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/pharmacy/product/showProduct/" + userData.id,
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
        console.log("Hi  +  " + JSON.stringify(product));

      }

    } catch (error) {
      // Handle network errors or exceptions here
      console.error("An error occurred:", error);
    }
  };
  const handleDateChange = (event) => {
    setDate(new Date(event.target.value));
  };

  const formattedDate = date.toISOString().substr(0, 10);

  // table data code
 

  
  




  const autocompleteStyles = {
    position: "absolute",
    zIndex: 1,
    maxHeight: "200px",

  };


  
  return (
    <div className="container p-2" id="supplier">
      <h5 className="text-muted">ADD NEW PURCHASE DETAILS</h5>

      <form >
        <div className="card" style={{ position: "inherit" }}>
          <h5 className="card-title  text-light p-1">PURCHASE DETAILS</h5>

          <div className="card-body">
            <label className="my-2">BILL TYPE</label>

            <select
              style={{ width: "auto", paddingLeft: "12px" }}
              name="billType"
              className="my-3 mx-5 "
            >
              <option value="" disabled selected>
                Select Product Category
              </option>
              {options.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <label className="my-3" style={{ marginLeft: "92px" }}>
              PO NO
            </label>
            <input
              className="my-3 mx-2"
              type="text"
              name="purchasePONumber"
              placeholder="Search P.O Number"
            />
            <label className="my-3" style={{ marginLeft: "92px" }}>
              DATE
            </label>
            <input
              className="my-3 mx-2 "
              type="date"
              name="purchaseDate"
              style={{ paddingLeft: "12px" }}
              value={formattedDate}
              onChange={handleDateChange}
            />
            <br />
            <label className="my-3">NAME</label>
            <input
              className="my-3 mx-5"
              type="text"
              name="supplier"
              value={inputValue}
              onChange={handleInputChange11}
              placeholder="Enter Supplier Name"
              id="autocomplete-input"
              autocomplete="off"

            />

            {selectedManufacturer && (


              <input type="hidden" name="supplierId" value={selectedManufacturer.id} />

            )}
           

            <div
              className="autocomplete-list"
              id="autocomplete-list"
              style={autocompleteStyles}
            >
              {manufacturers.length > 0 && (
                <ul style={{ listStyle: "none", width: "500px" }} className="dropdown">
                  {manufacturers.map(manufacturer => (
                    <li key={manufacturer.id} onClick={() => handleSelectManufacturer(manufacturer)}>
                      {manufacturer.supplierName}

                    </li>
                  ))}
                </ul>
              )}
            </div>
            <label className="my-3">BILL NO</label>
            <input className="my-3 mx-5" type="text" name="billNumber"/>
            <label className="my-3">DISC(%)</label>
            <input
              className="my-3 mx-5"
              type="text"
              placeholder="Supplier Disc(%)"
            />
            
            <label className="my-3">FREE QTY GST</label>
            <input className="mx-1" type="checkbox" />
          </div>
        </div>
        <div className="card">
          <h5 className="card-title text-light p-1">MEDICINE DETAILS</h5>
          <div className="card-body">
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

                {
                
                purchaseData.PurchaseDetails.map((product,index) => (

<tr key={index}>
<td className="head-cell" style={{ padding: "0px", margin: "0px", width: "1px", textAlign: "center", fontSize: "11px" }}>1</td>
<td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input type="text"  onChange={ (e) =>handlePurchaseDetailsChange(e,index)} value={product.productName}  name={'PurchaseDetails[${index}].productName'} placeholder="NAME" style={{ width: "auto", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
<input type="hidden" name="productId" />

<td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productHSNCode" type="text" style={{ width: "auto", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
<td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productBatch" value="BATCH" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
<td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="expiryDate" value="12/2022" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
<td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productPackaging" value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
<td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productQuantity" value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
<td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productFreeQuantity" value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
<td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productMRP" value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
<td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productPurchaseRate" value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
<td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productDiscount" value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>

<td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productBaseAmount" readOnly value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>

<td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productCGST" value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
<td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="cGSTInAmount" hidden value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
<td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productSGST" value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
<td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="sGSTInAmount" hidden value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
<td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productTotalAmtWithGST" value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>

</tr>
                
                ))}

                <tr>
                  <td className="head-cell" style={{ padding: "0px", margin: "0px", width: "1px", textAlign: "center", fontSize: "11px" }}>1</td>
                  <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input type="text" name="productName" placeholder="NAME" style={{ width: "auto", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
                  <input type="hidden" name="productId" />

                  <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productHSNCode" type="text" style={{ width: "auto", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
                  <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productBatch" value="BATCH" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
                  <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="expiryDate" value="12/2022" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
                  <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productPackaging" value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
                  <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productQuantity" value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
                  <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productFreeQuantity" value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
                  <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productMRP" value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
                  <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productPurchaseRate" value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
                  <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productDiscount" value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>

                  <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productBaseAmount" readOnly value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>

                  <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productCGST" value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
                  <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="cGSTInAmount" hidden value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
                  <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productSGST" value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
                  <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="sGSTInAmount" hidden value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>
                  <td className="head-cell" style={{ padding: "0px", margin: "0px", fontSize: "11px" }}><input name="productTotalAmtWithGST" value="10" type="text" style={{ width: "100%", padding: "0px", fontSize: "11px", margin: "0PX", paddingLeft: "1px" }} /></td>

                </tr>
                {/* {supplierData.map((product) => (
                  <tr key={product.id}>
                    <td className="table-cell" style={{width:"1px"}}>1</td>
                    <td className="table-cell">
                      <input
                        type="text"
                        placeholder="enetre name"
                        style={{ width: "100%", boxSizing: "border-box" }}
                      />
                    </td>
                    <td className="table-cell">{product.hsn}</td>
                    <td className="table-cell">{product.batch}</td>
                    <td className="table-cell">{product.expDate}</td>
                    <td className="table-cell">{product.pkg}</td>
                    <td className="table-cell">{product.qty}</td>
                    <td className="table-cell">{product.freeQty}</td>
                    <td className="table-cell">{product.mrp}</td>
                    <td className="table-cell">{product.rate}</td>
                    <td className="table-cell">{product.discPercent}</td>
                    <td className="table-cell">{product.disc}</td>
                    <td className="table-cell">{product.base}</td>
                    <td className="table-cell">{product.amt}</td>
                    <td className="table-cell">{product.cgstPercent}</td>
                    <td className="table-cell">{product.cgstRs}</td>
                    <td className="table-cell">{product.sgstPercent}</td>
                    <td className="table-cell">{product.sgstRs}</td>
                    <td className="table-cell">{product.totalAmt}</td>
                  </tr>
                ))} */}
              </tbody>
            </table>
            <div className="totalset">
              
              <label className="my-3">FREE QTY</label>
              <input
                className="my-3 mx-3 noneset"
                type="text"
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
                
                readOnly="true"
              />
              <label className="my-3">DISC. TOTAL</label>
              <input
                className="my-3 mx-5  noneset"
                type="number"
                
                readOnly="true"
              />
              <label className="my-3">C.GST TOTAL</label>
              <input
                className="my-3 mx-5  noneset"
                type="number"
                
              />
              <label className="my-3">S.GST TOTAL</label>
              <input
                className="my-3 mx-5  noneset"
                type="number"
                
              />
              <label className="my-3">DISC(%)</label>
              <input className="my-3 mx-5  " name="discountInPercentageOnPurchase" type="number" />
              <label className="my-3">DISC IN RS.</label>
              <input
                className="my-3 mx-5  "
                type="number"
                name="discountInAmountOnPurchase"
                
                
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
                className="my-3 mx-5  noneset"
                type="number"
                name="paidAmount"
                
                
              />
              <label className="my-3">DUE AMT</label>
              <input
                className="my-3 mx-5  noneset"
                type="number"
                name="dueAmount"
                

              />
            </div>
          </div>
          <div className="buttonset">
            <input
              className="m-5 button bg-dark text-light"
              type="submit"
              value="SUBMIT"
            />
            <input
              className="m-5 button bg-dark text-light"
              type="button"
              value="CANCEL"
              
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PurchaseDetails;
