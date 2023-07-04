import { React, useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import './../Style/topbar.css';
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import RegisterDropDown from "./RegisterDropDown";
import axios from "axios";
import { SearchContext } from "../ContextAPI/SearchContext";
import CloseIcon from '@mui/icons-material/Close';
import { BASEURL } from "../Utility/Config";

const LeftMenu = ({ ww, MenuVis }) => {
    return (
        <>
            {ww < 500
                ?
                <AppsIcon fontSize="large" onClick={MenuVis} /> :
                <span style={
                { fontSize: '20px',
                  fontWeight: 'bold',
                 }}>Yatri View</span>
            }
        </>
    )
}

const Menu = ({ user }) => {
    return (
        <div className="row">
            <div className="nav-center-item col-lg-3 col-6"><NavLink className='nav-item' style={{ textDecoration: 'none' }} to='/'>HOME</NavLink></div>
            <div className="nav-center-item col-lg-3 col-6"><NavLink className="nav-item" style={{ textDecoration: 'none' }} to='/about'>ABOUT</NavLink></div>
            <div className="nav-center-item col-lg-3 col-6"><NavLink className="nav-item" style={{ textDecoration: 'none' }} to='/contact'>CONTACT</NavLink></div>
            {user && <div className="nav-center-item col-lg-3 col-6"><NavLink className="nav-item" style={{ textDecoration: 'none' }} to='/writepost'>WRITE</NavLink></div>}
        </div>
    )
}

const RightMenu = ({ user }) => {
    const { searchItem, updateSearchField, clearSearchField, searchStatus, setSearchStatus } = useContext(SearchContext);
    const navigate = useNavigate();
    return (
        <>
            <div className="row nav-right-section">
                <div className="col-10 nav-right-item search-section">
                    <input type={"search"} placeholder={'Search'} value={searchItem} onChange={(e) => updateSearchField(e.target.value)}></input>
                    {
                        !searchStatus
                            ?
                            <button onClick={() => {
                                if (searchItem) {
                                    setSearchStatus(true);
                                    return (navigate('/search'))
                                }
                            }}>
                                <SearchIcon fontSize="medium" />
                            </button>
                            :
                            <button onClick={clearSearchField}>
                                <CloseIcon fontSize="medium" />
                            </button>
                    }

                </div>
                <div className="col-2 nav-right-item">
                    <RegisterDropDown user={user} />
                </div>
            </div>
        </>
    )
}

function TopBar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(false);
    useEffect(() => {
        async function verifyToken() {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('yatriToken')
                }
            }
            const res = await axios.post(BASEURL + '/auth', '', config);
            const resData = await res.data;
            // console.log('res recieved:', resData);
            if (resData.success) {
                setUser(true);
            }
            else {
                setUser(false);
            }
        }
        verifyToken();
    }, [navigate])

    const [winwidth, setWinWidth] = useState(window.outerWidth);
    const [menuvisible, setMenuVisibility] = useState(false);
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWinWidth(window.outerWidth);
        })
        if (winwidth > 500) {
            setMenuVisibility(true);
        }
    }, [winwidth])

    return (
        <>
            <div className="row topbar-section">
                <div className="col-lg-2 col-3 order-1 order-lg-1 topbar-left-section">
                    <LeftMenu ww={winwidth} MenuVis={() => setMenuVisibility(!menuvisible)} />
                </div>
                <div className="col-lg-6 col-12 order-3 order-lg-2 topbar-center-section">
                    {menuvisible && <Menu user={user} />}
                </div>
                <div className="col-lg-4 order-2 order-lg-3 col-9 topbar-right-section">
                    <RightMenu user={user} />
                </div>
            </div>
        </>
    )
}

export default TopBar;