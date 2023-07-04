import React, { useState, useContext } from "react";
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../Style/login.css';
import axios from "axios";
import { SnackBarContext } from '../ContextAPI/SnackBar';
import { BASEURL } from "../Utility/Config";

function SignUp({ setActiveBtn }) {
    const { ActiveSnackBar } = useContext(SnackBarContext);
    const [formObj, setformObj] = useState({ name: '', email: '', password: '', cpassword: '' });

    const updateDetails = (e) => {
        setformObj({ ...formObj, [e.target.name]: e.target.value });
    }

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            if (formObj.password !== formObj.cpassword) {
                ActiveSnackBar('Password and Confirm Password not Matched', 'error');
                setformObj({ name: formObj.name, email: formObj.email, password: '', cpassword: '' });
            }
            else if (formObj.password.length < 6 || formObj.password.length > 30) {
                ActiveSnackBar('Password length should be in between 6 to 30', 'error');
                setformObj({ name: formObj.name, email: formObj.email, password: '', cpassword: '' });
            }
            else {
                const apires = await axios.post(BASEURL + '/signup', formObj);
                const res = await apires.data;
                // console.log(res);
                if (res.success === false) {
                    ActiveSnackBar(res.ServerMsg, 'error');
                    setformObj({ name: formObj.name, email: '', password: '', cpassword: '' })
                }
                else {
                    ActiveSnackBar(res.ServerMsg, 'success');
                    setActiveBtn(0);
                    setformObj({ name: '', email: '', password: '', cpassword: '' })
                }
            }
        }
        catch(err)
        {
            ActiveSnackBar('Unknown Error...', 'error');
        }
    }

    return (
        <>
            <div className="row mt-5 mb-5">
                <div className="col-md-8 col-11 mx-auto login-container p-3">
                    <form onSubmit={submitForm}>
                        <div className="register-field-item">
                            <label htmlFor="name-field">Name &nbsp; <AccountCircleIcon /></label>
                            <input id="name-field" name="name" type='text' required onChange={updateDetails} value={formObj.name}></input>
                        </div>
                        <div className="register-field-item">
                            <label htmlFor="email-field">Email &nbsp; <EmailIcon /></label>
                            <input id="email-field" name='email' type='email' required onChange={updateDetails} value={formObj.email}></input>
                        </div>
                        <div className="register-field-item">
                            <label htmlFor="password-field">Password &nbsp; <VpnKeyIcon /></label>
                            <input id="password-field" name='password' type='password' required onChange={updateDetails} value={formObj.password}></input>
                        </div>
                        <div className="register-field-item">
                            <label htmlFor="cpassword-field">Confirm Password &nbsp; <KeyIcon /></label>
                            <input id="cpassword-field" name='cpassword' type='password' required onChange={updateDetails} value={formObj.cpassword}></input>
                        </div>
                        <div className="register-field-item">
                            <input className="reg-submit-btn" type='submit' value='Signup'></input>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp;