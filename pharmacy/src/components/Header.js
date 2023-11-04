import { NavLink } from "react-router-dom";
import "../Components_css/Header.css"
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Header(props) {

    const userDataString = localStorage.getItem('user');
 const userData = JSON.parse(userDataString);
 const user = userData.username;
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("user") === null) {
            navigate("/");
        } else {

        }
    })


    return (

        <div id="headerfixed">
            <nav className="navbar navbar-expand-lg navbar-light  bg-danger ">
                <div className="container-fluid" id="logoId">
                    <a className="navbar" href="/" style={{ fontFamily: "sans-serif", fontWeight: "bold" }} id="logoId">
                        {props.companyName}
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarText"
                        aria-controls="navbarText"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <div className="dropdown" style={{ paddingLeft: "12px" }}>
                            <button className="btn btn-danger " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                MASTER
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ width: "40vw", backgroundColor: "#72b4ee" }}>
                                <li><NavLink to='/addProduct' className="dropdown-item" activeStyle>
                                    PRODUCT
                                </NavLink></li>
                                <li><NavLink to='/product/addProductGroup' className="dropdown-item" activeStyle>
                                    PRODUCT GROUP
                                </NavLink></li>
                                <li><NavLink to='/product/productCategory' className="dropdown-item" activeStyle>
                                    PRODUCT CATEGORY
                                </NavLink></li>
                                <li><NavLink to='/product/productManufacturer' className="dropdown-item" activeStyle>
                                    PRODUCT MANUFACTURER
                                </NavLink></li>
                                <li><NavLink to='/addSupplier' className="dropdown-item" activeStyle>
                                    SUPPLIER
                                </NavLink></li>

                                {/*<li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>*/}
                            </ul>
                        </div>
                        <div className="dropdown" style={{ paddingLeft: "12px" }}>
                            <button className="btn btn-danger" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                TRANSACTION
                            </button>

                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ width: "40vw", backgroundColor: "#72b4ee" }}>
                                <li><NavLink to='/purchase/addPurchase' className="dropdown-item" activeStyle>
                                    Purchase
                                </NavLink></li>
                                <li><NavLink to='/sale/newSale' className="dropdown-item" activeStyle>
                                    sale
                                </NavLink></li>
                                {/* <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                            </ul>
                        </div>
                        <div className="dropdown" style={{ paddingLeft: "12px" }}>
                            <button className="btn btn-danger" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                REPORTS
                            </button>

                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ width: "40vw", backgroundColor: "#72b4ee" }}>
                                <li><NavLink to='/' className="dropdown-item" activeStyle>
                                    SALES REPORTS
                                </NavLink></li>
                                <li><NavLink to='/sale/newSale' className="dropdown-item" activeStyle>
                                    PURCHASE REPORTS
                                </NavLink></li>
                                {/* <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                            </ul>
                        </div>
                        
                            <div className="dropdown" style={{marginLeft:"10px",paddingLeft:"571px"}}>
                                <button className="btn btn-danger " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {"WELCOME: "+ user}
                                </button>
                                <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton1" style={{marginLeft:"10px",marginLeft:"571px",backgroundColor:"none"}}>
                                    <li className="nav-item" id="right-side-bar">
                                        <a className="nav-link" >
                                            LOGOUT
                                        </a>
                                    </li>
                                </ul>
                            </div>

                    </div>
                </div>
            </nav>

        </div>
    )
}





