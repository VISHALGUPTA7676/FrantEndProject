import React, { useState, useEffect, useMemo } from "react";
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




  const [purchaseData, setPurchaseData] = useState({
    purchasePONumber: "",
    billType: "",
    purchaseDate: new Date(),
    supplier: "",
    supplierId: "",
    billNumber: "",
    netPurchaseAmount: 0.0,
    totalCgst: 0.0,
    totalSgst: 0.0,
    discountInPercentageOnPurchase: 0.0,
    discountInAmountOnPurchase: 0.0,
    roundOfOnBill: 0.0,
    netPayableAmount: 0.0,
    paidAmount: 0.0,
    dueAmount: 0.0,
    userId: userData.id,

  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPurchaseData({
      ...purchaseData,
      [name]: value
    });

  };

  const handleInputChangeBILL = (e) => {
    const { name, value } = e.target;
    setPurchaseData({
      ...purchaseData,
      [name]: value
    });


    if (value === "CREDIT") {

      const myElement = document.getElementById("duei");
      const myElement1 = document.getElementById("padi");
      // Apply CSS styles using the style property
      myElement.readOnly = true;
      myElement1.readOnly = true;
      myElement1.value = "sssss"
      myElement1.style.backgroundColor = '#ccc';
      myElement.style.backgroundColor = '#ccc';
    } else {
      const myElement = document.getElementById("duei");
      const myElement1 = document.getElementById("padi");
      // Apply CSS styles using the style property
      myElement.readOnly = true;
      myElement1.readOnly = false;
      myElement.style.backgroundColor = '#ccc';
      myElement1.style.backgroundColor = "white";
    }

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

  };





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
      //setPurchaseData();
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

    setPurchaseData({
      ...purchaseData,
      supplier: manufacturer.supplierName,
      supplierId: manufacturer.id

    });
    setManufacturers([]);

  };


  const [inputValueForProduct, setInputValueForProduct] = useState('');
  const [productDataInput, setproductDataInput] = useState([]);
  const [selectedproductDataInput, setSelectedproductDataInput] = useState(null);



  const [indexForList, setGlobalValue] = useState(0);


  const handleInputChangeForProduct = (event, index) => {
    const value = event.target.value;





    if (index === 0) {

      if (products[index].productName === "") {
        setGlobalValue(indexForList + index)
      } else {

      }


    }
    else if (index === 1) {


      if (products[index].productName === "") {
        setGlobalValue(indexForList + index)
      } else {

      }

    } else {
      if (products[index].productName === "") {
        setGlobalValue(indexForList + 1)
      } else {

      }


    }
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      productName: value,
    };
    setProducts(updatedProducts)
    setInputValueForProduct(value);

    setproductDataInput(filterProductForADD(value));
    fillGSTAndOtherFiledd()


  };

  function fillGSTAndOtherFiledd() {
    let totalfreeQuntity = 0;
    let totalcstInPer = 0;
    let totalcgst = 0;
    let totalsgst = 0;
    let totalsgstInPer = 0;
    let netTotalAmt = 0.00;

    for (let i = 0; i < products.length; i++) {
      alert(products[i].productFreeQuantity)
      totalfreeQuntity = parseInt(totalfreeQuntity) + parseInt(products[i].productFreeQuantity)
    }
    for (let i = 0; i < products.length; i++) {
      totalcstInPer = parseFloat(totalcstInPer) + parseFloat(products[i].productCGST)
    }

    for (let i = 0; i < products.length; i++) {
      totalcgst = parseFloat(totalcgst) + parseFloat(products[i].cGSTInAmount)
    }

    for (let i = 0; i < products.length; i++) {
      totalsgstInPer = parseFloat(totalsgstInPer) + parseFloat(products[i].productSGST)
    }

    for (let i = 0; i < products.length; i++) {
      totalsgst = parseFloat(totalsgst) + parseFloat(products[i].sGSTInAmount)
    }



    for (let i = 0; i < products.length; i++) {
      netTotalAmt = parseFloat(netTotalAmt) + parseFloat(products[i].productTotalAmtWithGST);
    }
    document.getElementById("free").value = totalfreeQuntity.toFixed(2);
    document.getElementById("sgstamt").value = totalsgst.toFixed(2);
    document.getElementById("cgstamt").value = totalcgst.toFixed(2);



    let netpayamt1 = ((parseFloat(netTotalAmt)) - ((((parseFloat(netTotalAmt)) * (parseFloat(purchaseData.discountInPercentageOnPurchase))) / 100)))

    setPurchaseData({
      ...purchaseData,
      totalCgst: totalcstInPer.toFixed(2),
      totalSgst: totalsgstInPer.toFixed(2),
      netPurchaseAmount: netTotalAmt.toFixed(2),
      netPayableAmount: netpayamt1.toFixed(2),
      discountInAmountOnPurchase: (((parseFloat(netTotalAmt)) * (parseFloat(purchaseData.discountInPercentageOnPurchase))) / 100),
      dueAmount: netpayamt1.toFixed(2)

    });


  }

  const handleInputChangeproductSGST = (event, index) => {

    const value = event.target.value;
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      productSGST: value,
    };
    setProducts(updatedProducts)

    let qnt = parseFloat(products[index].productQuantity);
    let rate = parseFloat(products[index].productPurchaseRate);
    let cgst = parseFloat(products[index].productCGST);


    let cgstValue = ((rate * qnt) * cgst) / 100;
    let productRate = (rate * qnt);
    let sgstValue = ((rate * qnt) * value) / 100;
    let finalAmt = productRate + cgstValue + sgstValue;

    updatedProducts[index] = {
      ...updatedProducts[index],
      cGSTInAmount: cgstValue.toFixed(2),
      sGSTInAmount: sgstValue.toFixed(2),
      productTotalAmtWithGST: finalAmt.toFixed(2),
      productBaseAmount: productRate.toFixed(2)


    };
    setProducts(updatedProducts)
    fillGSTAndOtherFiledd();

  }


  const handleInputChangeproductCGST = (event, index) => {
    const value = event.target.value;
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      productCGST: value,
    };
    setProducts(updatedProducts)

    let qnt = parseFloat(products[index].productQuantity);
    let rate = parseFloat(products[index].productPurchaseRate);
    let sgst = parseFloat(products[index].productSGST);


    let cgstValue = ((rate * qnt) * value) / 100;
    let productRate = (rate * qnt);
    let sgstValue = ((rate * qnt) * sgst) / 100;
    let finalAmt = productRate + cgstValue + sgstValue;

    updatedProducts[index] = {
      ...updatedProducts[index],
      cGSTInAmount: cgstValue.toFixed(2),
      sGSTInAmount: sgstValue.toFixed(2),
      productTotalAmtWithGST: finalAmt.toFixed(2),
      productBaseAmount: productRate.toFixed(2)


    };
    setProducts(updatedProducts)
    fillGSTAndOtherFiledd()

  }

  const handleInputChangeproductPurchaseRate = (event, index) => {
    const value = event.target.value;
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      productPurchaseRate: value,
    };
    setProducts(updatedProducts)

    let qnt = parseFloat(products[index].productQuantity);
    let cgst = parseFloat(products[index].productCGST);
    let sgst = parseFloat(products[index].productSGST);


    let cgstValue = ((value * qnt) * cgst) / 100;
    let productRate = (value * qnt);
    let sgstValue = ((value * qnt) * sgst) / 100;
    let finalAmt = productRate + cgstValue + sgstValue;

    updatedProducts[index] = {
      ...updatedProducts[index],
      cGSTInAmount: cgstValue.toFixed(2),
      sGSTInAmount: sgstValue.toFixed(2),
      productTotalAmtWithGST: finalAmt.toFixed(2),
      productBaseAmount: productRate.toFixed(2)


    };
    setProducts(updatedProducts)
    fillGSTAndOtherFiledd()

  }

  const handleInputChangeproductQuantity = (event, index) => {
    const value = event.target.value;
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      productQuantity: value,
    };
    setProducts(updatedProducts)

    let rate = parseFloat(products[index].productPurchaseRate);
    let cgst = parseFloat(products[index].productCGST);
    let sgst = parseFloat(products[index].productSGST);


    let cgstValue = ((value * rate) * cgst) / 100;
    let productRate = (value * rate);
    let sgstValue = ((value * rate) * sgst) / 100;
    let finalAmt = productRate + cgstValue + sgstValue;

    updatedProducts[index] = {
      ...updatedProducts[index],
      cGSTInAmount: cgstValue.toFixed(2),
      sGSTInAmount: sgstValue.toFixed(2),
      productTotalAmtWithGST: finalAmt.toFixed(2),
      productBaseAmount: productRate.toFixed(2)


    };
    setProducts(updatedProducts)
    fillGSTAndOtherFiledd();

  }
  const handleSelectProduct = (productSelect, index) => {

    setSelectedproductDataInput(productSelect);
    setInputValueForProduct(productSelect.productName);


    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],


      productName: productSelect.productName,
      productId: productSelect.id,
      productHSNCode: productSelect.productHSNCode,


      productPackaging: productSelect.productPackaging,
      productCGST: productSelect.productCGST,

      productSGST: productSelect.productSGST,




    };
    setProducts(updatedProducts)




    setproductDataInput([]);

  };

  const filterProductForADD = (input) => {
    return product.filter(product =>
      //manufacturer.name.toLowerCase().includes(input.toLowerCase()) && input.length >= 3
      product.productName && product.productName.toLowerCase().includes(input.toLowerCase()) && input.length >= 3
    );
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




  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      purchase: purchaseData,
      purchaseDetails: products, // Assuming products is your list of PurchaseDetails
    };
    const res = await axios.post("http://localhost:8080/pharmacy/getPurchase", requestData,
      {
        headers: {
          Authorization: "Bearer " + userData.accessToken,
        },
      });
    if (res.status === 200) {



    }

  }
  const [products, setProducts] = useState([
    {

      productName: "",
      productId: "",
      productHSNCode: "",
      productBatch: "",
      expiryDate: "",
      productPackaging: 0,
      productQuantity: 0,
      productFreeQuantity: 0,
      productMRP: 0.0,
      productPurchaseRate: 0.0,
      productDiscount: 0,
      productBaseAmount: 0.0,
      productCGST: 0.0,
      cGSTInAmount: 0.0,
      productSGST: 0.0,
      sGSTInAmount: 0.0,
      productTotalAmtWithGST: 0.0,
      userId: userData.id
    }
  ]);



  const haha = (e, index) => {


  };



  const disInPaid = (e) => {
    const { name, value } = e.target;
    let values = value;
    if (values === null || values === undefined || values === "") {

      values = 0.0;
    }

    let minPricae = (parseFloat(purchaseData.netPayableAmount) - (parseFloat(values)));

    setPurchaseData({
      ...purchaseData,
      paidAmount: value,
      dueAmount: minPricae.toFixed(2)
    });
    minPricae = 0.0;
  }


  const disInPercn = (e) => {

    const { name, value } = e.target;

    let disAmt = (parseFloat(purchaseData.netPurchaseAmount) * value) / 100;

    let finalPurchaseAmt = (parseFloat(purchaseData.netPurchaseAmount) - disAmt);
    let duue = finalPurchaseAmt - (parseFloat(purchaseData.paidAmount))

    setPurchaseData({
      ...purchaseData,
      discountInPercentageOnPurchase: value,
      discountInAmountOnPurchase: disAmt.toFixed(2),
      netPayableAmount: finalPurchaseAmt.toFixed(2),
      dueAmount: duue.toFixed(2)
    });




  };
  const handleInputChange1 = (e, index) => {

    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [name]: value };
    setProducts(updatedProducts);

  };

  const addProduct = () => {
    fillGSTAndOtherFiledd()

    setProducts([
      ...products,
      {
        productName: "",
        productId: "",
        productHSNCode: "",
        productBatch: "",
        expiryDate: "",
        productPackaging: 0,
        productQuantity: 0,
        productFreeQuantity: 0,
        productMRP: 0.0,
        productPurchaseRate: 0.0,
        productDiscount: 0,
        productBaseAmount: 0.0,
        productCGST: 0.0,
        cGSTInAmount: 0.0,
        productSGST: 0.0,
        sGSTInAmount: 0.0,
        productTotalAmtWithGST: 0.0,
        userId: userData.id
      }
    ]);
  };

  const removeProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
    setGlobalValue(indexForList - 1)
    fillGSTAndOtherFiledd()

  };

  return (
    <div className="container p-2" id="supplier">
      <h5 className="text-muted">ADD NEW PURCHASE DETAILS</h5>

      <form onSubmit={handleSubmit}>
        <div className="card" style={{ position: "inherit" }}>
          <h5 className="card-title  text-light p-1">PURCHASE DETAILS</h5>

          <div className="card-body">
            <label className="my-2">BILL TYPE</label>

            <select
              style={{ width: "auto", paddingLeft: "12px" }}
              name="billType"
              className="my-3 mx-5 "

              onChange={(e) => handleInputChangeBILL(e)}

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
            <label className="my-3" style={{ marginLeft: "92px" }}>
              PO NO
            </label>
            <input
              className="my-3 mx-2"
              type="text"
              name="purchasePONumber"
              onChange={(e) => handleInputChange(e)}
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
              onInput={(e) => handleInputChange(e)}

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
            <input className="my-3 mx-5" type="text" name="billNumber"
              onChange={(e) => handleInputChange(e)} />
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
            <button onClick={addProduct}>Add Product</button>
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
                  )}      </div>


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
                value={purchaseData.totalCgst}

              />
              <label className="my-3">S.GST-% TOTAL</label>
              <input
                className="my-3 mx-3 noneset"
                type="text"
                readOnly="true"
                name="totalSgst"
                value={purchaseData.totalSgst}
              />
              <label className="my-3">NET TOTAL AMT</label>
              <input
                className="my-3 mx-3 noneset"
                type="text"
                readOnly="true"
                name="netPurchaseAmount"
                value={purchaseData.netPurchaseAmount}
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
                value={purchaseData.netPurchaseAmount}
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
              <input className="my-3 mx-5  " name="discountInPercentageOnPurchase" value={purchaseData.discountInPercentageOnPurchase} onChange={(e) => disInPercn(e)} type="number" />
              <label className="my-3">DISC IN RS.</label>
              <input
                className="my-3 mx-5  "
                type="number"
                value={purchaseData.discountInAmountOnPurchase}
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

                value={purchaseData.netPayableAmount}
              />
              <label className="my-3">PAID AMT</label>
              <input
                className="my-3 mx-5  "
                type="number"
                name="paidAmount"
                onChange={(e) => disInPaid(e)}
                id="padi"
                value={purchaseData.paidAmount}


              />
              <label className="my-3">DUE AMT</label>
              <input
                className="my-3 mx-5 "
                type="number"
                value={purchaseData.dueAmount}
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
  );
};

export default PurchaseDetails;
