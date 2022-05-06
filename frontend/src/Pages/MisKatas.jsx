import React, { useEffect } from 'react';
import CreateKata from "../components/CreateKata"
import { useSsessionStorage } from '../hooks/SessionStorage';
import { useNavigate } from 'react-router-dom';




const Miskatas = () => {


    const loggedIn = useSsessionStorage("auth-token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            return navigate("/login")
        }

    }, [loggedIn]);
    return (
        <div>
            <CreateKata/>  
        </div>
    );
}

export default Miskatas;
