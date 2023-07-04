import React, { useEffect, useState, useContext } from "react";
import './../Style/post.css';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FaceIcon from '@mui/icons-material/Face';
import RatingSystem from "./RatingSystem";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import RecommendedPosts from "./RecommendedPost";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { SnackBarContext } from '../ContextAPI/SnackBar';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DateFormat from "../Utility/DateFormat";
import { BASEURL } from "../Utility/Config";

function getReadTimeString(val) {
    let ans = '';
    if (val >= 60) {
        ans += `${Math.floor(val / 60)}Hrs `
    }
    if (val === 0 || val % 60 !== 0) {
        ans += `${val % 60}Min`
    }
    return ans;
}

function AuthorSection() {
    const { ActiveSnackBar } = useContext(SnackBarContext);
    const navigate = useNavigate();
    const { postid } = useParams();
    // console.log('postid: ', postid);
    async function DeleteBlog() {
        try {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('yatriToken')
                },
                data: {
                    _id: postid
                }
            }
            const res = await axios.delete(BASEURL + '/deletepost/', config);
            // console.log(res);
            if (res.data.success === true) {
                ActiveSnackBar(res.data.serverMsg, 'success');
            }
            else {
                ActiveSnackBar(res.data.serverMsg, 'error');
            }
            navigate('/');
        }
        catch (err) {
            ActiveSnackBar('Error in deleting blog', 'error');
            // console.log('delete bnt err: ',err);
        }
    }

    function UpdateBlog() {
        navigate('/updatepost/' + postid);
    }

    return (
        <div className="author-sepcific">
            <Tooltip title="Edit Blog" placement="right">
                <IconButton onClick={UpdateBlog}>
                    <span style={{ color: 'blue' }}>
                        <AppRegistrationIcon fontSize="large" />
                    </span>
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Blog" placement="left">
                <IconButton onClick={DeleteBlog}>
                    <span style={{ color: 'red' }}>
                        <DeleteForeverIcon fontSize="large" />
                    </span>
                </IconButton>
            </Tooltip>
        </div>
    )
}

function Post() {
    const { ActiveSnackBar } = useContext(SnackBarContext);
    const [BlogObj, setBlogObj] = useState({});
    const { postid } = useParams();
    // console.log('postid:', postid);
    const [DateObj, setDateObj] = useState(Date.now())

    const navigate = useNavigate();
    useEffect(() => {
        let ReadTimer = setInterval(async () => {
            // api call to increment the readTime
            try {
                await axios.patch(BASEURL + '/updateReadTime', { postid });
            }
            catch (err) {
                console.log('unable to upadate read time');
            }
        }, 60000);
        return () => {
            clearInterval(ReadTimer);
        };
    }, [navigate, postid]);


    useEffect(() => {
        async function verifyToken() {
            try {
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('yatriToken')
                    }
                }
                const postData = await axios.get(BASEURL + '/getpost/' + postid, config);
                // console.log(postData);
                // active user
                if (postData.data.success === false) {
                    ActiveSnackBar(postData.data.serverMsg, 'error');
                    navigate('/');
                }
                else {
                    const blogObj = await postData.data.BlogObj;
                    setBlogObj(blogObj);
                    // console.log('blogObj:', blogObj.Categories);
                    let dateformat = new Date(blogObj.Date);
                    dateformat = DateFormat(dateformat);
                    setDateObj(dateformat);
                }
            }
            catch (err) {
                // console.log(err);
                ActiveSnackBar('unable to fetch post', 'error');
                navigate('/');
            }
        }
        verifyToken();
    }, [navigate, postid])



    useEffect(() => {
        async function updateViews() {
            try {
                await axios.patch(BASEURL + '/updateviews', { postid });
            }
            catch (err) {
                // console.log('eror in views: ',err);
            }
        }
        updateViews();
    }, [postid])


    return (
        <>
            <div className="row Post-Container">
                <div className="col-md-8 col-12 post-inner-section p-md-3">
                    {BlogObj.isUseraAuthor === true && <AuthorSection />}
                    <img alt='blog-img' src={BlogObj.BlogImage}></img>
                    <h5>
                        {BlogObj.Title}
                    </h5>
                    <div className="content-highlighter">
                        <div>
                            {BlogObj.AuthorName} <span><FaceIcon /></span>
                        </div>
                        <div>
                            {Math.round(BlogObj.Rating)} <span><StarIcon /></span>
                        </div>
                        <div>
                            {BlogObj.Views} <span><VisibilityIcon /></span>
                        </div>
                        {BlogObj.isUseraAuthor === true &&
                            <div>
                                {getReadTimeString(BlogObj.ReadTime)} <span><AccessTimeFilledIcon /></span>
                            </div>
                        }
                        <div>
                            {DateObj} <span><CalendarMonthIcon /></span>
                        </div>
                    </div>
                    <p>
                        {BlogObj.Content}
                    </p>

                    <div className="blog-category-inner-container">
                        {
                            BlogObj.Categories
                            &&
                            BlogObj.Categories.filter((obj) => {
                                return obj.cat_active;
                            }).map((obj, idx) => {
                                return (
                                    <span
                                        key={idx}
                                        className='blog-category-inactive'>{obj.cat_name}
                                    </span>
                                )
                            })
                        }
                    </div>

                    {BlogObj.isUseraAuthor === false && BlogObj.isUserActive === true &&
                        <div className="rating-blog">
                            <RatingSystem postid={postid} />
                        </div>
                    }
                </div>
                <RecommendedPosts postid = {postid}/>
            </div>
        </>
    )
}

export default Post;