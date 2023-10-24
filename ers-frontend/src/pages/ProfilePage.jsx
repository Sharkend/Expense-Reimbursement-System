import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from 'react';


const ProfilePage = (props) => {
    const navigate = useNavigate();
    const username = Cookies.get("username");
    const password = Cookies.get("password");
    const [user, setUser] = useState({});
    
    useEffect(() => {
        //Initialize logged-in user
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


    console.log("\n\n PROFILEPAGE: "+ JSON.stringify(user));
    return ( 
        <Navbar />
    );
}
 
export default ProfilePage;