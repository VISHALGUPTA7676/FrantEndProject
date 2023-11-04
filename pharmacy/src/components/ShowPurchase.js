import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import "../Components_css/Supplier.css"
import "../Components_css/ShowSupplier.css"
import { useNavigate } from 'react-router-dom';

export const ShowPurchase = () => {
    const navigate = useNavigate();
    const userDataString = localStorage.getItem('user');
    // Parse the JSON string to an object
    const userData = JSON.parse(userDataString);

    const [purchase, setPurchase] = useState([]);


    useEffect(() => {
        loadPurchaseData();
        if (localStorage.getItem("user") === null) {
            navigate("/")
        }
    }, [])


    const unixTimestamp = "";

    const loadPurchaseData = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8080/pharmacy/showPurchase/" + userData.id,
                {
                    headers: {
                        'Authorization': 'Bearer ' + userData.accessToken,
                    }
                }
            );


            if (res.status === 200) {

                console.log(JSON.stringify(res.data));
                setPurchase(res.data);
                
                unixTimestamp=res.data.purchaseDate;
                


            } else {
                // Handle other response statuses (e.g., 4xx or 5xx errors)
                console.error("Request failed with status:", res.status.toUpperCase());
            }
        } catch (error) {
            // Handle network errors or exceptions here
            console.error("An error occurred:", error);
        }
    }

    
    
    const date = new Date(1698289849833);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    const seconds = date.getSeconds();
    const formattedDate = `${year}-${month}-${day} `;
    function NamedNodeMap(id){
        

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
                            <th colSpan="5"><h5>PRODUCT LIST</h5></th>
                            <th colSpan="3" id="showList"><button><Link to="/addProduct"></Link></button></th>
                        </tr>
                        <tr>
                            <th style={{ borderBottom: '2px solid rgb(5, 5, 5)' }}>DATE</th>
                            <th style={{ borderBottom: '2px solid rgb(5, 5, 5)' }}>BILL NO.</th>
                            <th style={{ borderBottom: '2px solid rgb(5, 5, 5)' }}>BILL TYPE</th>
                            <th style={{ borderBottom: '2px solid rgb(5, 5, 5)' }}>SUPPLIER</th>
                            <th style={{ borderBottom: '2px solid rgb(5, 5, 5)' }}>AMOUNT</th>
                            <th style={{ borderBottom: '2px solid rgb(5, 5, 5)' }}>BILL CREATED DATE</th>
                            <th style={{ borderBottom: '2px solid rgb(5, 5, 5)' }}>ACTION</th>

                        </tr>

                    </thead>
                    <tbody>


                        {
                            purchase.map(purchase => (

                                <tr style={{ height: '42px' }}>
                                    {NamedNodeMap(purchase.purchaseDate)}
                                    <td style={{ borderBottom: '1px solid rgb(5, 5, 5)' }}>{formattedDate}</td>
                                    <td style={{ borderBottom: '1px solid rgb(5, 5, 5)' }}>{purchase.billNumber}</td>
                                    <td style={{ borderBottom: '1px solid rgb(5, 5, 5)' }}>{purchase.billType}</td>
                                    <td style={{ borderBottom: '1px solid rgb(5, 5, 5)' }}>{purchase.supplier}</td>
                                    <td style={{ borderBottom: '1px solid rgb(5, 5, 5)' }}>{purchase.netPayableAmount}</td>
                                    <td style={{ borderBottom: '1px solid rgb(5, 5, 5)' }}>{purchase.purchaseDate}</td>
                                    <td style={{ borderBottom: '1px solid rgb(5, 5, 5)' }}><Link to={`/product/editProduct/${purchase.id}`} style={{ textDecoration: 'none' }}>DELETE</Link></td>
                                    <td style={{ borderBottom: '1px solid rgb(5, 5, 5)' }}><Link to={`/product/editProduct/${purchase.id}`} style={{ textDecoration: 'none' }}>SHOW</Link></td>
                                    <td style={{ borderBottom: '1px solid rgb(5, 5, 5)' }}><Link to={`/product/editProduct/${purchase.id}`} style={{ textDecoration: 'none' }}>Edit</Link></td>
                                </tr>

                            ))
                        }


                    </tbody>

                </table>
            </form>
        </div>
    )
}
