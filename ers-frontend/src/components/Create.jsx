//TODO try modals
import Navbar from "../components/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import FooterFilter from "../components/FooterFilter";
  
const Create = () => {
    useEffect(() => {
        if (!empId) navigate('/login');
        else {
            axios.get("http://localhost:9000/api/reimbursement/" + empId)
                .then((response) => {
                    setRs(response.data)
                    console.log(response.data)
                })
                .catch((error) => console.log(error));
        }
    }, []);
    
    return (  
        <></>
    );
}
 
export default Create;