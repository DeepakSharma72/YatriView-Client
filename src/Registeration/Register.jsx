import React, { useEffect, useState } from "react";
import '../Style/register.css';
import Login from './Login';
import Signup from './Signup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../Utility/Config";
function RegisterBtns({ setActiveBtn, activebtn }) {
    return (
        <>
            <div className="register-btn-section">
                <span onClick={() => setActiveBtn(0)} className={activebtn === 0 ? "register-btn-active" : "register-item"}>Login</span>
                <span onClick={() => setActiveBtn(1)} className={activebtn === 1 ? "register-btn-active" : "register-item"}>SignUp</span>
            </div>
        </>
    )
}

function Register() {
    const navigate = useNavigate();
    useEffect(() => {
        async function verifyToken() {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('yatriToken')
                }
            }
            const res = await axios.post(BASEURL + '/auth', '', config);
            const resData = await res.data;
            console.log('res recieved from register page:', resData);
            if(resData.success)
            {
                navigate('/');
            }
            else
            {
                navigate('/register');
            }
        }
        verifyToken();
    }, [])


    const [activebtn, setActiveBtn] = useState(0);
    return (
        <div className="row register-section">
            <div className="col-md-6 col-11 mx-auto register-inner-section">
                <RegisterBtns activebtn={activebtn} setActiveBtn={setActiveBtn} />
                {activebtn === 0 ? <Login /> : <Signup setActiveBtn={setActiveBtn} />}
            </div>
        </div>
    )
}

export default Register;