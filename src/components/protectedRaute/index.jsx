import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRaute=(props)=>{
    const {Component} =props;
    const navigate=useNavigate();
    const token=Cookies.get("jwtToken");
    useEffect(()=>{
        if(token===undefined){
            navigate("/Login")
        }
    },[]);

    return(
       <Component />

    )
}
export default ProtectedRaute;