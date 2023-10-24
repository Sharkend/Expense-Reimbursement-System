import Navbar from "../components/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { Link } from "react-router-dom";


const HomePage = () => {
    //Initialize logged-in user
    const navigate = useNavigate();
    const email = Cookies.get("username");
    const password = Cookies.get("password");
    const name = Cookies.get("name");
    const manager = Cookies.get("manager") == "true";
    const empId = Cookies.get("empId");

    useEffect(() => {
        if (!email) navigate('/login');
        
    }, []);

    return (
        <>
            <Navbar />
            {/* Homepage */}
            <div className="jumbotron">
                <h1 className="display-4">Hello, {name}</h1>
                <p className="lead">The Expense Reimbursement System will manage all reimbursements to employees for expenses incurred for business purposes.</p>
                <hr className="my-4" />
                <p>The following features are enabled for all {manager ? "managers" : "associates"}:</p>
                <p className="lead">
                    <Link className="btn btn-dark btn-lg" to="/reimbursement" role="button">Manage Reimbursements</Link>
                    <Link className="btn btn-dark btn-lg ml-3" to="/profile" role="button">Edit Profile</Link>
                </p>
            </div>
            <p>{ }</p>
        </>
    );
}

export default HomePage;