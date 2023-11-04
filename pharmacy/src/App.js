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
import { ShowSupplier } from './components/ShowSupplier';
import { EditSupplier } from './components/EditSupplier';
import ShowManufacturer from './components/ShowManufacturer';
import { EditManufacture } from './components/EditManufacture';
import { ShowProduct } from './components/ShowProduct';
import { EditProduct } from './components/EditProduct';
import { EditProductGroup } from './components/EditProductGroup';
import { ShowProductGroup } from './components/ShowProductGroup';
import { ShowCategory } from './components/ShowCategory';
import { EditCategory } from './components/EditCategory';
import ManufacturerForm from './components/ManufacturerForm';
import { Sales } from './components/Sales';
import MaybeShowNavBar from './components/MaybeShowNavBar';
import { ShowPurchase } from './components/ShowPurchase';





// ...
const App = () => {
 

  return (


    <BrowserRouter>
      <MaybeShowNavBar>
        <Header companyName="Easy Pharma" firstLink="MASTER" secondLink="TRANSACTION" thirdLink="REPORTS"  fifthLink="PROFILE"  />
      </MaybeShowNavBar>
      <div className="container-fluid">


        <div id="MainContent" >
          <Routes>

            <Route path="/" element={<Login />} />
            <Route path='/addProduct' element={<ProductAdd />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/addSupplier' element={<AddSupplier />} />
            <Route path='/product/addProductGroup' element={<AddProductGroup />} />
            <Route path='/product/productCategory' element={<ProductCategory />} />
            <Route path='/product/productManufacturer' element={<ProductManufacturer />} />
            <Route path='/purchase/addPurchase' element={<PurchaseDetails />} />
            <Route path='/supplier/showSupplier/' element={<ShowSupplier />} />
            <Route path='/supplier/editSupplier/:id' element={<EditSupplier />} />
            <Route path='/manufacturer/showManufacture' element={<ShowManufacturer />} />
            <Route path='/manufacturer/editManufacture/:id' element={<EditManufacture />} />
            <Route path='/product/showProduct' element={<ShowProduct />} />
            <Route path='/product/editProduct/:id' element={<EditProduct />} />
            <Route path='/productGroup/editProductGroup/:id' element={<EditProductGroup />} />
            <Route path='/productGroup/showProductGroup' element={<ShowProductGroup />} />
            <Route path='/productGroup/showProductCategory' element={<ShowCategory />} />
            <Route path='/productCategory/editProductCategory/:id' element={<EditCategory />} />
            <Route path='/sale/newSale' element={<Sales />} />
            <Route path='/purchase/showPurchase' element={<ShowPurchase />} />

            <Route path='/demo' element={<ManufacturerForm />} />

          </Routes>

        </div>
        <Footer />

      </div>  </BrowserRouter>

  );
};

export default App;
