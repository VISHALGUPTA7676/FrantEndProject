import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Dashboard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("user") == null) {
            navigate("/")
        }
    }, [])
    const logout=()=>{
        localStorage.removeItem("user");
        navigate("/")
    }
    //const userDataString = localStorage.getItem('user');

    // Parse the JSON string to an object
    //const userData = JSON.parse(userDataString);
    //alert(userData.id);
    return (
        <div>
            <Header companyName="Easy Pharma" firstLink="MASTER" secondLink="TRANSACTION" thirdLink="REPORTS" forthLink="PHARMACY" fifthLink="PROFILE" />
            <button onClick={logout}>LOGOUT</button>
            <div className="container">
                <h2>Data table</h2>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>I1D</th>
                            <th>E-mail</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* <td>1</td>
                            <td>{username}</td>
                            <td>{password}</td> */}
                        </tr>
                    </tbody>
                </table>
            </div>
            <Footer/>
        </div>

    )
}

export default Dashboard