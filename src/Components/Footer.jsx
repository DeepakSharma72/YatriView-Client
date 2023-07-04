import React from 'react'
import '../Style/footer.css';
import { Link } from 'react-router-dom';

export default function Footer({ activeuser = false }) {
    const inactiveAnchorStyle = {
        textDecoration: 'none',
        color: 'inherit'
    }
    return (
        <div className='footer'>
            <div className='top'>
                This website belongs to Yatri View
            </div>
            <div className='middle'>
                <div className='footer-item'>
                    <div className='footer-sub-title'>OTHER PROJECTS</div>
                    <div className='footer-content'>
                        <div><a href='https://mathpirates.netlify.app/' target='_space' style={inactiveAnchorStyle}>Math ∏rates</a></div>
                        <div><a href='https://power-admin.netlify.app/' target='_space' style={inactiveAnchorStyle}>Power Admin</a></div>
                        <div><a href='https://notekeeper29.netlify.app/' target='_space' style={inactiveAnchorStyle}>Notekeeper</a></div>
                        <div><a href='https://deepaksharma72.github.io/FilmSphere/' target='_space' style={inactiveAnchorStyle}>Filmy Sphere</a></div>
                        <div><a href='https://deepaksharma72.github.io/NoobsGarden/' target='_space' style={inactiveAnchorStyle}>NoobsGarden</a></div>
                    </div>
                </div>
                <div className='usefull-links footer-item'>
                    <div className='footer-sub-title'>USEFULL LINKS</div>
                    <div className='footer-content'>
                        <Link to='/' style={inactiveAnchorStyle}>Home</Link>
                    </div>
                    <div className='footer-content'>
                        <div>
                            {
                                activeuser
                                    ?
                                    <Link to='/profile' style={inactiveAnchorStyle}>Profile</Link>
                                    :
                                    <Link to='/register' style={inactiveAnchorStyle}>SignUp / Login</Link>
                            }
                        </div>
                        <div>Help</div>
                        <div><Link to='/about' style={inactiveAnchorStyle}>About</Link></div>
                        <div><Link to='/contact' style={inactiveAnchorStyle}>Contact</Link></div>
                    </div>
                </div>
                <div className='address footer-item'>
                    <div className='footer-sub-title'>ADDRESS</div>
                    <div className='footer-content'>
                        <div><i class="bi bi-house-door-fill"></i> Alwar, Rajasthan</div>
                        <div><i class="bi bi-envelope-fill"></i> deepakofficialcpp786@gmail.com</div>
                        <div><i class="bi bi-telephone-fill"></i> +91 897878782</div>
                    </div>
                </div>
            </div>
            <div className='bottom'>
                <div className='media-links'>
                    <span>Get connected with us on social networks: </span>
                    <div className='icons'>
                        <span><a href='https://www.linkedin.com/in/deepak-sharma-66968120a/' target='_space' style={inactiveAnchorStyle}><i class="icon bi bi-linkedin"></i></a></span>
                        <span><a href='https://www.instagram.com/its_me_deepak72/' target='_space' style={inactiveAnchorStyle}><i class="icon bi bi-instagram"></i></a></span>
                        <span><a href='https://github.com/DeepakSharma72' target='_space' style={inactiveAnchorStyle}><i class="icon bi bi-github"></i></a></span>
                    </div>
                </div>
                <hr></hr>
                <div className='copy-rights'>
                    &#169; 2023 Copyright: All rights reserved
                </div>
            </div>
        </div>
    )
}
