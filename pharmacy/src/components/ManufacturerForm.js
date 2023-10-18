import React, { useState } from 'react';

const ManufacturerForm = () => {

  const [inputValue, setInputValue] = useState('');
  const [rows, setRows] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddRow = () => {
    if (inputValue.trim() !== '') {
      setRows([...rows, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleAddRow}>Add Row</button>
      <table>
        <tbody>
          {rows.map((row=1, index=1) => (
            <tr key={index}>
              <td>{row}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
