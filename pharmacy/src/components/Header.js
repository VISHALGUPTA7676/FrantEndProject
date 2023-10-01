import { NavLink } from "react-router-dom";
import "../Components_css/Header.css"
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Header(props) {
    
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
                    <a className="navbar" href="/" id="logoId">
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
                        <div className="dropdown">
                            <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                MASTER
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><NavLink to='/addProduct' className="dropdown-item"  activeStyle>
                                    ADD NEW PRODUCT
                                </NavLink></li>
                                <li><NavLink to='/product/addProductGroup' className="dropdown-item"  activeStyle>
                                    PRODUCT GROUP
                                </NavLink></li>
                                <li><NavLink to='/product/productCategory' className="dropdown-item" activeStyle>
                                    PRODUCT CATEGORY
                                </NavLink></li>
                                <li><NavLink to='/product/productManufacturer' className="dropdown-item" activeStyle>
                                    PRODUCT MANUFACTURER
                                </NavLink></li>
                                <li><NavLink to='/addSupplier' className="dropdown-item" activeStyle>
                                    ADD NEW SUPPLIER
                                </NavLink></li>
                                <li><NavLink to='/purchase/addPurchase' className="dropdown-item" activeStyle>
                                    Purchase
                                </NavLink></li>
                                {/*<li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>*/}
                            </ul>
                        </div>
                        <div className="dropdown">
                            <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown button
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                               {/* <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                            </ul>
                        </div>{/*
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">

                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/">
                                    {props.secondLink}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">
                                    {props.thirdLink}
                                </a>
                            </li>

                            <li className="nav-item" id="right-side-bar">
                                <a className="nav-link" href="/">
                                    {props.forthLink}
                                </a>
                            </li>
                            <li className="nav-item" id="right-side-bar">
                                <a className="nav-link" href="/">
                                    {props.fifthLink}
                                </a>
                            </li>
                        </ul>
                        */}

                    </div>
                </div>
            </nav>

        </div>
    )
}





