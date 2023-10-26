import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const EmployeePage = () => {
    const navigate = useNavigate();
    const manager = Cookies.get("manager");
    const [empList, setEmpList] = useState([]);

    useEffect(() => {
        if (!manager) navigate("/");
        else {
            axios.get("http://localhost:9000/api/employee")
            .then((response) => {
                setEmpList(response.data);
            });
        }
    }, []);
    
    return ( 
        <>
            <Navbar />
            <table className="table table-bordered table-striped">
                <thead className="">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Employee ID</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        empList.map((emp, index) => (
                            <tr key={index}>
                                <td>{emp.name}</td>
                                <td>{emp.email}</td>
                                <td>{emp.manager ? "Manager" : "Associate"}</td>
                                <td>{emp.empId}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}

export default EmployeePage;