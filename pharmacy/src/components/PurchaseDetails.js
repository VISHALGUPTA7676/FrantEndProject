import React, { useState } from "react";
import "../Components_css/PurchaseDetails.css";

const PurchaseDetails = () => {
  // today's date code
  const [date, setDate] = useState(new Date());

  const handleDateChange = (event) => {
    setDate(new Date(event.target.value));
  };

  const formattedDate = date.toISOString().substr(0, 10);

  // table data code
  const data = [
    {
      id: 1,
      productName: "Product 1",
      hsn: "HSN1",
      batch: "Batch1",
      expDate: "01/01/2022",
      pkg: "Pkg1",
      qty: 10,
      freeQty: 2,
      mrp: 100,
      rate: 80,
      discPercent: 10,
      disc: 8,
      base: 72,
      amt: 720,
      cgstPercent: 9,
      cgstRs: 64.8,
      sgstPercent: 9,
      sgstRs: 64.8,
      totalAmt: 849.6,
    },
    {
      id: 2,
      productName: "Product 2",
      hsn: "HSN2",
      batch: "Batch2",
      expDate: "02/01/2022",
      pkg: "Pkg2",
      qty: 20,
      freeQty: 4,
      mrp: 200,
      rate: 160,
      discPercent: 10,
      disc: 16,
      base: 144,
      amt: 2880,
      cgstPercent: 9,
      cgstRs: 259.2,
      sgstPercent: 9,
      sgstRs: 259.2,
      totalAmt: 3398.4,
    },
    {
      id: 3,
      productName: "Product 3",
      hsn: "HSN3",
      batch: "Batch3",
      expDate: "03/01/2022",
      pkg: "Pkg3",
      qty: 30,
      freeQty: 6,
      mrp: 300,
      rate: 240,
      discPercent: 10,
      disc: 24,
      base: 216,
      amt: 6480,
      cgstPercent: 9,
      cgstRs: 583.2,
      sgstPercent: 9,
      sgstRs: 583.2,
      totalAmt: 8050.4,
    },
  ];
  // discount total code
  const discountTotal = data.reduce((total, product) => {
    return total + product.disc;
  }, 0);

  // Calculate the total free quantity
  const totalFreeQty = data.reduce((total, product) => {
    return total + product.freeQty;
  }, 0);
  // Calculate the total cgst
  const cgstTotal = data.reduce((total, product) => {
    return total + product.cgstRs;
  }, 0);
  // Calculate the total sgst

  const sgstTotal = data.reduce((total, product) => {
    return total + product.sgstRs;
  }, 0);
  // Calculate the total net amount
  const netTotalAmt = data.reduce((total, product) => {
    return total + product.totalAmt;
  }, 0);

  // Initialize the amount paid and due amount and round off to 2 decimal places
  const [canceldata, setCancelData] = useState([0]);
  const [paidAmt, setPaidAmt] = useState(0);
  const [creditNote, setCreditNote] = useState(0);
  const [roundOff, setRoundOff] = useState(0);
  const dueAmt = netTotalAmt + cgstTotal + sgstTotal - paidAmt;

  // Update the due amount whenever the amount paid changes
  const handlePaidAmtChange = (event) => {
    setPaidAmt(parseFloat(event.target.value));
  };
  const handleCreditNoteChange = (event) => {
    setCreditNote(parseFloat(event.target.value));
  };
  const handleRoundOffChange = (event) => {
    setRoundOff(parseFloat(event.target.value));
  };
  const handleDueAmtChange = (event) => {
    // Do nothing - the due amount is read-only
  };

  const handleCancel = () => {
    // Reset the form to its initial state
    setCancelData([
      
    ]);
    setPaidAmt(0);
    setCreditNote(0);
    setRoundOff(0);
  };

  return (
    <div className="container p-2">
      <h5 className="text-muted">ADD NEW PURCHASE DETAILS</h5>
      <hr />
      <form>
        <div className="card">
          <h5 className="card-title  text-light p-1">PURCHASE DETAILS</h5>

          <div className="card-body">
            <label className="my-3">BILL TYPE</label>
            <input className="my-3 mx-5" type="text" />
            <label className="my-3">PO NO</label>
            <input
              className="my-3 mx-5"
              type="text"
              placeholder="Search P.O Number"
            />
            <label className="my-3">DATE</label>
            <input
              className="my-3 mx-5"
              type="date"
              value={formattedDate}
              onChange={handleDateChange}
            />
            <br />
            <label className="my-3">NAME</label>
            <input className="my-3 mx-5" type="text" />
            <label className="my-3">BILL NO</label>
            <input className="my-3 mx-5" type="text" />
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
                  <th className="head-cell">#</th>
                  <th className="head-cell">PRODUCT NAME</th>
                  <th className="head-cell">HSN</th>
                  <th className="head-cell">BACTH</th>
                  <th className="head-cell">EXP DT.</th>
                  <th className="head-cell">PKG</th>
                  <th className="head-cell">QTY</th>
                  <th className="head-cell">FREE QTY</th>
                  <th className="head-cell">M.R.P</th>
                  <th className="head-cell">RATE</th>
                  <th className="head-cell">DISC(%)</th>
                  <th className="head-cell">DISC</th>
                  <th className="head-cell">BASE</th>
                  <th className="head-cell">AMT</th>
                  <th className="head-cell">C.GST(%)</th>
                  <th className="head-cell">C.GST(RS)</th>
                  <th className="head-cell">S.GST(%)</th>
                  <th className="head-cell">S.GST(RS)</th>
                  <th className="head-cell">AMT</th>
                </tr>
              </thead>
              <tbody>
                {data.map((product) => (
                  <tr key={product.id}>
                    <td className="table-cell">{product.id}</td>
                    <td className="table-cell">{product.productName}</td>
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
                ))}
              </tbody>
            </table>
            <div className="totalset">
              <label className="my-3 ">DISC.TOTAL</label>
              <input
                className="my-3 mx-3 noneset"
                type="text"
                readOnly="true"
                value={discountTotal}
              />
              <label className="my-3">FREE QTY</label>
              <input
                className="my-3 mx-3 noneset"
                type="text"
                readOnly="true"
                value={totalFreeQty}
              />
              <label className="my-3">C.GST TOTAL</label>
              <input
                className="my-3 mx-3 noneset"
                type="text"
                readOnly="true"
                value={cgstTotal}
              />
              <label className="my-3">S.GST TOTAL</label>
              <input
                className="my-3 mx-3 noneset"
                type="text"
                readOnly="true"
                value={sgstTotal}
              />
              <label className="my-3">NET TOTAL AMT</label>
              <input
                className="my-3 mx-3 noneset"
                type="text"
                readOnly="true"
                value={netTotalAmt}
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
              value={netTotalAmt}
              readOnly="true"
            />
            <label className="my-3">DISC. TOTAL</label>
            <input
              className="my-3 mx-5  noneset"
              type="number"
              value={discountTotal}
              readOnly="true"
            />
            <label className="my-3">C.GST TOTAL</label>
            <input
              className="my-3 mx-5  noneset"
              type="number"
              value={cgstTotal}
            />
            <label className="my-3">S.GST TOTAL</label>
            <input
              className="my-3 mx-5  noneset"
              type="number"
              value={sgstTotal}
            />
            <label className="my-3">DISC(%)</label>
            <input className="my-3 mx-5  noneset" type="number" />
            <label className="my-3">CREDIT NOTE</label>
            <input
              className="my-3 mx-5  noneset"
              type="number"
              value={creditNote}
              onChange={handleCreditNoteChange}
            />
            <label className="my-3">ROUND OFF</label>
            <input
              className="my-3 mx-5  noneset"
              type="number"
              value={roundOff}
              onChange={handleRoundOffChange}
            />
            <label className="my-3">NET PAYABLE AMT</label>
            <input
              className="my-3 mx-5  noneset"
              type="number"
              value={netTotalAmt + cgstTotal + sgstTotal}
            />
            <label className="my-3">PAID AMT</label>
            <input
              className="my-3 mx-5  noneset"
              type="number"
              value={paidAmt}
              onChange={handlePaidAmtChange}
            />
            <label className="my-3">DUE AMT</label>
            <input
              className="my-3 mx-5  noneset"
              type="number"
              value={dueAmt}
              onChange={handleDueAmtChange}
            />
            </div>
            
          </div>
          <div className="buttonset">
          <input className="m-5 button bg-dark text-light" type="submit" value="SUBMIT" /> 
          <input className="m-5 button bg-dark text-light" type="button" value="CANCEL" onClick={handleCancel} />
          </div>
          
        </div>
      </form>
    </div>
  );
};

export default PurchaseDetails;
