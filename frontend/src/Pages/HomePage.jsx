import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSsessionStorage } from '../hooks/SessionStorage';
import Home from '../components/Home';

const Homepage = () => {

   
    return (
        <div>
            <Home/>
        </div>
    );
}

export default Homepage;
