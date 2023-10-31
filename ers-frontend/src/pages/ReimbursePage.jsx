//TODO clean up reused code into functions
import Navbar from "../components/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const ReimbursePage = () => {
    const navigate = useNavigate();
    const empId = Cookies.get("empId");
    const manager = Cookies.get("manager") == "true";
    const [rs, setRs] = useState([]); //reimbursements
    const [status, setStatus] = useState(); //to remember the filter in fetchAllFilter after a deletion

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [editData, setEditData] = useState({});

    function fetchAllFilter(status) {
        console.log(status);
        axios.get("http://localhost:9000/api/reimbursement/" + empId + (status == true || status == false ? ("?status=" + status) : ''))
            .then((response) => {
                setRs(response.data)
                console.log(response.data)
            })
            .catch((error) => console.log(error));
    }
    function handleDelete(r) {
        if (window.confirm("Delete this reimbursement?"))
            axios.delete("http://localhost:9000/api/reimbursement/" + r.id)
                .then((response) => {
                    console.log(response.data);
                    fetchAllFilter(status);
                })
                .catch((error) => console.log(error));
    }

    const handleCreate = (event) => {
        event.preventDefault();
        function isNumberString(string) {
            const regex = /^\d+(\.\d+)?$/;
            return regex.test(string);
        }

        // Submit the form data to the server.
        const _amount = document.querySelector("#amount").value;
        const _desc = document.querySelector("#message-text").value;
        console.log(_amount + " " + _desc);
        if (!isNumberString(amount) || _desc == "") alert("Please fill the amount in INR and provide a valid description.");
        else {
            axios.post("http://localhost:9000/api/reimbursement/" + empId, {
                "amount": _amount,
                "status": "false",
                "description": _desc
            }).then(
                window.location.reload()
            );
            // const modal = document.querySelector("#exampleModal");
            // modal.modal('hide');
            //^jQuery not working?
            setAmount("");
            setDescription("");
        }
    };

    const handleEdit = (event) => {
        event.preventDefault();
        function isNumberString(string) {
            const regex = /^\d+(\.\d+)?$/;
            return regex.test(string);
        }
        // Submit the form data to the server.
        const _amount = document.querySelector("#amount2").value;
        const _desc = document.querySelector("#message-text2").value;
        console.log(_amount + " " + _desc);
        if (!isNumberString(amount) || _desc == "") alert("Please fill the amount in INR and provide a valid description.");
        else {
            axios.put("http://localhost:9000/api/reimbursement/" + editData.id, { //change empId to Rid
                "amount": _amount,
                "status": "false",
                "description": _desc
            }).then(
                window.location.reload()
            );
            setAmount("");
            setDescription("");
        }
    };

    useEffect(() => {
        if (!empId) navigate('/login');
        else fetchAllFilter();
    }, []);


    return (
        <>
            <Navbar />
            <h1 className="text-center mx-5 my-3"> My Reimbursements </h1>
            <div className="row mx-4">
                {rs.map((r, index) => (
                    <div className="card col-md-3 my-3 mx-2">
                        <div className="card-body" key={index}>
                            <h5 className="card-title">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-currency-rupee mb-1" viewBox="0 0 16 16">
                                    <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
                                </svg>
                                {r.amount}
                            </h5>
                            <h6 className={`card-subtitle mb-2 ${r.status ? 'text-success' : 'text-muted'}`}>#RID: {r.id}</h6>
                            <p className="card-text">{r.description}</p>
                            {!r.status &&
                                <Link type="button" className="card-link text-info" data-toggle="modal" data-target="#exampleModal2" data-whatever="Amount in INR" onClick={() => setEditData(r)}>
                                    Edit
                                </Link>
                            }


                            <Link onClick={() => handleDelete(r)} className="card-link text-danger">Delete</Link>
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
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="Amount in INR">
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

            {/* Create Modal */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New Reimbursement</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleCreate}>
                                <div className="form-group">
                                    <label for="amount" className="col-form-label">Amount:</label>
                                    <input type="text" className="form-control" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label for="message-text" className="col-form-label">Description:</label>
                                    <textarea className="form-control" id="message-text" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <input type="submit" value="Submit" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* //TEMPORARY edit modal duplicate of create modal, make component later */}
            <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel2">Modify Reimbursement {editData.id}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleEdit}>
                                <div className="form-group">
                                    <label for="amount2" className="col-form-label">Amount:</label>
                                    <input type="text" className="form-control" id="amount2" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label for="message-text2" className="col-form-label">Description:</label>
                                    <textarea className="form-control" id="message-text2" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <input type="submit" value="Submit" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReimbursePage;