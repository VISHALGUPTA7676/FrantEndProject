import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProductAdd from './components/ProductAdd';
import Header from './components/Header';
import Footer from './components/Footer';
import AddSupplier from './components/AddSupplier';
import { AddProductGroup } from './components/AddProductGroup';
import { ProductCategory } from './components/ProductCategory';

import "./App.css";
import { ProductManufacturer } from './components/ProductManufacturer';
import PurchaseDetails from './components/PurchaseDetails';






// ...
const App = () => {


  return (


    <BrowserRouter>
      <div className="container-fluid">
        
        <Header companyName="Easy Pharma" firstLink="MASTER" secondLink="TRANSACTION" thirdLink="REPORTS" forthLink="PHARMACY" fifthLink="PROFILE" />
        <div  id="MainContent">
        <Routes>
          
          <Route path="/" element={<Login />} />
          <Route path='/addProduct' element={<ProductAdd />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/addSupplier' element={<AddSupplier />} />
          <Route path='/product/addProductGroup' element={<AddProductGroup />} />
          <Route path='/product/productCategory' element={<ProductCategory />} />
          <Route path='/product/productManufacturer' element={<ProductManufacturer />} />
          <Route path='/purchase/addPurchase' element={<PurchaseDetails/>} />
        </Routes>

        </div>
        <Footer/>

      </div>  </BrowserRouter>

  );
};

export default App;
