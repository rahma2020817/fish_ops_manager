// i want to logout the user by removing the token from local storage and redirect to login page

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("token");
        navigate("/");
    }, []);
    return <div></div>;
}

export default Logout;