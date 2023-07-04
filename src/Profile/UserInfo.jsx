import '../Style/userinfo.css';
import React, { useContext, useEffect, useState } from 'react'
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../ContextAPI/UserContext';

const DisplayInfo = () => {
  const { formObj, setdisplayinfo } = useContext(UserContext);
  const DisableUpdateInfo = (e) => {
    e.preventDefault();
    setdisplayinfo(false);
  }
  return (<>
    <div className='row mt-3'>
      <div className='col-lg-6 col-md-7 col-sm-8 col-11 mx-auto userinfo-sec'>
        <div className='prof-img-item col-md-6 col-8 mx-auto my-3'>
          <img src={formObj.userimage === "" ? './assets/userlogo.png' : formObj.userimage} alt='userimg' />
        </div>
        <form onSubmit={DisableUpdateInfo}>
          <div className='info-item'>
            <label htmlFor='info-name-field'>Name</label>
            <input id='info-name-field' type='text' value={formObj.username}></input>
          </div>
          <div className='info-item'>
            <label htmlFor='info-name-field'>Email</label>
            <input id='info-name-field' type='email' value={formObj.useremail}></input>
          </div>
          <div className='info-item info-form-btn'>
            <input type='submit' value='Update'></input>
          </div>
        </form>
      </div>
    </div>
  </>)
}

const UpdateInfo = () => {
  const { formObj, UpdateUserInfo, updateImageField, updateTextFields } = useContext(UserContext);
  const submitUpdateInfo = async (e) => {
    e.preventDefault();
    UpdateUserInfo();
  }

  return (
    <>
      <div className='row mt-3'>
        <div className='col-lg-6 col-md-7 col-sm-8 col-11 mx-auto userinfo-sec'>
          <div className='prof-img-item col-md-6 col-8 mx-auto my-3'>
            <img src={(formObj.userimage === undefined) ? './assets/userlogo.png' : formObj.userimage} alt='userimg' />
            <label htmlFor='profileImgPicker'>
              <Tooltip title="Edit Picture" arrow>
                <FilterVintageIcon fontSize='large' />
              </Tooltip>
            </label>
            <input name='userimage' type='file' id='profileImgPicker' onChange={updateImageField}></input>
          </div>
          <form onSubmit={submitUpdateInfo}>
            <div className='info-item'>
              <label htmlFor='info-name-field'>Name</label>
              <input id='info-name-field' name='username' type='text' value={formObj.username} onChange={updateTextFields}></input>
            </div>
            <div className='info-item'>
              <label htmlFor='info-name-field'>Email</label>
              <input id='info-name-field' name='useremail' type='email' value={formObj.useremail} onChange={updateTextFields}></input>
            </div>
            <div className='info-item'>
              <label htmlFor='info-name-field'>Password</label>
              <input id='info-name-field' name='userpassword' type='password' value={formObj.userpassword} onChange={updateTextFields}></input>
            </div>
            <div className='info-item'>
              <label htmlFor='info-name-field'>Confirm Password</label>
              <input id='info-name-field' name='usercpassword' type='password' value={formObj.usercpassword} onChange={updateTextFields}></input>
            </div>
            <div className='info-item info-form-btn'>
              <input type='submit' value='Save'></input>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

function UserInfo() {
  const {displayinfo, fetchUserInfo } = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    fetchUserInfo();
  }, [displayinfo, navigate]);

  return (
    <>
      {displayinfo ?
        <DisplayInfo/> :
        <UpdateInfo/>}
    </>
  )
}

export default UserInfo;