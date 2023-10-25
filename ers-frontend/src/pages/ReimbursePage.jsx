import Navbar from "../components/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import FooterFilter from "../components/FooterFilter";

const ReimbursePage = () => {
    const navigate = useNavigate();
    const empId = Cookies.get("empId");
    const manager = Cookies.get("manager") == "true";

    function fetchAllFilter(status) {
        axios.get("http://localhost:9000/api/reimbursement/" + empId + (status == true || status == false ? ("?status=" + status) : ''))
            .then((response) => {
                setRs(response.data)
                console.log(response.data)
            })
            .catch((error) => console.log(error));
    }


    useEffect(() => {
        if (!empId) navigate('/login');
        else fetchAllFilter();
    }, []);

    const [rs, setRs] = useState([]);
    const [activeR, setActiveR] = useState({});
    return (
        <>
            <Navbar />
            <h1 className="text-center mx-5 my-3"> My Reimbursements </h1>
            {/* <FooterFilter manager={manager}/> */}
            <div className="row mx-4">
                {rs.map((r, index) => (
                    <div className="card col-md-3 mx-2 my-3">
                        <div className="card-body" key={index}>
                            <h5 className="card-title">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-currency-rupee mb-1" viewBox="0 0 16 16">
                                    <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
                                </svg>
                                {r.amount}
                            </h5>
                            <h6 className={`card-subtitle mb-2 ${r.status ? 'text-success' : 'text-muted'}`}>#SL{r.id}RS23</h6>
                            <p className="card-text">{r.description}</p>
                            {!r.status && <Link to={`/reimbursement/${r.id}`} className="card-link text-info" data={r}>Edit</Link> }
                            <Link to="#" className="card-link text-danger">Delete</Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Filters (sticky) */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-bottom">
                <Link className="navbar-brand" to="#">Filter: </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" onClick={fetchAllFilter}>All </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => fetchAllFilter(false)}>Pending</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => fetchAllFilter(true)}>Resolved</Link>
                        </li>
                    </ul>
                    <button className="btn btn-light">Create</button>
                    <ul className="navbar-nav ml-auto" >
                        {manager &&
                            (<li className="nav-item">
                                <Link className="nav-link" to="/reimbursement/employee">Employee View</Link>
                            </li>)
                        }
                    </ul>
                </div>
            </nav >
        </>
    );
}

export default ReimbursePage;