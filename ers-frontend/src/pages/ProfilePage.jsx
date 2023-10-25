import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from 'react';


const ProfilePage = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(Cookies.get("username"));
    const [password, setPassword] = useState(Cookies.get("password"));
    const [name, setName] = useState(Cookies.get("name"));
    const [editable, setEditable] = useState(false);
    const manager = Cookies.get("manager");
    const empId = Cookies.get("empId");
    console.log(editable);


    useEffect(() => {
        if (!email) navigate('/login');
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const _email = document.querySelector("#inputEmail").value;
        const _name = document.querySelector("#inputName").value;
        const _password = document.querySelector("#inputPassword").value;

        function isEmail(email) {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(email);
        }

        const confirm = prompt("Enter your current password:");
        if (confirm != Cookies.get("password"))
            alert("Incorrect Password");
        else if (_name == "")
            alert("Name cannot be null");
        else if (_password.length < 6)
            alert("Password must be atleast 6 characters long")
        else if (!isEmail(_email))
            alert("Email must be valid")
        else {
            axios.put("http://localhost:9000/api/employee/"+empId, {
                "name": _name,
                "email": _email,
                "password": _password
            })
                .then(() => {
                    Cookies.set("password", _password);
                    Cookies.set("username", _email);
                    Cookies.set("name", _name);
                    setEditable(false);
                    alert("Updated information successfully")
                })
                .catch((error) => {
                    if (error.response.status === 409) {
                        // Unique constraint violated.
                        alert("Email already in use");
                    } else {
                        // Handle other errors.
                        alert("Update failed");
                    }
                });
        }
    }


    return (
        <>
            <Navbar />
            <div className="row">
                <div className="col-md-3" />
                <div className="col-md-6">
                    <h1 className="mt-3 mb-4 text-center">{editable ? "Edit" : "My"} Profile</h1>
                    <form onSubmit={handleSubmit} className="">
                        <div class="form-group row">
                            <label for="employeeID" className="col-form-label col-sm-3 text-right">Employee ID</label>
                            <input
                                id="employeeID"
                                type="Number"
                                value={empId}
                                readOnly
                                className="form-control-plaintext col-sm-7 ml-2"
                            />
                        </div>
                        <div class="form-group row">
                            <label for="inputName" className="col-form-label col-sm-3 text-right">Name</label>
                            <input
                                id="inputName"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                readOnly={!editable}
                                className="form-control col-sm-7 ml-2"
                            />
                        </div>
                        <div class="form-group row">
                            <label for="inputEmail" className="col-form-label col-sm-3 text-right">Email Address</label>
                            <input
                                id="inputEmail"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                readOnly={!editable}
                                className="form-control col-sm-7 ml-2"
                            />
                        </div>
                        <div class="form-group row">
                            <label for="inputPassword" className="col-form-label col-sm-3 text-right">Password</label>
                            <input
                                id="inputPassword"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                readOnly={!editable}
                                className="form-control col-sm-7 ml-2"
                            />
                        </div>
                        <div class="form-group row">
                            <label for="role" className="col-form-label col-sm-3 text-right">Role</label>
                            <input
                                id="role"
                                type="text"
                                value={manager ? "Manager" : "Associate"}
                                readOnly
                                className="form-control-plaintext col-sm-7 ml-2 col-sm-7 ml-2"
                            />
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-5"></div>
                            {editable
                                ?
                                <input type="submit" value="Save Changes" className="btn btn-primary btn-block" />
                                :
                                <button className="btn btn-primary" onClick={() => setEditable(true)}> Edit </button>
                            }
                            <div className="col-sm-5"></div>
                        </div>
                    </form>
                </div>
                <div className="col-md-3" />
            </div>
        </>
    );
}

export default ProfilePage;