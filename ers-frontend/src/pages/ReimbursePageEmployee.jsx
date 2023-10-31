import Navbar from "../components/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const ReimbursePageEmployee = () => {
    const navigate = useNavigate();
    const empId = Cookies.get("empId");
    const manager = Cookies.get("manager") == "true";
    const [rs, setRs] = useState([]);
    const [eId, setEId] = useState("");

    function fetchAllFilter(status) {
        if (eId == "")
            axios.get("http://localhost:9000/api/reimbursement" + (status == true || status == false ? ("/employee?status=" + status) : ''))
                .then((response) => {
                    setRs(response.data)
                    console.log(response.data)
                })
                .catch((error) => console.log(error));
        else
            axios.get("http://localhost:9000/api/reimbursement/" + eId + (status == true || status == false ? ("?status=" + status) : ''))
                .then((response) => {
                    setRs(response.data)
                    console.log(response.data)
                })
                .catch((error) => console.log(error));
    }

    function approve(r, status) {
        if (status == true) {
            r.status = status;
            axios.put("http://localhost:9000/api/reimbursement/" + r.id, r)
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => console.log(error));
        } else
            axios.delete("http://localhost:9000/api/reimbursement/" + r.id)
            .then((response) => {
                console.log(response.data);
                fetchAllFilter(true);
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        if (!manager)
            navigate("/");
        else
            fetchAllFilter();
    }, []);

    const handleEid = (e) => { setEId(e.target.value); console.log(eId); }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            fetchAllFilter();
        }
    };

    return (
        <>
            <Navbar />
            <h1 className="text-center mx-5 my-3"> Employee Reimbursements </h1>
            {/* <FooterFilter manager={manager}/> */}
            <div className="row mx-4">
                {rs.map((r, index) => (
                    <div className="card col-md-3 mx-2 my-3"  key={index}>
                        <div className="card-body">
                            <h5 className="card-title">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-currency-rupee mb-1" viewBox="0 0 16 16">
                                    <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
                                </svg>
                                {r.amount}
                            </h5>
                            <h6 className={`card-subtitle mb-2 ${r.status ? 'text-success' : 'text-muted'}`}>#SL{r.id}RS23</h6>
                            <p className="card-text">{r.description}</p>
                            {!r.status && <Link onClick={() => approve(r, true)} className="card-link text-success" >Approve</Link>}
                            {!r.status && <Link onClick={() => approve(r, false)} className="card-link text-danger" >Deny</Link>}
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
                            <Link className="nav-link" onClick={fetchAllFilter}>All </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => fetchAllFilter(false)}>Pending</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => fetchAllFilter(true)}>Resolved</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item mr-2">
                            <Link className="nav-link" to="/reimbursement">Self View</Link>
                        </li>
                        <li className="nav-item">
                            <input
                                className="form-control mr-sm-2"
                                type="text"
                                value={eId}
                                onChange={handleEid}
                                onKeyDown={handleKeyDown}
                            />
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default ReimbursePageEmployee;