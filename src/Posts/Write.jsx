import React, { useEffect, useState, useContext } from "react";
import '../Style/write.css';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import convertToBase64 from '../Utility/Base64Converter';
import Tooltip from '@mui/material/Tooltip';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {SnackBarContext} from '../ContextAPI/SnackBar';
import { BASEURL } from "../Utility/Config";

function WritePost() {
    const { ActiveSnackBar } = useContext(SnackBarContext);
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
                    ActiveSnackBar(resData.serverMsg, 'error');
                    navigate('/');
                }
            }
            catch(err){
                ActiveSnackBar('Unknown error', 'error');
                navigate('/');
            }
        }
        verifyToken();
    }, [navigate])

    const [formObj, setFormObj] = useState({ uploadImg: '', blogHeading: '', blogCategories: [
        { cat_active: false, cat_name: 'Beach' },
        { cat_active: false, cat_name: 'City' },
        { cat_active: false, cat_name: 'Nature and wildlife' },
        { cat_active: false, cat_name: 'Historical site' },
        { cat_active: false, cat_name: 'Cultural site' },
        { cat_active: false, cat_name: 'Town and village' },
        { cat_active: false, cat_name: 'Mountains' },
        { cat_active: false, cat_name: 'Theme park' },
        { cat_active: false, cat_name: 'Island' },
    ], blogContent: '' });

    const UpdateFormData = (e) => {
        setFormObj({ ...formObj, [e.target.name]: e.target.value });
    }

    const UpdateImage = async (e) => {
        const base64file = await convertToBase64(e.target.files[0]);
        setFormObj({ ...formObj, ['uploadImg']: base64file });
    }

    const updateCategoryStatus = (e, idx, val) => {
        e.stopPropagation()
        let tempArr = [...formObj.blogCategories];
        tempArr[idx].cat_active = val;
        setFormObj({...formObj, ['blogCategories']: tempArr});
    }

    const PostBlog = async (e) => {
        e.preventDefault();
        try {
            if(formObj.uploadImg === "")
            {
                return ActiveSnackBar('Blog Image is required...', 'error');
            }
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('yatriToken')
                }
            }
            const res = await axios.post(BASEURL + '/postblog', formObj, config);
            console.log('posted: ', res.data);
            if(res.data.success === false)
            {
                ActiveSnackBar(res.data.serverMsg, 'error');
                // console.log(res.serverMsg);
            }
            else{
                // console.log('for success',res.data);
                ActiveSnackBar(res.data.serverMsg, 'success');
                navigate(`/posts/${res.data.blogLink}`)
            }
        }
        catch(err){
            ActiveSnackBar('Unkown error', 'error');
            navigate('/');
            // console.log(err);
        }
    }

    return (
        <>
            <div className="row write-container">
                <div className="col-lg-10 mx-auto write-inner-container p-lg-3 p-2">
                    <h4>Create your own travel story and inspire others to embark on their own adventures through YatriView</h4>
                    <form onSubmit={PostBlog}>
                        <div className="blog-img-container">
                            {formObj.uploadImg !== '' && <img src={formObj.uploadImg} alt='blog-uplodedpicture'></img>}
                            <br></br>
                            <label htmlFor="file-upload-inp">
                                <Tooltip title={formObj.uploadImg === '' ? 'Upload Image' : 'Change Image'} placement="right" arrow>
                                    <ControlPointIcon fontSize="large" />
                                </Tooltip>
                            </label>
                            <input type='file' id='file-upload-inp' onChange={UpdateImage}></input>
                        </div>
                        <div className="blog-heading">
                            <input required type='text' name='blogHeading' placeholder="Title of Your Blog" value={formObj.blogHeading} onChange={UpdateFormData} />
                        </div>
                        <div className="blog-category-container">
                            <p>Choose categories which fits for your location</p>
                            <div className="blog-category-inner-container">
                                {
                                    formObj.blogCategories.map((obj, idx) => {
                                        return (
                                            <span key={idx} onClick={(e) => updateCategoryStatus(e, idx, true)} className={obj.cat_active ? 'blog-category-active' : 'blog-category-inactive'} >{obj.cat_name} {obj.cat_active && <span id='cat-del-btn' onClick={(e) => updateCategoryStatus(e, idx, false)}><CancelIcon fontSize="small" /></span>} </span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="blog-content">
                            <textarea required placeholder='Write about Your Expirence...' name='blogContent' value={formObj.blogContent} onChange={UpdateFormData} />
                        </div>
                        <div className="publish-blog-btn">
                            <input type='submit' value='Publish'></input>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default WritePost;