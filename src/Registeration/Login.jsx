import React, { useContext, useState } from "react";
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import '../Style/login.css';
import axios from "axios";
import { SnackBarContext } from "../ContextAPI/SnackBar";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../Utility/Config";

function Login() {
    const { ActiveSnackBar } = useContext(SnackBarContext);
    const navigate = useNavigate();
    const [formObj, setformObj] = useState({ email: '', password: '' });
    const updateDetails = ((e) => {
        let { name, value } = e.target;
        setformObj({
            ...formObj,
            [name]: value
        })
    });

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const apires = await axios.post(BASEURL + '/login', formObj);
            const result = await apires.data;
            if (result.success === false) {
                ActiveSnackBar(result.ServerMsg, 'error');
                setformObj({ email: '', password: '' });
            }
            else {
                setformObj({ email: '', password: '' });
                localStorage.setItem('yatriToken', result.token);
                ActiveSnackBar(result.ServerMsg, 'success');
                navigate('/');
            }
        }
        catch(err)
        {
            ActiveSnackBar('Unknown Error', 'error');
        }

    }

    return (
        <>
            <div className="row mt-5 mb-5">
                <div className="col-md-8 col-11 mx-auto login-container p-3">
                    <form onSubmit={submitForm}>
                        <div className="register-field-item">
                            <label htmlFor="email-field">Email &nbsp; <EmailIcon /></label>
                            <input id="email-field" name='email' type='email' onChange={updateDetails} value={formObj.email}></input>
                        </div>
                        <div className="register-field-item">
                            <label htmlFor="password-field">Password &nbsp; <VpnKeyIcon /></label>
                            <input id="password-field" name='password' type='password' onChange={updateDetails} value={formObj.password}></input>
                        </div>
                        <div className="register-field-item">
                            <input className="reg-submit-btn" type='submit' value='login'></input>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}
export default Login;