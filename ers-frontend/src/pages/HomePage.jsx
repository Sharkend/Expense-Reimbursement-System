import Navbar from "../components/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";


const HomePage = () => {
    ////Initialize logged in user
    const navigate = useNavigate();
    const username = Cookies.get("username");
    const password = Cookies.get("password");
    const [user, setUser] = useState({});
    
    useEffect(() => {
        if (!username) navigate('/login');
        else {
            axios.post("http://localhost:9000/api/employee/login", {"username":username, "password":password})
            .then((response) => {
                if(response.data == '') console.log("shouldnt reach here");
                else {
                    setUser(JSON.parse(JSON.stringify(response.data)));
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }, []);
    console.log("\n\n HOMEPAGE: "+ JSON.stringify(user));


    return ( 
        <>
        <Navbar />
        <p>{}</p>
        </>
     );
}
 
export default HomePage;