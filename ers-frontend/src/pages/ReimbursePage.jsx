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
    const [rs, setRs] = useState([]); //reimbursements
    const [status, setStatus] = useState(); //to remember the filter in fetchAllFilter after a deletion

    function fetchAllFilter(status) {
        console.log(status);
        axios.get("http://localhost:9000/api/reimbursement/" + empId + (status == true || status == false ? ("?status=" + status) : ''))
            .then((response) => {
                setRs(response.data)
                console.log(response.data)
            })
            .catch((error) => console.log(error));
    }
    function delR(r) {
        axios.delete("http://localhost:9000/api/reimbursement/" + r.id)
            .then((response) => {
                console.log(response.data);
                fetchAllFilter(status);
            })
            .catch((error) => console.log(error));
    }


    useEffect(() => {
        if (!empId) navigate('/login');
        else fetchAllFilter();
    }, []);


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
                            {!r.status && <Link to={`/reimbursement/${r.id}`} className="card-link text-info" data={r}>Edit</Link>}
                            <Link onClick={() => delR(r)} className="card-link text-danger">Delete</Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Filters (sticky) */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-bottom">
                <Link className="navbar-brand" to="#">Tools: </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <button className="nav-link btn btn-link" onClick={fetchAllFilter}>All </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={() => { setStatus(false); fetchAllFilter(false) }}>Pending</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={() => { setStatus(true); fetchAllFilter(true) }}>Resolved</button>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto" >
                        <button className="btn btn-light">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" fill="currentColor" className="bi bi-plus-circle mb-1" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg> Create
                        </button>
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