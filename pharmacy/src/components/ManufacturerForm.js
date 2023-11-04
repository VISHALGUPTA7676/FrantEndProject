import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManufacturerForm = () => {
  
  const userData = { id: 1 }; // Replace this with your actual user data or fetch it from an API
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/")
    }
  }, [])
  
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



  

  const handleInputChange = (e, index) => {
    alert(index)
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [name]: value };
    setProducts(updatedProducts);
    alert("Hi  +  " + JSON.stringify(products));
  };

  const addProduct = () => {
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
  };

  return (
    <div>
      {products.map((product, index) => (
        <div key={index}>
          <h2>Product {index + 1}</h2>
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={(e) => handleInputChange(e, index)}
          />
          {/* Add other input fields for product properties */}
          <button onClick={() => removeProduct(index)}>Remove</button>
        </div>
      ))}
      <button onClick={addProduct}>Add Product</button>
    </div>
    
  );
};

//   const initialManufacturers = [
//     { id: 1, name: 'Manufacturer A' },
//     { id: 2, name: 'Manufacturer B' },
//     { id: 3, name: 'Manufacturer C' },
//     { id: 4, name: 'VIs C' },
//     { id: 5, name: 'visja C' },
//     // ... more manufacturers
//   ];

//   const [inputValue, setInputValue] = useState('');
//   const [manufacturers, setManufacturers] = useState([]);
//   const [selectedManufacturer, setSelectedManufacturer] = useState(null);

//   const filterManufacturers = (input) => {
//     return initialManufacturers.filter(manufacturer =>
//       manufacturer.name.toLowerCase().includes(input.toLowerCase()) && input.length >= 3
//     );
//   };

//   const handleInputChange = (event) => {
//     const value = event.target.value;
//     setInputValue(value);
//     setManufacturers(filterManufacturers(value));
//   };

//   const handleSelectManufacturer = (manufacturer) => {
//     setSelectedManufacturer(manufacturer);
//     setInputValue(manufacturer.name);
//     setManufacturers([]);
//   };

//   return (
//     <div>
//       <label>
//         Manufacturer Name:
//         <input
//           type="text"
//           value={inputValue}
//           onChange={handleInputChange}
//           placeholder="Search for a manufacturer..."
//         />
//       </label>
//       <div style={{position: "absolute",
//     zIndex: 1,
//     maxHeight: "200px",}}>

//       {manufacturers.length > 0 && (
//         <ul>
//           {manufacturers.map(manufacturer => (
//             <li key={manufacturer.id} onClick={() => handleSelectManufacturer(manufacturer)}>
//               {manufacturer.name}
//             </li>
//           ))}
//         </ul>
//       )}

// </div>
//       {selectedManufacturer && (
//         <div>
//           {/* Display selected manufacturer information */}
//           Selected Manufacturer: {selectedManufacturer.name} (ID: {selectedManufacturer.id})

//           {/* Hidden input to store selected ID */}
//           <input type="hidden" value={selectedManufacturer.id} />
//         </div>
//       )}
//     </div>
//   );
// };

export default ManufacturerForm;
