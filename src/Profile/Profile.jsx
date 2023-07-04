import React, { useContext, useEffect, useState } from 'react';
import '../Style/profile.css';
import Person4Icon from '@mui/icons-material/Person4';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CollectionsIcon from '@mui/icons-material/Collections';
import HelpIcon from '@mui/icons-material/Help';
import AlbumComp from './Posts';
import InfoComp from './UserInfo';
import StatsComp from './StatsComp';
import HelpComp from './HelpComp'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContextProvider, UserContext } from '../ContextAPI/UserContext';
import { BASEURL } from '../Utility/Config';

function SideBar({ setActiveCom, activeCom }) {
    const { formObj } = useContext(UserContext);
    return (
        <>
            <div className='sidebar'>
                <div className='prof-img-cont mt-3'>
                    {
                        formObj.userimage === '' ?
                            <img src='./assets/userlogo.png' alt='userimgpicture'></img>
                            :
                            <img src={formObj.userimage} alit='userimgpicture'></img>
                    }
                </div>
                <div onClick={() => setActiveCom(1)} className={activeCom === 1 ? 'sidebar-item bluecolor' : 'sidebar-item whitecolor'}>
                    <span><Person4Icon fontSize='large' /> </span><span>Profile</span>
                </div>
                <div onClick={() => setActiveCom(2)} className={activeCom === 2 ? 'sidebar-item bluecolor' : 'sidebar-item whitecolor'}>
                    <span><LeaderboardIcon fontSize='large' /> </span> <span>Stats</span>
                </div>
                <div onClick={() => setActiveCom(3)} className={activeCom === 3 ? 'sidebar-item bluecolor' : 'sidebar-item whitecolor'}>
                    <span><CollectionsIcon fontSize='large' /></span> <span>Posts</span>
                </div>
                <div onClick={() => setActiveCom(4)} className={activeCom === 4 ? 'sidebar-item bluecolor' : 'sidebar-item whitecolor'}>
                    <span><HelpIcon fontSize='large' /> </span><span>Help</span>
                </div>
            </div>
        </>
    )
}


function Profile() {
    const navigate = useNavigate();
    useEffect(() => {
        async function verifyToken() {
            try {
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('yatriToken')
                    }
                }
                const res = await axios.post(BASEURL + '/auth', '', config);
                const resData = await res.data;
                // console.log('res recieved:', resData);
                if (resData.success === false) {
                    navigate('/');
                }
            }
            catch (err) {
                console.log('yah err h from profile component');
                navigate('/');
            }
        }
        verifyToken();
    }, [navigate])

    const [activeCom, setActiveCom] = useState(1);
    return (
        <>
            <UserContextProvider>
                <div className='profile-container'>
                    <SideBar activeCom={activeCom} setActiveCom={setActiveCom} />
                    <div className='mainbar'>
                        {activeCom === 1 && <InfoComp />}
                        {activeCom === 2 && <StatsComp />}
                        {activeCom === 3 && <AlbumComp URL = {BASEURL + '/getauthorsblogs'}/>}
                        {activeCom === 4 && <HelpComp />}
                    </div>
                </div>
            </UserContextProvider>
        </>
    )
}

export default Profile;