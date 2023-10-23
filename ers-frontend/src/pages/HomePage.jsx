import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';


const HomePage = (props) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (state == null) navigate('/login')
    }, []);

    return ( 
        <>
        <Navbar />
        <p>{props.data}</p>
        </>
     );
}
 
export default HomePage;