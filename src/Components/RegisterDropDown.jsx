import React, { useContext, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import './../Style/registerDropDown.css';
import { useNavigate } from "react-router-dom";
import { SnackBarContext} from "../ContextAPI/SnackBar";

function ProfileBtn({user}) {
    const navigate = useNavigate();
    return (
        <div onClick={() => { navigate('/profile') }}>
            {user && <><PersonIcon /> &nbsp;My Profile</>}
        </div>  
    )
}

function RegisterBtn({ user }) {
    const navigate = useNavigate();
    const {ActiveSnackBar} = useContext(SnackBarContext);
    const logoutOrloginUser = () => {
        if (user) {
            ActiveSnackBar('Logout Successfully...', 'success');
            localStorage.removeItem('yatriToken');
        }
        navigate('/register')
    }
    return (
        <>
            <div onClick={logoutOrloginUser} >
                {user ? <><LogoutIcon />&nbsp; Logout</> : <><LoginIcon />&nbsp; Login/Singup</>}
            </div>
        </>
    )
}


const DropDown = ({ user }) => {
    return (
        <div className="register-menu">
            <ul>
                <li className="mb-2">
                    {user && <ProfileBtn  user = {user}/>}
                </li>
                <li>
                    <RegisterBtn user={user} />
                </li>
            </ul>
        </div>
    )
}

function RegisterDropDown({user}) {
    const [dropdownactive, setdropdown] = useState(false);
    const handleClick = () => {
        setdropdown(!dropdownactive);
    }
    return (
        <>
            <div className="dropdownicon shadow" onClick={handleClick}>
                <AccountCircleIcon fontSize='large' />
                {dropdownactive && <DropDown user={user} />}
            </div>
        </>
    );
}

export default RegisterDropDown;