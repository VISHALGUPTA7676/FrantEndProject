import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

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
    return (
        <div>
            <button onClick={logout}>LOGOUT</button>
            <div className="container">
                <h2>Data table</h2>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>ID</th>
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
        </div>

    )
}

export default Dashboard