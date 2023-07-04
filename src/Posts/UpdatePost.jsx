import React, { useEffect, useState, useContext } from "react";
import '../Style/write.css';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import convertToBase64 from '../Utility/Base64Converter';
import Tooltip from '@mui/material/Tooltip';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {SnackBarContext} from '../ContextAPI/SnackBar';
import { BASEURL } from "../Utility/Config";

function WritePost() {
    const {ActiveSnackBar} = useContext(SnackBarContext);
    const [blogObj, setblogObj] = useState({ loading: true });
    const { postid } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('yatriToken')
            }
        }
        async function fetchBlogDetail() {
            try {
                const res = await axios.get(BASEURL + '/updatepost/' + postid, config);
                // console.log(res.data);
                if(res.data.success === false)
                {
                    ActiveSnackBar(res.data.serverMsg, 'error');
                    navigate('/');
                }
                else
                {
                    setblogObj({...res.data});
                }
            }
            catch(err)
            {
                ActiveSnackBar('unknown error', 'error');
                navigate('/'); 
            }
        }
        fetchBlogDetail();
    }, []);
    // useEffect(() => {
    //     async function verifyToken() {
    //         try {
    //             let config = {
    //                 headers: {
    //                     'Authorization': 'Bearer ' + localStorage.getItem('yatriToken')
    //                 }
    //             }
    //             const res = await axios.post(BASEURL+'/auth', '', config);
    //             const resData = await res.data;
    //             // console.log('res recieved:', resData);
    //             if (resData.success === false) {
    //                 navigate('/');
    //             }
    //         }
    //         catch (err) {
    //             // console.log('yah err h');
    //             navigate('/');
    //         }
    //     }
    //     verifyToken();
    // }, [navigate])

    const UpdateFormData = (e) => {
        setblogObj({ ...blogObj, [e.target.name]: e.target.value });
    }

    const UpdateImage = async (e) => {
        const base64file = await convertToBase64(e.target.files[0]);
        const BlogImage = 'BlogImage';
        setblogObj({ ...blogObj, [BlogImage]: base64file });
    }

    const updateCategoryStatus = (e, idx, val) => {
        e.stopPropagation()
        let tempArr = [...blogObj.Categories];
        tempArr[idx].cat_active = val;
        const Categories = 'Categories';
        setblogObj({ ...blogObj, [Categories]: tempArr });
    }

    const UpdateBlog = async (e) => {
        e.preventDefault();
        try {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('yatriToken')
                }
            }
            const res = await axios.patch(BASEURL + '/updateblog', blogObj, config);
            console.log(res);
            if (res.success === false) {
                ActiveSnackBar(res.data.serverMsg, 'error');
            }
            else {
                // console.log('for success', res.data);
                // console.log('blog link: ',)
                ActiveSnackBar(res.data.serverMsg, 'success');
                navigate(`/posts/${postid}`)
            }
        }
        catch (err) {
            console.log(err);
            ActiveSnackBar('Unknown error', 'error');
        }
    }

    return (
        <>
            <div className="row write-container">
                <div className="col-lg-10 mx-auto write-inner-container p-lg-3 p-2">
                    <h4>Create your own travel story and inspire others to embark on their own adventures through YatriView</h4>
                    <form onSubmit={UpdateBlog}>
                        <div className="blog-img-container">
                            {blogObj.uploadImg !== '' && <img src={blogObj.BlogImage} alt='blog-uplodedpicture'></img>}
                            <br></br>
                            <label htmlFor="file-upload-inp">
                                <Tooltip title={blogObj.uploadImg === '' ? 'Upload Image' : 'Change Image'} placement="right" arrow>
                                    <ControlPointIcon fontSize="large" />
                                </Tooltip>
                            </label>
                            <input type='file' id='file-upload-inp' onChange={UpdateImage}></input>
                        </div>
                        <div className="blog-heading">
                            <input required type='text' name='Title' placeholder="Title of Your Blog" value={blogObj.Title} onChange={UpdateFormData} />
                        </div>
                        <div className="blog-category-container">
                            <p>Choose categories which fits for your location</p>
                            <div className="blog-category-inner-container">
                                {
                                    blogObj.Categories && blogObj.Categories.map((obj, idx) => {
                                        return (
                                            <span key={idx} onClick={(e) => updateCategoryStatus(e, idx, true)} className={obj.cat_active ? 'blog-category-active' : 'blog-category-inactive'} >{obj.cat_name} {obj.cat_active && <span id='cat-del-btn' onClick={(e) => updateCategoryStatus(e, idx, false)}><CancelIcon fontSize="small" /></span>} </span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="blog-content">
                            <textarea required placeholder='Write about Your Expirence...' name='Content' value={blogObj.Content} onChange={UpdateFormData} />
                        </div>
                        <div className="publish-blog-btn">
                            <input type='submit' value='Update'></input>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default WritePost;