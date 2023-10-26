//TODO try modals
import Navbar from "../components/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import FooterFilter from "../components/FooterFilter";
import Modal from 'react-modal';

const Create = () => {
    const empId = Cookies.get("empId");
    const [isOpen, setIsOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    const handleCreate = (event) => {
        event.preventDefault();

        // Submit the form data to the server.

    };

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <button type="button" onClick={handleOpenModal}>Open Modal</button>
            <Modal
                isOpen={isOpen}
                onRequestClose={handleCloseModal}
                className="modal fade"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Reimbursement Form</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Amount"
                                />
                                <br />
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Description"
                                />
                                <br />
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >Close</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Create;